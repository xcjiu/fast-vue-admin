# Promise 用法解析
***
* Promise 用一句话来概括就是：
* Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值。
* 一般通过 new 来实例化它
* 接收一个构造函数有并带两个函数参数，分别表示成功或失败时的输出
***
## 这是一个简单的应用场景
```
function promise1() {
	return new Promise((resolve, reject) => {
		//这里模拟异步动作，一般来说可以放置Ajax请求, 'promise1-result'为请求成功后的返回结果
		//注：Promise实例只能通过resolve 或 reject 函数来返回，并用then()或者catch()获取
		//不能在里面直接return ... 这样是获取不到Promise返回值的
		setTimeout(() => resolve('promise1-result'), 1000)
	})
}

promise1()
  .then(response => console.log(response)) //这里可以看到打印出了resolve()的结果
	.catch(error => console.log(error)) //如果状态为rejected或出现编译错误则在这一步打印
```
* 上面的语法使用了ES6语法
* 如果用ES5语法重写一遍是这样的，在支持这两种语法的编译器上效果都是一样的，Es6的语法更简洁
```
function promise1() {
	return new Promise(function(resolve, reject){
		setTimeout(function() {
			resolve('promise1-result')
		}, 1000)
	})
}
promise1()
  .then(function(response){
		console.log(response)
	})
	.catch(function(error){
		console.log(error)
	})
```
* 相比较下，会发现ES6的语法真的简洁太多
***
## 下面来详细说明一下Promise的语法
* new Promise( function(resolve, reject) {...} /* executor */ );
* Promise实例化时带有一个构造函数 executor，并接收 resolve 和 reject 两个参数的函数
* Promise构造函数执行时立即调用executor函数，并将 resolve 和 reject 两个函数作为参数传递给executor
* resolve 和 reject 函数被调用时，分别将Promise的状态改为fulfilled(完成) 或rejected(失败)
* 也就是说，executor 内部通常会执行一些异步操作，一旦异步操作执行完毕（可能成功/失败）
* 要么调用resolve函数来将Promise状态改成fulfilled
* 要么调用reject函数来将Promise状态改为rejected
* 如果在executor函数中抛出一个错误，即使没有调用reject,该Promise的状态也改为rejected

### 上面的实例场景中如果要体现resolve或reject, 我们这样写
```
function promise1() {
	return new Promise((resolve, reject) => {
		var result = '';
		setTimeout(() => {
			var result = 'async-result' //这里只是模拟数据，真实情况是异步获取数据
			if(!result) {
				reject('no result') //如果结果为空则更改状态为rejected并返回字符'no result'
			} else {
				resolve(result) //如果拿到结果则更改状态为fulfilled并返回 result
			}
		}, 1000)
	})
}
```
***
## 下面来细说一下Promise的方法
**Promise.all() .race() .resolve() .reject() .then() .catch() .finally()**
***
1. Promise.all(iterable)
* 这个方法返回一个新的Promise对象，常被用于处理多个Promise对象的状态集合
* 该对象在iterable参数对象里所有的Promise对象都成功时才触发成功
* 一旦有任何一个iterable里面的Promise对象失败则立即触发该Promise对象的失败
* 这个新的Promise对象在触发成功状态后，会把一个包含iterable里所有Promise返回值的数组作为成功回调的返回值 
* 如果触发了失败状态，则会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息
* 下面就用实例来演示说明：
```
const getRandom = () => (Math.random()*1000).toFixed(0);
//taskID为执行异步操作的任务ID
const asncyTask = (taskID) => new Promise( (resolve, reject) => {
	let timeout = getRandom();//这里模拟异步请求时间0~1000毫秒
	//打印出是哪一个任务ID在执行,还有一个简洁的写法 console.log(`taskID=${taskID} start.`)
	console.log('taskID=' + taskID + '---start.')
	//模拟异步执行
	setTimeout(() => {
		console.log(`taskID=${taskID} finished in time=${timeout}.`)
		resolve(taskID) //执行成功返回执行的ID
	}, timeout)
})

Promise.all([asncyTask(1), asncyTask(2), asncyTask(3)])
	.then(resultList => console.log('resultList: ', resultList)) //打印返回的结果数组
	.catch(error => console.log(error))
//上面的实例的执行结果打印出来如下：
taskID=1---start.
taskID=2---start.
taskID=3---start.
taskID=1 finished in time=109.
taskID=2 finished in time=790.
taskID=3 finished in time=840.
resultList:  (3) [1, 2, 3]
//可以看到所有的异步执行按照传入的数组顺序一一执行并返回数组结果了
```
***
2. Promise.race(iterable) 
* 当iterable参数里的任意一个子Promise被成功或失败后，
* 父Promise马上也会用子Promise的成功值或失败详情作为参数调用父Promise绑定的相应句柄，并返回该Promise对象
* 上面的解释很抽象也不太容易明白
* 其实，语法和all()一样，不同的是处理的逻辑不一样，
* race()只要根据传入的多个Promise实例中的任意一个实例有resolve或reject, 那就直接返回该结果，其它实例不再执行
* 下面还是通过一个实例来演示说明：
```
Promise.race([
	new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
	new Promise((resolve, reject) => setTimeout(() => resolve(2), 600)),
	new Promise((resolve, reject) => setTimeout(() => resolve(3), 300))
]).then(responseValue => console.log(responseValue))
//执行这段脚本后可以看到打印的结果是 3 ，因为第三个子Promise实例中的异步最先执行完成 300毫秒
//这个操作应用场景可以用于请求多个不同的服务器根据请求速度最先获取数据资源
```
***
3. Promise.resolve(value)
* 返回的Promise对象状态为fulfilled, 并且将该value传递给对应的then()方法
* 实例上面有，就不做解释了

***
4. Promise.reject(reason)
* 返回一个状态为失败(rejected)的Promise对象，并将给定的失败信息传递给对应的处理方法(catch())

***
### 下面三个是原型方法
5. Promise.prototype.then(onFulfilled, onRejected)
* 添加成功(fulfilled)或失败(rejected)回调到当前Promise,返回一个新的Promise,将以回调的返回值来resolve
* 应用时是用一个实现的Promise对象的实例来引用它，如 PromiseObj.then(responseValue)


6. Promise.prototype.catch(onRejected)
* 添加一个失败回调到当前Promise, 返回一个新的Promise,并以回调的返回值来resolve
* 应用时是用一个实现的Promise对象的实例来引用它，如 PromiseObj.then(responseValue).catch(reasonError)


7. Promise.prototype.finally(onFinally)
* 添加一个事件处理回调到当前Promise对象， 回调会在当前Promise运行完毕后被调用
* 无论当前Promise的状态是完成还是失败
* 如 PromiseObj.then(responseValue).catch(reasonError).finally(callback)
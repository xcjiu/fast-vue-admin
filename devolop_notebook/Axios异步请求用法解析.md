# Axios异步请求用法解析  
### [官方中文文档](http://www.axios-js.com/zh-cn/docs)
***
## 什么是Axios 
* Axios 是一个基于 Promise 的http库，使用非常方便
* 那么它有哪些特性呢：
	1. 从浏览器中创建 XMLHttpRequests
	2. 从 node.js 创建 http 请求
	3. 支持 Promise API
	4. 拦截请求和响应
	5. 转换请求数据和响应数据
	6. 取消请求
	7. 自动转换 JSON 数据
	8. 客户端支持防御 XSRF
	
## 安装引用
* npm install axios
* import axios from 'axios'
```
使用 cdn <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 下面来讲解具体用法：
* 假设测试的服务器请求统一在test.php ,内容如下：
```
<?php
if($_GET){
  echo json_encode(['method'=>'get', 'params'=>$_GET]);
} else if($_POST){
  echo json_encode(['method'=>'post', 'params'=>$_POST]);
} else {
  echo 'unknow method';
}
```

***
### 1. 执行 GET 请求
```
axios.get('http://localhost/test.php?id=123')
  .then(response => console.log(response.data)) //请求的返回结果存放在response.data
	.catch(error => console.log(error))
或者如果拼接的参数比较多时可以这样传参
axios.get('http://localhost/test.php', {
			params: {
				id: 123,
				content: 'some text'
			}
	})
  .then(response => console.log(response.data))
	.catch(error => console.log(error))
```

***
### 2. POST 请求
* 在使用axios.post()时要注意发送的数据格式问题
* 默认情况下,axios将javascrip对象序列化为JSON, 
* 而服务器端接收的post数据格式为'application/x-www-form-urlencoded'
* 在这里引入 qs 库 npm install qs           const Qs = require('qs')
```
 或使用 cdn <script src="https://cdn.bootcss.com/qs/6.5.1/qs.min.js"></script>
 
```

```
axios.post('http://localhost/test.php', Qs.stringify({
			firstParam: 'first',
			secondParam: 'second',
	}))
	.then(response => console.log(response.data))
	.catch(error => console.log(error))
```

* 如果不对数据格式做转换则不能正常被服务器接收
* 如果前端硬是不改变，后端有没有什么办法呢，当然是有的
* 这里传参数据不做处理

```
axios.post('http://localhost/test.php', {
			firstParam: 'first',
			secondParam: 'second',
	})
	.then(response => console.log(response.data))
	.catch(error => console.log(error))
```	

* test.php 内容做修改
```
//这里使用file_get_contents("php://input"); 接收原始流数据, 这个方式还要以接收文件和图片等资源
$params = file_get_contents("php://input");

//注意：这里要把数据json_decode($data, true); 做处理，接收到的只是个字符对象
echo json_encode(['method'=>'php-input', 'params'=>json_decode($data, true)]);

//这样的方式同样可以正确获取到数据
```


***

### 3. 执行多个并发请求
```
axios.all([
	axios.get('http://localhost/test.php?id=123'),
	axios.post('http://localhost/test.php', Qs.stringify({one: 'one', two: 'two'}))
]).then(response => console.log(response))
//执行多个并发请求时，返回的结果放在一个数组中，且每一项数据格式都和单个请求时的返回是一样的
//如果要依次获取打印结果,则如下：
	.then(response => {
		for(let i=0; i<response.length; i++){
			console.log(response[i].data)
		}
	})
```

***

### 4. axios 已封装好通用的实例方法：
```
//[, args] 中括号中的选项表示可选参数
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```	

***

### 5. 通过向 axios 传递相关配置来创建请求
```
axios({
	method: 'post',
	url: '',
	data: {},
	......
})
```

### 下面是所有的配置项说明：
```
{
   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

***

### 6. 自定义实例默认值
```
const instance = axios.create({
  baseURL: 'https://api.example.com',
	withCredentials: true, 
  timeout: 5000,
	......
});
```

***

### 7. 拦截器 在请求或响应被 then 或 catch 处理前拦截它们
#### 添加请求拦截器
```
const myInterceptor = axios.interceptors.request.use(config => {
	//在发送请求之前做些什么
	......
	return config;
},
error => {
	//对请求错误做些什么
	console.log(error)
	return Promise.reject(error)
})
```
#### 添加响应拦截器
```
const myInterceptor = axios.interceptors.response.use(response => {
	//对响应数据做点什么
	......
	return response;
},
error => {
	//对错误做点什么
	......
	return Promise.reject(error)
})
```
#### 移除拦截器
```
axios.interceptor.request.eject(myInterceptor)
````
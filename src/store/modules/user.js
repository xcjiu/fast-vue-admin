
const state = {
	username: '', //用户名，即账号
	avatar: '', //头像
	role: '', //角色，这是涉及到路由权限时要知道的
	token: '', //token验证要用到的，每次登录都不一样
	detail: '', //详情，可以包含注册日期，邮箱，手机号等等，你也可以单个拿出来定义，这里不做过多的细分
}

//定义 mutations 就是每个 state 属性赋值的过程，, 并且它会接受 state 作为第一个参数
//使用时这样用 store.commit('user/SET_TOKEN')
const mutations = {
	SET_USERNAME: (state, username) => {
		state.username = username
	},
	SET_ROLE: (state, role) => {
		state.role = role
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_DETAIL: (state, detail) => {
		state.detail = detail
	}
}

//actions 方法可以包含任意异步操作，默认接受一个 context 对象，该对象包含了 state, commit, getters
//异步操作中使用了 Promise，关于Promise的用法可参照本人的笔记：Promise用法解析
//github wiki (https://github.com/xcjiu/vue-admin-elementui/wiki/Promise用法解析)
//开源中国(https://my.oschina.net/u/4039033/blog/3064638)
const actions = {
	//登录时提交表单信息给服务器并获得返回的数据或错误信息
	//context对象中直接取 commit 这种写法更简便，用法和 import commit from 'context' 意思是一样的
	login({ commit }, loginForm) { 
		const { username, password } = loginForm
		return new Promise((resolve, reject) => {
			//这里发异步请求 (loginApi()方法我们会在后面详讲)
		  loginApi({ username: username.trim(), password: password.trim() })
			  .then(response => {
					const { data } = response
					commit('SET_TOKEN', data.token)
					setToken(data.token)
					resolve()
				})
				.catch(error => reject(error))
		}
	},
	userInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token)
			  .then(response => {
					
				})
				.catch(error => reject(error))
		})
	}
}

export default {
	namespace: true,
	state: {},
	mutations: {},
	actions: {},
	getters: {}
}

const state = {
	username: '', //用户名，即账号
	avatar: '', //头像
	role: '', //角色，这是涉及到路由权限时要知道的
	token: '', //token验证要用到的，每次登录都不一样
	detail: '', //详情，可以包含注册日期，邮箱，手机号等等，你也可以单个拿出来定义，这里不做过多的细分
}

export default {
	namespace: true,
	state: {},
	mutations: {},
	actions: {},
	getters: {}
}
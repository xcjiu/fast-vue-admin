<template>
	<div class="login-container">
		<el-form
		  ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			class="login-form"
			auto-complete="on"
		>
			<div class="title-container">
				<h2 class="title">后台登录</h2>
			</div>
			
			<el-form-item prop="username">
				<el-input
				  ref="username"
					v-model="loginForm.username"
					placeholder="请输入账号"
					name="username"
					type="text"
					tabindex="1"
					auto-complete="on"
					prefix-icon="el-icon-user"
				/>
			</el-form-item>
			
			<el-form-item prop="password">
				<el-input
				  :key="passwordType"
					ref="password"
					v-model="loginForm.password"
					:type="passwordType"
					placeholder="请输入密码"
					name="password"
					tabindex="2"
					auto-complete="on"
					@keyup.enter.native="handleLogin"
					prefix-icon="el-icon-lock"
					show-password
				/>
				</el-input>
			</el-form-item>
			
			<el-button 
			  :loading="loading"
				type="primary"
				class="login-btn"
				@click.native.prevent="handleLogin"
			>登 录</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			const validateUsername = (rule, value, callback) => {
				if(!value) {
					callback(new Error('请填写账号！'))
				} else {
					callback()
				}
			}
			const validatePassword = (rule, value, callback) => {
				if(!value) {
					callback(new Error('请输入密码！'))
				} else if (value.length < 6) {
					callback(new Error('密码不能少于6位'))
				} else {
					callback()
				}
			}
			return {
				loginForm: {
					username: '',
					password: ''
				},
				loginRules: {
					username: [{ required: true, trigger: 'blur', message: '请填写账号' }],
					password: [{ required: true, trigger: 'blur', validator: validatePassword }]
				},
				passwordType: 'password',
				loading: false,
				redirect: undefined
			}
		},
		watch: {
			$route: { //监听路由变化
				handler: function(route) {
					//route.query 是个对象，一个 key/value 表示URL查询参数, 如果没有查询参数则是个空对象
					//表示查询对象不为空，并且包含了 redirect 查询参数 然后取route.query.redirect 的值 
					//没有这个参数存在时则为 undefined
					this.redirect = route.query && route.query.redirect
				},
				immediate: true // 该回调将会在侦听开始之后被立即调用
			}
		},
		mounted() {
			if(this.loginForm.username === '') {
				this.$refs.username.focus()
			} else if(this.loginForm.password === '') {
				this.$refs.password.focus()
			}
		},
		methods: {
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if(valid) {
						this.loading = true 
						this.$store.dispatch('user/login', this.loginForm)
						  .then(() => {
								this.$router.push({ path: this.redirect || '/' })
								this.loading = false
							})
							.catch(error => {
								console.log(error)
								this.loading = false
							})
					} else {
						console.log('表单验证不通过！')
						return false
					}
				})
			}
		}
	}
</script>

<style scoped>
	/*这个登录盒子用了绝对定位, 因为我们要让背景图片刚好充满整个页面背景*/
	/*, 如果不这样用,它就会自适应高度, form表单的高度是不能覆盖整个页面的*/
	.login-container { 
		position: absolute;
		top: 0;
		left: 0;
		min-width: 100%;
		min-height: 100%;
		overflow: hidden;
		background: url(login-bg.jpg); /*背景图*/
		background-repeat: no-repeat; /*不重复*/
		background-size: 100% 100%;
	}
	el-form { /**---这里把默认背景去掉----**/
		background: transparent;
	}
	.login-form {
		width: 450px;
		margin: 10% auto;
		max-width: 89%;
		background-color: transparent;
		text-align: center;
		padding: 15px;
		/*添加阴影效果,会有一点悬浮的感觉*/
		box-shadow: rgba(13, 13, 13, 0.2) 0px 4px 8px 0px, rgba(13, 13, 13, 0.19) 0px 6px 20px 0px !important;
	}
	.title-container {
		margin-bottom: 15px;
		color: #409EFF;
	}
	.login-btn {
		width: 100%;
		font-size: 18px;
		font-weight: 800;
	}
  .el-input {
		display: inline-block;
		height: 45px;
	}
	.el-input__inner {
		background-color: transparent;
	}
</style>


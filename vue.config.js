'use strict'

const path = require('path')
const port = 5918 //端口号

module.exports = {
	//部署应用包时的基本 URL。用法和 webpack 本身的 output.publicPath 一致
	publicPath: '/',
	//生产环境构建文件的目录
	outputDir: 'dist',
	//静态资源目录
	assetsDir: 'assets',
	//设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告
	lintOnSave: process.env.NODE_ENV === 'development',
	//生产环境的 source map，设置为 false 以加速生产环境构建。
	productionSourceMap: false,
	
	//开发时服务器配置
	devServer: {
		port: port, //端口号
		open: true, //服务启动后自动打开浏览器页面，这里设置为true 那么package.js 中的 --open 参数就可以删除了
		hot: true, //开启热更
		overlay: { //编译存在错误或警告时只显示编译错误，警告信息不影响编译
			warnings: false,
			errors: true
		},
	},
	
	//对内部的 webpack 配置进行更细粒度的修改
	chainWebpack(config) {
		config.resolve.alias.set("@", path.join(__dirname, 'src')) //设置src目录别名，方便在以后通用
		//.vue文件的加载配置
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true
				return options
			})
			.end()
	}
}
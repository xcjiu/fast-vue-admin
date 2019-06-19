### 如果你还没有学习 Vue.js，强烈建议先学习一遍

[Vue.js中文文档](https://cn.vuejs.org/v2/guide/)

[Vue Cli 教程](https://cli.vuejs.org/zh/guide/)

[vue-router](https://router.vuejs.org/zh/)

[vuex](https://vuex.vuejs.org/zh/)

### 如果要用 Vue 来开发项目，上面的基础是必学的，一定要通读一遍，一遍不明白的就两遍

**在使用vue-cli之前我们先要安装这个包，打开命令行工具 npm install -g @vue/cli**
***
_注：Node 版本要求 Vue CLI 需要 Node.js 8.9 或更高版本 (推荐 8.11.0+)。你可以使用 nvm 或 nvm-windows 在同一台电脑中管理多个 Node 版本。_

检查安装版本：vue --version

现在的版本是 3.*

***
### 安装后运用vue命令来创建我们的项目（项目名称可以自定义）
* 在命令行中输入：**vue create vue-admin-elementui**

* 回车后会有提示 Please pick a present

* 这里我们按下一条选择 Manually select features

* 之所以不要 default 是因为我们还要顺带安装一下 vue-router 和 vuex 这些项目要用到的依赖

* 回车后会看到这些选项 按键移动到指定的选项 再按 空格键 来选中，这里我们选择了 Babel Router Vuex Css Linter 共五项

![seledt-preset](https://github.com/xcjiu/vue-admin-elementui/blob/master/note_images/vue-create-select.png)

一路回车，安装会需要一些时间

**安装完成后的目录结构如下:**

![项目目录结构](https://github.com/xcjiu/vue-admin-elementui/blob/master/note_images/vue-create-complete.png)

**我们的UI界面是运用 element-ui 插件，所以把这个插件也安装一下,新版本的vue提供了Element插件，vue 命令安装这个插件**

* _首先进入项目根目录:_  **cd vue-admin-elementui**
* **vue add element**

**安装过程出现这个界面**

![element-ui安装](https://github.com/xcjiu/vue-admin-elementui/blob/master/note_images/vue-add-element.png)

* 我们输入 y ，回车， 再选择第一项zh-CN 中文版，继续回车

* 安装成功后，我们发现多了一个目录 plugins 并且目录下生成了一个 element.js 文件

![vue-add-element-success](https://github.com/xcjiu/vue-admin-elementui/blob/master/note_images/vue-add-element-success.png)

* 打开 main.js 会发现 import './plugins/element.js' 已经自动帮我们引入了这个插件了

### 至此，项目的准备工作就差不多了。

* 打开 配置文件package.json (在项目根目录下) 看到scripts配置项，这个配置项是项目的启动配置项
```
"scripts": {

    "serve": "vue-cli-service serve", //把这一行稍作修改 "dev": "vue-cli-service serve" 改成dev是个人习惯，你也可以不改

    "build": "vue-cli-service build",

    "lint": "vue-cli-service lint"

  },
```
	
	* 我们来解释一下这三个启动配置每一个的含意
	1. **"vue-cli-service serve"**  这个命令会启动一个开发服务器(基于 webpack-dev-server) 
	  并附带开箱即用的模块热重载 (Hot-Module-Replacement)。我们在开发阶段使用 npm run dev 来启动服务
		记得我把 "serve" 修改为 "dev" 了吗，如果没有修改，那使用 npm run serve 效果是一样的，前面的名称可以自定义
	
	2. **"vue-cli-service build"**  这个命令适用于生产环境的打包
	  会在 dist/ 目录产生一个可用于生产环境的包，带有 JS/CSS/HTML 的压缩
	
	3. **"vue-cli-service lint"**  执行这个命令 校验并修复文件中的错误。如果没有指定文件，则会校验 src 和 test 中的所有文件。
	
* 启动项目时的默认端口是 8080 
	
* 我们试运行一下项目: **npm run dev**
	
* 等待一会儿看到如下显示说明启动成功：

![npm-run-dev](https://github.com/xcjiu/vue-admin-elementui/blob/master/note_images/npm-run-dev.png)
	
* 浏览器中打开 localhost:8080 ，如果在 "dev": "vue-cli-service serve --open" 加上 --open 参数则会自动在浏览器打开这个页面
	
* 项目成功运行, 可以看到如下的页面效果

![page-show](https://github.com/xcjiu/vue-admin-elementui/blob/master/note_images/localhost8080.png)

***
### 项目的创建工作就是这样了，接下来正式进入项目的开发工作 
### 下一节：[项目需求分析](https://github.com/xcjiu/vue-admin-elementui/wiki/项目需求分析)

### 上一节：[开发环境部署](https://github.com/xcjiu/vue-admin-elementui/wiki/开发环境部署)
	
### [回导航](https://github.com/xcjiu/vue-admin-elementui/wiki/Home)
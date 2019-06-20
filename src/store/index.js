import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user.js'

const modules = { 
	user,
}

export default new Vuex.Store({
  modules
})

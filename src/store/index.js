import Vue from 'vue'
import Vuex from 'vuex'
import user from './models/user'
import global from './models/global'
import tags from './models/tags'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user, global, tags
	},
	getters
})
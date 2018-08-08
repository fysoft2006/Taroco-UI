import Vue from 'vue'
import Vuex from 'vuex'
import user from './models/user'
import global from './models/global'
import common from './models/common';
import tags from './models/tags'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user, global, common, tags
	},
	getters
})
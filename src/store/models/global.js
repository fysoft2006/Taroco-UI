import website from '@/const/website'

export default {
	name: 'global',
	state: {
		isCollapse: false,
		website: website
	},
	mutations: {
		changeCollapse (state, isCollapse) {
			state.isCollapse = typeof isCollapse === 'undefined' ? !state.isCollapse : isCollapse 
		},
	},
	actions: {
		changeCollapse ({ commit }, isCollapse) {
			commit('changeCollapse', isCollapse)
		}
	}
}
import website from '@/const/website'

export default {
	name: 'global',
	state: {
		isCollapse: false,
		currentPath: [
			{
				title: '首页',
				path: '/',
				name: 'dashboard'
			}
		],
		website: website
	},
	mutations: {
		changeCollapse (state, isCollapse) {
			state.isCollapse = typeof isCollapse === 'undefined' ? !state.isCollapse : isCollapse 
		},
		// 设置面包屑数组
		setCurrentPath(state, pathArr) {
            state.currentPath = pathArr;
		}
	},
	actions: {
		changeCollapse ({ commit }, isCollapse) {
			commit('changeCollapse', isCollapse)
		}
	}
}
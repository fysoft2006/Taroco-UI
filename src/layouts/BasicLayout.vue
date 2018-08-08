/**
@description 首页基本布局文件
@author huangyang
@date 2018/03/14
*/
<template>
	<el-container class="thjk-aside" style="height:100%">
		<sidebar></sidebar>
		<el-container>
			<header-layout :isCollapse="isCollapse"></header-layout>
			<tags></tags>
			<el-main>
				<router-view />
			</el-main>
			<el-footer>
				<p class="global-footer-copyright">Copyright <i class="anticon ant-icon-copyright"></i>2018 Taroco</p>
			</el-footer>
		</el-container>
	</el-container>
</template>

<script>
import HeaderLayout from './HeaderLayout';
import tags from './tags';
import sidebar from "./sidebar/";
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'BasicLayout',
	// 计算属性
  	computed: {
  		...mapState({
			isCollapse: state => state.global.isCollapse
		}),
		...mapGetters({
			menuList: 'menu'
		})
  	},
  	methods: {
		handleOpen(key, keyPath) {
			
		},
		handleClose(key, keyPath) {
			
		}
	},
	components: {
		HeaderLayout, tags, sidebar
	}
}
</script>

<style lang="scss" >
	@import '../styles/vars/element-variables.scss';
		
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 256px;
	}

	.#{$--prefixClass}-aside {
		.collapse-sm {
			width: 64px !important;
		}
		.logo {
			width: 100%;
			height: 64px;
			line-height: 64px;
			padding-left: 20px;
			background-color: #002140;
			overflow: hidden;

			.img {
				display: inline-block;
				width: 32px;
				height: 32px;
				vertical-align: middle;
			}

			h1 {
				display: inline-block;
				margin-left: 12px;
				color: #fff;
				font-size: 20px;
				font-weight: 600;
				vertical-align: middle;
			}
		}

		.el-aside {
			width: auto !important;
			background-color: transparent;
			overflow-x: hidden;
			height: 100%;
			.el-menu {
				border-right: 1px solid $--menu-item-fill;
			}

			.el-menu-item.is-active {
				color: $--el-menu-color;
			}

			.el-submenu [class^="el-icon-"],
			.el-menu [class^="el-icon-"] {
				color: $--el-menu-color;
			}

			.el-submenu__title:hover, 
			.el-submenu__title:focus,
			.el-submenu [class^="el-icon-"]:focus,
			.el-submenu [class^="el-icon-"]:hover,
			.el-menu [class^="el-icon-"]:focus,
			.el-menu [class^="el-icon-"]:hover {
				background-color: transparent;
				color: $--el-menu-hover-color;

				i {
					color: $--el-menu-hover-color;
				}
			}

			.el-menu-item:hover, 
			.el-menu-item:focus {
				background-color: #1890ff;
				color: $--el-menu-hover-color;

				i {
					color: $--el-menu-hover-color;
				}
			}

			.el-menu-item-group,
			.el-menu--inline {
				background: #000c17;
				box-shadow: inset 0 2px 8px rgba(0,0,0,.45);
			}
		}

		.global-footer-copyright {
			line-height: 60px;
			color: rgba(0,0,0,.45);
    		font-size: 14px;
    		text-align: center;
		}
	}
	
</style>
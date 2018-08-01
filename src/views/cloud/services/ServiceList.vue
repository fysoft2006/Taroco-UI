<template>
	<el-row class="thjk-worlplace">
		<el-row class="card-layout">
			<el-alert
				title="当前服务状态"
				type="success"
				:closable="false"
				:description="description">
			</el-alert>
		</el-row>
		<el-card class="card-layout">
			<!-- <span slot="header">服务列表</span> -->
			<service-table ref="ServiceTable" :serviceList="serviceList"></service-table>
		</el-card>
		
	</el-row>
</template>

<script>
import ServiceTable from '@/components/table/ServiceTable'
export default {
	components: {
  		ServiceTable
  	},
	data () {
		return {
			serviceList: [],
			serverSum: {
				total: 0,
				up: 0,
				down: 0
			}
		}
	},
	computed: {
		description: function() {
			return '服务总数：' + this.serverSum.total+'，UP数量：'+ this.serverSum.up +'，DOWN数量：'+this.serverSum.down;
		}
	},
	created() {
		this.queryServiceList();
		this.queryServiceSum();
	},
	methods: {
		queryServiceList() {
			const url = '/taroco-admin/api/applications';
			util.ajax(url, 'get')
			.then((data) => {
				if (data.status === 'SUCCEED') {
					this.serviceList = data.result;
				}
			});
		},
		queryServiceSum() {
			const url = '/taroco-admin/api/applications/sum';
			util.ajax(url, 'get')
			.then((data) => {
				if (data.status === 'SUCCEED') {
					this.serverSum = data.result;
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	
	.thjk-worlplace {

		.card-layout {
			margin-bottom: 20px;
		}

		.el-select, .el-date-editor.el-input {
			width: 100%;
		}
	}
	
</style>
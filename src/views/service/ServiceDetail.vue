/** 服务实例详情 */
<template>
    <div>
        <div class="top">
            <span class="name">服务名称: {{serviceName}}</span>&nbsp;&nbsp;
            <span class="name">实例ID: {{instanceId}} </span>
        </div>
        <el-tabs v-model="activeName" style="padding: 0 10px;">
            <el-tab-pane label="服务日志" name="logger">
                <service-logger :instanceId="instanceId"></service-logger>
            </el-tab-pane>
            <el-tab-pane label="服务指标" name="metrics">
                <service-metrics :instanceId="instanceId"></service-metrics>
            </el-tab-pane>
            <el-tab-pane label="映射列表" name="mappings">
                <service-mappings :instanceId="instanceId"></service-mappings>
            </el-tab-pane>
            <el-tab-pane label="环境参数" name="envs"></el-tab-pane>
            <el-tab-pane label="请求追踪" name="trace"></el-tab-pane>
            <el-tab-pane label="线程转储" name="heapdump"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ServiceLogger from './components/ServiceLogger';
    import ServiceMetrics from './components/ServiceMetrics';
    import ServiceMappings from './components/ServiceMappings';
    export default {
        components: {
            ServiceLogger,ServiceMetrics,ServiceMappings
        },
        data() {
            return {
                activeName: 'logger',
                serviceName: '',
                instanceId: ''
            }
        },
        computed: {
            
        },
        created() {
            if (this.$route.query) {
                this.serviceName = this.$route.query.serviceName;
                this.instanceId = this.$route.query.instanceId;
            }
        },
        methods: {
            
        },
    }
</script>

<style lang="scss" scoped>
    .top{
        //margin-top: -10px;
        margin-bottom: 10px;
        //background-color: #2d8cf0;
        //padding: 15px 10px;
        a{
            cursor: pointer;
            color: #409EFF;
            &:hover{
                text-decoration: underline;
            }
        }
        .name{
            font-size: 14px;
            color: #333333;
        }
    }
</style>
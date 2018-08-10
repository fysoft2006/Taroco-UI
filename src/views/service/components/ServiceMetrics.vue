<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <span>classes</span>
                    </div>
                    <div v-for="item in classes" :key="item.name" class="item">
                        <span>{{item.name}}</span>
                        <span class="value">{{item.value}}</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <span>gc</span>
                    </div>
                    <div v-for="item in gc" :key="item.name" class="item">
                        <span>{{item.name}}</span>
                        <span class="value">{{item.value}}</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <span>threads</span>
                    </div>
                    <div v-for="item in threads" :key="item.name" class="item">
                        <span>{{item.name}}</span>
                        <span class="value">{{item.value}}</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header">
                        <span>heap</span>
                    </div>
                    <div v-for="item in heap" :key="item.name" class="item">
                        <span>{{item.name}}</span>
                        <span class="value">{{item.value}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-card class="box-card">
            <div slot="header">
                <span>counter</span>
            </div>
            <div v-for="item in counter" :key="item.name" class="item">
                <span>{{item.name}}</span>
                <span class="value">{{item.value}}</span>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header">
                <span>gauge</span>
            </div>
            <div v-for="item in gauge" :key="item.name" class="item">
                <span>{{item.name}}</span>
                <span class="value">{{item.value}}</span>
            </div>
        </el-card>
    </div>
</template>

<script>
    import request from '@/router/axios';
    export default {
        props: {
            instanceId: {
                type: String
            },
        },
        data() {
            return {
                metrics: [],
                counter: [],
                gauge: [],
                gc: [],
                heap: [],
                threads: [],
                classes: []
            }
        },
        watch: {
            metrics(newValue, oldValue) {
                if (newValue) {
                    this.classes = [];
                    this.counter = [];
                    this.gauge = [];
                    this.gc = [];
                    this.heap = [];
                    this.threads = [];
                }
                
                // 服务指标分组
                for (const key in newValue) {
                    if (newValue.hasOwnProperty(key)) {
                        const val = newValue[key];
                        if (key.includes('classes')) {
                            this.classes.push({
                                name: key,
                                value: val
                            });
                        } else if(key.includes('counter')) {
                            this.counter.push({
                                name: key,
                                value: val
                            });
                        } else if(key.includes('gauge')) {
                            this.gauge.push({
                                name: key,
                                value: val
                            });
                        } else if(key.includes('gc')) {
                            this.gc.push({
                                name: key,
                                value: val
                            });
                        } else if(key.includes('heap')) {
                            this.heap.push({
                                name: key,
                                value: val
                            });
                        } else if(key.includes('threads')) {
                            this.threads.push({
                                name: key,
                                value: val
                            });
                        }
                    }
                }
            }
        },
        methods: {
            queryMetrics() {
                const url = '/taroco-admin/api/applications/' + this.instanceId + "/metrics";
                request({
                    url: url,
                    method: 'get'
                })
                .then((res) => {
                    let data = res.data;
                    this.metrics = data;
                });
            }
        },
        mounted() {
            this.queryMetrics();
        }
    }
</script>
<style lang="scss" scoped>

    .box-card {
        margin-bottom: 10px;
    }

    .item{
        margin-bottom: 5px;
        .value{
            float: right;
        }
    }
</style>

<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="12" v-for="(key, item) in envs" :key="instanceId + '-' + item">
                <el-card class="box-card" shadow="hover" style="margin-bottom: 10px;">
                    <div slot="header">
                        <span :style="{color: theme}">{{item}}</span>
                    </div>
                    <div>
                        {{key}}
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import request from '@/router/axios';
    export default {
        props: {
            instanceId: {
                type: String
            }, 
        },
        computed: {
            ...mapGetters(["theme"])
        },
        data() {
            return {
                envs: {}
            }
        },
        watch: {
            envs(newValue) {
                 if (newValue) {
                    
                }
            }
        },
        mounted() {
            this.query();
        },
        methods: {
            query() {
                const url = '/taroco-admin/api/applications/' + this.instanceId + "/env";
                request({
                    url: url,
                    method: 'get'
                })
                .then((res) => {
                    this.envs = res.data;
                    console.log(this.envs);
                });
            }
        },
    }
</script>

<style scoped>

</style>
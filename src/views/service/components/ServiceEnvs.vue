<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-collapse accordion>
                    <el-collapse-item class="box-card" v-for="(key, item) in envs" :key="instanceId + '-' + item">
                        <template slot="title">
                            <h3 :style="{color: theme}">
                                <i class="el-icon-info"></i> {{item}}
                            </h3>
                        </template>
                        <div v-for="(value, name) in key" class="item">
                            <span>{{name}}</span>
                            <span class="value">{{value}}</span>
                        </div>
                    </el-collapse-item>
                </el-collapse>
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
        // mounted() {
        //     this.initEditor();
        // },
        created() {
            this.query();
        },
        methods: {
            initEditor() {
                var ace = require('brace');
                require('brace/mode/javascript');
                require('brace/theme/monokai');

                let editor = ace.edit('editor');
                editor.getSession().setMode('ace/mode/javascript');
                this.editor.setTheme('ace/theme/monokai');
                editor.setFontSize(16);
                editor.getSession().setTabSize(2);
                editor.setValue('{"name":"sds"}');
            },
            query() {
                const url = '/taroco-admin/api/applications/' + this.instanceId + "/env";
                request({
                    url: url,
                    method: 'get'
                })
                .then((res) => {
                    this.envs = res.data;
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .box-card {
        margin-bottom: 10px;
    }

    .item{
        font-size: 14px;
        margin-bottom: 5px;
        .value{
            float: right;
            margin-right: 10px;
        }
    }
</style>
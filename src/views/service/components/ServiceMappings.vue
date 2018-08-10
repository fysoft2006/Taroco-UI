<template>
    <div>

    </div>
</template>

<script>
    
    export default {
        props: {
            instanceId: {
                type: String
            },
        },
        data() {
            return {
                
            }
        },
        mounted() {
            this.queryMappings();
        },
        methods: {
            queryMappings() {
                const url = '/taroco-admin/api/applications/' + this.instanceId + "/mappings";
                util.ajax(url, 'get')
                .then((data) => {
                    console.log(data);
                });
            }
        },
    }
</script>

<style scoped>

</style>
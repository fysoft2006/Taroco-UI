/** turbine监控页面 */
<template>
    <div style="height: 100%;">
        <iframe id="turbineIframe"  frameborder=0 name="showHere" scrolling=auto :src="url" width="100%" height="100%"></iframe>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: ''
            }
        },
        mounted() {
            if (this.$route.query && this.$route.query.url) {
                this.url = this.$route.query.url;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>


<template>
    <div class="e-loading" v-show="visible">
        <img class="icon-loading" src="@/assets/img/loading.gif">
    </div>
</template>

<script>
    export default {
        data () {
            return {
                visible: false
            }
        },
        methods: {},
        components: {},
        computed: {},
        mounted () {
        },
    }
</script>

<style type="text/less" lang="less">
    .e-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        & > .icon-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 60px;
            transform: translate(-50%, -50%);
            z-index: 2;
        }
    }
</style>

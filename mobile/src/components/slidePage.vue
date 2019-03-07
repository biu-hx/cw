<template>
    <div class="page-container">
        <eleBg :source="source.bg"/>
        <div class="page-content" :style="style">
            <template v-for="(item,index) in source.imgs">
                <eleImg :source="item" v-if="item.url" :key="'img'+index"/>
            </template>
            <eleHotspot :source="item" v-for="(item,index) in source.hotspot" :key="'hotspot'+index"/>
            <canvasPlug v-if="source.plug.status" :source="source"/>
        </div>
    </div>
</template>

<script>
    import canvasPlug from './bargainPlug/canvasPlug'
    import eleBg from './common/eleBg'
    import eleImg from './common/eleImg'
    import eleHotspot from './common/eleHotspot'

    export default {
        data () {
            return {}
        },
        props: ["source"],
        methods: {},
        components: {
            eleBg,
            eleImg,
            eleHotspot,
            canvasPlug
        },
        computed: {
            style () {
                let s = this.source
                return {
                    width: this.convertToRem(s.style.width),
                    height: this.convertToRem(s.style.height),
                }
            }
        },
        mounted () {
        }
    }
</script>

<style type="text/less" lang="less">
    .page-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        & > .page-content {
            position: relative;
            margin: 0 auto;
            /*flex: 1 1 auto;*/
            flex: 0 0 auto;
        }
    }
</style>
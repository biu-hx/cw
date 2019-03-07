<template>
    <div class="page-container" :style="{width: source.style.width+'px', height: source.style.height+'px'}" v-if="source"
         style="transform: scale(.4);transform-origin: 0 0;">
        <StageCanvasBg :source="source" />
        <div class="page-comp" v-for="(item, index) in source.imgs" :key="'img'+index"
             :style="{width: item.style.width + 'px',height: item.style.height + 'px',top: item.style.top + 'px',left: item.style.left + 'px'}">
            <img :src="item.url" v-show="item.url"
                 :style="{width: item.style.width + 'px',height: item.style.height + 'px'}">
        </div>

        <div class="page-comp hotspot" v-for="(item, index) in source.hotspot" :key="'hotpot'+index"
             :style="{width: item.style.width + 'px',height: item.style.height + 'px',top: item.style.top + 'px',left: item.style.left + 'px'}">
        </div>
        <canvas-plug v-if="source.plug.status" :source="source.plug"></canvas-plug>
    </div>
    <div v-else></div>
</template>

<script>
    import StageCanvasBg from './StageCanvasBg'
    import canvasPlug from './bargainPlug/canvasPlug'

    export default {
        data () {
            return {}
        },
        props: ['source'],
        methods: {},
        components: {
            StageCanvasBg,
            canvasPlug
        },
        computed: {},
        created () {
        },
        mounted () {
        },
    }
</script>

<style type="text/less" lang="less">
    .page-container {
        position: relative;
        overflow: hidden;
        & > .page-bg-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            & > img {
                position: absolute;
            }
        }
        .page-comp {
            position: absolute;
            overflow: hidden;
            font-size: 0;
            &.hotspot {
                background: rgba(236, 76, 41, 0.6);
            }
        }
    }
</style>
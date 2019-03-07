<template>
    <div class="ele-hotspot" @click="onClick"
         :style="style">
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        props: ["source"],
        methods: {
            // 图片事件
            onClick () {
                if (this.source.action.type === 2) {
                    // window.location.href = this.source.action.value
                } else {
                    window.$swiper.slideTo(this.source.action.index - 1)
                }
            },
        },
        components: {},
        computed: {
            style () {
                let s = this.source.style;
                return {
                    width: this.convertToRem(s.width),
                    height: this.convertToRem(s.height),
                    top: this.convertToRem(s.top),
                    left: this.convertToRem(s.left)
                }
            }
        },
        mounted () {
            console.log("mounted", this.source)
        }
    }
</script>

<style type="text/less" lang="less" scoped>
    .ele-hotspot {
        position: absolute;
        line-height: 0;
        font-size: 0;
        overflow: hidden;
    }
</style>
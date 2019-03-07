<template>
    <div class="ele-img"
         :style="style"
         @click="onClick">
        <img :src="source.url"
             :style="imgStyle">
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
                // let data = this.source
                // if (data.action && data.action.length > 0 && data.action[0].value) {
                //     this.triggerEvent()
                // }
            },
        },
        components: {},
        computed: {
            imgStyle () {
                let s = this.source.style
                return {
                    width: this.convertToRem(s.width),
                    height: this.convertToRem(s.height)
                }
            },

            style () {
                let s = this.source.style
                return {
                    width: this.convertToRem(s.width),
                    height: this.convertToRem(s.height),
                    top: this.convertToRem(s.top),
                    left: this.convertToRem(s.left)
                }
            }
        },
        mounted () {
        },
    }
</script>

<style type="text/less" lang="less" scoped>
    .ele-img {
        position: absolute;
        line-height: 0;
        font-size: 0;
        overflow: hidden;
    }
</style>
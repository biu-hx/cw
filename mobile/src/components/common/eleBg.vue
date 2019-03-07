<template>
    <div class="ele-bg" :style="style">
        <!--<img src="" alt="">-->
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        props: ["source"],
        methods: {},
        components: {},
        computed: {
            style () {
                let bg = this.source
                let style = {
                    // width: bg.style.width + 'px',
                    // height: bg.style.height + 'px',
                    opacity: bg.style.opacity / 100,
                    backgroundColor: bg.style.backgroundColor,
                }

                if (bg.type === 1) {
                    style['backgroundImage'] = `url(${bg.img.url})`
                    style = Object.assign(style, bg.img.style)
                } else if (bg.type === 2) {
                    style['backgroundImage'] = `url(${bg.texture.url})`
                    style = Object.assign(style, bg.texture.style)
                }
                return style
            }
        },
        mounted () {
        },
    }
</script>

<style type="text/less" lang="less">
    .ele-bg {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
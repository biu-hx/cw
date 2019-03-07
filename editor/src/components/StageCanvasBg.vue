<template>
    <div class="page-bg-wrapper"
         :style="[bgBasic, bgImg]">
        <!--<img v-if="source.bg.type ===2" :src="source.bg.img.url">-->
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
            bgBasic () {
                let bg = this.source.bg
                return {
                    opacity: (100 - (bg.style.opacity || 0)) / 100,
                    backgroundColor: bg.style.backgroundColor,
                    backgroundSize: 'contain',
                    width: bg.style.width + 'px',
                    height: bg.style.height + 'px'
                }
            },
            bgImg () {
                let bg = this.source.bg
                if (bg.type === 1) {
                    return Object.assign({}, {backgroundImage: `url(${bg.img.url})`}, bg.img.style)
                }

                if (bg.type === 2) {
                    return Object.assign({}, {backgroundImage: `url(${bg.texture.url})`}, bg.texture.style)
                }

                return {}
            },
        },
        mounted () {
        },
    }
</script>
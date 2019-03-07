<template>
    <div class="swiper-container">
        <ol class="swiper-wrapper">
            <li class="swiper-slide" v-for="(item,index) in templateData.pages" :key="index">
                <slide-page :source="item"></slide-page>
            </li>
        </ol>
        <div class="swiper-pagination"></div>

        <div class="loading-container" v-if="!hadLoad">
            <img src="@/assets/loading.gif" width="20%">
        </div>

    </div>
</template>

<script>
    import Swiper from 'swiper'
    import slidePage from '@/components/slidePage'

    export default {
        name: 'home',
        data () {
            return {
                source: {},
                templateData: "",

                hadLoad: false
            }
        },
        props: ["type", "id"],
        methods: {
            initSwiper () {
                let mySwiper = new Swiper('.swiper-container', {
                    direction: 'vertical',
                    resistanceRatio: 0,
                    mousewheel: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                });
                window.$swiper = mySwiper
            },
            getSource (type, id) {
                let data = {id}
                let {mode} = this.$route.query

                if (type == 'template') {
                    data["need_content"] = 1
                } else if (type === "worker") {
                    data["need_opt"] = 1
                } else if (type === "preview") {
                    data["need_opt"] = mode == "server" ? 2 : 4
                }

                this.$http.post({
                    url: type == 'template' ? 'template/detail' : 'editor/detail',
                    data: data
                }).then(res => {
                    let source = type == 'template' ? res.template : res.editor
                    let sourceContent = type == 'template' || type == "worker" ? source.content : mode == "server" ? source.edit_content : source.temporary_content

                    this.source = source
                    this.templateData = JSON.parse(sourceContent);
                    this.$store.commit("updateState", {name: "source", value: source})
                    this.$nextTick(() => {
                        this.initSwiper()
                        this.hadLoad = true
                    })
                }).catch(err => {
                    err.next()
                })
            }
        },
        components: {
            slidePage
        },
        mounted () {
            if (this.type && this.id) {
                this.getSource(this.type, this.id)
            }
        }
    }
</script>

<style lang="less">
    .useragent {
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        color: #fff;
        z-index: 999999999999;
    }

    .swiper-container {
        &,
        .swiper-wrapper {
            height: 100%;
        }
    }

    .swiper-pagination-bullet {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(255, 255, 255, 1);
    }

    .swiper-pagination-bullet-active {
        background: rgba(255, 255, 255, .5);
    }

    .loading-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 199;
        background: rgba(255, 255, 255, 1);
    }
</style>

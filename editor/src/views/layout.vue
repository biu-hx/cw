<template>
    <div class="e-container">
        <EHeader/>
        <section class="e-content">
            <template>
                <EAside/>
                <EAsideTemplate v-if="showAsideTemplate"/>
            </template>

            <div class="e-stage">
                <div class="e-mask e-mask-left"></div>
                <div class="e-mask e-mask-right"></div>
                <router-view/>
            </div>
            <EAsideRight :isCreated="isCreated" @creatActive="closeIfame=false"/>
        </section>
        <div class="e-container-mask" v-show="showAsideTemplate" @click="closeAsideTemplate"></div>

        <EPreview v-if="previewActive"/>
        <EPublish v-if="publishActive"/>
        <!--iframe 新建活动弹窗-->
        <div class="creat-active-fixed" v-if="!closeIfame">
            <div class="creat-active-wrap">
                <iframe name="creatActive" :src="acriveUrl" @load="iframeOnLoad" frameborder="0" width="100%"
                        height="100%"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store/store'
    import EHeader from '@/components/EHeader'
    import EAside from '@/components/EAside'
    import EAsideRight from '@/components/EAsideRight'
    import EAsideTemplate from '@/components/EAsideTemplate'

    import EPreview from '@/components/EPreview'
    import EPublish from '@/components/EPublish'

    export default {
        name: 'layout',
        components: {
            EPreview,
            EPublish,

            EAside,
            EHeader,
            EAsideRight,
            EAsideTemplate
        },
        data() {
            return {
                acriveUrl:process.env.VUE_APP_WEB+ '/#/activity?isFromIframe=true',
                // acriveUrl: 'http://localhost:8080/#/activity?isFromIframe=true',
                closeIfame: true,
                isCreated:0,//是否创建成功
            }
        },
        computed: {
            showAsideTemplate() {
                return this.$store.state.showAsideTemplate
            },
            previewActive() {
                return this.$store.state.previewActive
            },
            publishActive() {
                return this.$store.state.publishActive
            }
        },
        methods: {
            closeAsideTemplate() {
                // this.$store.commit("showAsideTemplate")
            },
            iframeOnLoad() {
                let _this=this;
                let frameWindow = window.frames["creatActive"].window;
                window.addEventListener('message', function (messageEvent) {
                    let data = messageEvent.data;
                    switch (data) {
                        case 'newAdd':
                            // window.location.href = 'http://localhost:8080/#/gift';
                            window.location.href = process.env.VUE_APP_WEB+ '/#/gift';
                            break;
                        case 'closeIframe':
                            _this.closeIfame = true;
                            break;
                        case 'newSuccess':
                            _this.closeIfame = true;
                            _this.isCreated=_this.isCreated+1;
                            break;
                    }
                }, false);
            }
        },
        mounted() {

        }
    }
</script>

<style lang="less">
    .e-container {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        & > .e-content {
            position: relative;
            flex: 1 1 auto;
            width: 100%;
        }
    }

    .e-stage {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #ccc;
        z-index: 2;

        & > .e-mask {
            position: absolute;
            top: 0;
            height: 100%;
            width: calc(50% - 187.5px);
            background: rgba(0, 0, 0, .45);
            pointer-events: none;
            user-select: none;
            z-index: 1;
        }

        & > .e-mask-left {
            left: 0;
        }

        & > .e-mask-right {
            right: 0;
        }
    }

    .e-container-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .1);
        z-index: 10;
    }

    .creat-active-fixed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
        z-index: 2999;

        & > .creat-active-wrap {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 90%;
            height: 71%;
            max-width: 1140px;
            max-height: 780px;
            background: #fff;
            transform: translate(-50%, -50%);

            & > .close-iframe {
                position: absolute;
                right: 25px;
                top: 24px;
                width: 18px;
                height: 18px;
                cursor: pointer;

                & > img {
                    width: 100%;
                }
            }
        }
    }
</style>

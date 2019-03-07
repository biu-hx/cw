<template>
    <div class="e-stage-content">
        <div class="e-stage-content-mask"></div>

        <div class="e-stage-main" v-if="activePageData" v-loading="stageLoading">
            <div class="e-alert" v-if="alertVisible">
                <label v-if="alertType === 1">如果找不到灵感，可以使用 <span @click="openAsideTemplate">模板</span> 哟</label>
                <label v-else>不满意当前模板？ <span @click="openAsideTemplate">重新选择</span></label>
                <img src="@/assets/img/icon-close.png" class="icon-close" @click="alertVisibleEvent=false">
            </div>
            <div class="e-canvas"
                 :style="{width: activePageData.style.width+'px', height: activePageData.style.height+'px'}">
                <StageCanvasBg :source="activePageData"/>
                <template v-for="(item,index) in activePageData.imgs">
                    <StageCanvasImage :source.sync="item"
                                      :index="index"
                                      :key="'image_'+item.timestamp"/>
                </template>
                <template v-for="(item,index) in activePageData.hotspot">
                    <StageCanvasHotspot :source.sync="item"
                                        :index="index"
                                        :key="'hotspot_'+item.timestamp"/>
                </template>
                <canvas-plug v-if="activePageData.plug.status"
                             :source="activePageData.plug"/>
            </div>

            <div class="e-stage-footer">
                <span> {{activePageData.style.width}} x {{activePageData.style.height}}px</span>
            </div>
        </div>

        <div class="e-stage-content-mask"></div>
    </div>
</template>

<script>
    import StageCanvasBg from '@/components/StageCanvasBg'
    import StageCanvasImage from '@/components/StageCanvasImage'
    import StageCanvasHotspot from '@/components/StageCanvasHotspot'
    import canvasPlug from '@/components/bargainPlug/canvasPlug'

    export default {
        data () {
            return {
                alertType: 1,
                alertVisibleEvent: true
            }
        },
        props: ["templateId"],
        methods: {
            openAsideTemplate () {
                this.$store.commit("showAsideTemplate", 1)
            },

            getTemplateData ({templateId, type, categroy}) {
                this.alertType = type === 'temp' ? 2 : 1
                if (templateId) {
                    this.$store.dispatch("getTemplateDetail", {type, id: templateId})
                }
            }
        },
        components: {
            StageCanvasBg,
            StageCanvasImage,
            StageCanvasHotspot,
            canvasPlug,
        },
        computed: {
            activePageData () {
                return this.$store.getters.activePageData
            },
            stageLoading () {
                return this.$store.state.stageLoading
            },
            accessToken () {
                return this.$store.state.accessToken
            },
            random () {
                return this.$store.getters.random
            },
            alertVisible () {
                return this.$store.state.publishStatus === 3 || !this.alertVisibleEvent ? false : true
            }
        },
        mounted () {
            this.$store.dispatch("createActivitySource")
            this.$store.dispatch("getUserInfo")
            this.getTemplateData(this.$route.query)
        },
        watch: {
            $route (route) {
                this.getTemplateData(route.query)

            }
        }
    }
</script>

<style type="text/less" lang="less">
    .e-stage-content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-content: space-between;
        align-items: center;
        margin: 0 auto;
        width: 375px;
        height: 100%;

        & > .e-stage-content-mask {
            position: relative;
            flex: 1 1 auto;
            width: 100%;
            pointer-events: none;
            user-select: none;
            background: rgba(0, 0, 0, .45);
            z-index: 1;
        }

        & > .e-stage-main {
            position: relative;
            flex-shrink: 0;

            & > .e-alert {
                position: absolute;
                top: -60px;
                padding: 0 30px;
                width: 375px;
                line-height: 40px;
                color: #666;
                letter-spacing: 0.5px;
                text-align: center;
                background: rgba(238, 238, 238, 1);
                z-index: 2;

                span {
                    color: #9380F2;
                    text-decoration: underline;
                    cursor: pointer;
                }

                & > .icon-close {
                    position: absolute;
                    top: 50%;
                    margin-top: -7px;
                    right: 13px;
                    cursor: pointer;
                }

            }

            & > .e-stage-footer {
                position: absolute;
                left: 0;
                bottom: -30px;
                width: 100%;
                /*width: calc(100% + 2px);*/
                line-height: 30px;
                color: #fff;
                text-align: center;
                background: rgba(101, 101, 101, 1);
                /*border: 1px solid rgba(221, 221, 221, 1);*/
            }

            & > .e-canvas {
                position: relative;
                background: #fff;
            }
        }

    }
</style>
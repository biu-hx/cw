<template>
    <e-dialog style="background:rgba(51,51,51,0.9);">

        <div class="preview-container">
            <div class="preview-head">
                <img src="@/assets/img/preview-head.png" class="preview-head">
                <span>我的策玩</span>
            </div>

            <div class="preview-framed">
                <!--嵌入iframe-->
                <iframe name="preview" :src="url" frameborder="0" width="376px"
                        height="603px" class="preview-frame" @load="iframeOnLoad"></iframe>
            </div>
            <div class="preview-menu">
                <img src="@/assets/img/icon-close.circle.png" class="preview-menu-close"
                     @click="updatePreviewActive(0)">
                <div class="preview-menu-content">
                    <button class="preview-menu-arrow" @click="togglePage(-1)">
                        <img src="@/assets/img/icon-arrow-prev.png">
                    </button>

                    <!--<span class="preview-menu-text" v-show="pagesLength">{{activePageIndex}}/{{pagesLength}}</span>-->

                    <button class="preview-menu-arrow" @click="togglePage(1)">
                        <img src="@/assets/img/icon-arrow-next.png">
                    </button>
                </div>
            </div>
            <div class="preview-footer">
                <button class="e-btn is-round" @click="toPublish">发布</button>
            </div>
        </div>
    </e-dialog>
</template>

<script>
    let frameWindow = ''
    export default {
        data () {
            return {
                url: ''
            }
        },
        methods: {
            togglePage (value) {
                if (frameWindow.$swiper) {
                    if (value > 0) {
                        frameWindow.$swiper.slideNext()
                    } else {
                        frameWindow.$swiper.slidePrev()
                    }
                }
            },
            updatePreviewActive (data) {
                this.$store.commit("updateStoreState", {previewActive: data})
            },
            toPublish () {
                if (!this.activitySource.plugType || this.activitySource.plugType > 0 && this.activitySource.activeId) {
                    this.$store.commit("updateStoreState", {previewActive: 0, publishActive: 1})
                } else {
                    this.$toast("请选择活动类型！")
                }
            },

            iframeOnLoad () {
                frameWindow = window.frames["preview"].window;
            }
        },
        components: {},
        computed: {
            activitySource () {
                return this.$store.state.activitySource
            },
            previewEditorData () {
                return this.$store.state.previewEditorData
            }
        },
        mounted () {
            this.$store.dispatch("publishTemplate", {
                is_draft: 1,
                is_temp: 1
            }).then(res => {
                this.url = res.editor.preview_url
            })
        }
    }
</script>

<style type="text/less" lang="less">
    .preview-container {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 20px 15px;
        margin: -268px -155px;
        width: 310px;
        height: 536px;

        background: #fff;
        border-radius: 16px;
        & > .preview-head {
            position: relative;
            font-size: 0;
            & > span {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 5px;
                font-size: 14px;
                color: #fff;
                text-align: center;
            }
        }
        & > .preview-framed {
            width: 280px;
            height: 449px;
            background: #fff;
            overflow: hidden;
        }

        & > .preview-footer {
            position: absolute;
            left: 0;
            bottom: -70px;
            width: 100%;
            & > .e-btn {
                width: 100%;
                height: 40px;
                color: #333;
                font-size: 16px;
                background: #fff;
            }
        }
        & > .preview-menu {
            display: flex;
            align-content: center;
            flex-direction: column;
            position: absolute;
            top: 0;
            right: -70px;
            bottom: 0;

            & > .preview-menu-content {
                flex: 1 1 auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                & > .preview-menu-arrow {
                    margin: 15px 0;
                    padding: 0;
                    width: 40px;
                    height: 40px;
                    background: rgba(0, 0, 0, 0);
                    &:disabled {
                        cursor: not-allowed;
                    }
                }
                & > .preview-menu-text {
                    padding: 25px 0;
                    color: #fff;
                    font-size: 20px;
                    /*font-weight: 600;*/
                }

            }

            .preview-menu-close,
            .preview-menu-arrow {
                width: 40px;
                cursor: pointer;
            }
        }
    }

    .preview-frame {
        width: 375px;
        height: 603px;
        transform-origin: 0 0;
        transform: scale(0.747);
    }

</style>
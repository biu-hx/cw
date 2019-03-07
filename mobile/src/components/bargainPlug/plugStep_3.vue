<template>
    <div class="plugStep_3">
        <div class="share-wrap text-center" id="faultTree" ref="faultTree" :style="[bgImg]">
            <div class="model_top">
                <div class="share-title" v-if="!step_3.title.isShow" :style="[titleStyle]">{{activeInfo.name}}</div>
            </div>
            <div class="model_middle">
                <div class="project-name" v-if="!step_3.name.isShow">
                    <div class="line left-line"></div>
                    <div class="project-name-text" :style="[nameStyle]">{{activeInfo.gift_tag}}</div>
                    <div class="line right-line"></div>
                </div>
            </div>
            <div class="qrcode">
                <img v-if="qrcordeUrl" :src="qrcordeUrl">
            </div>
        </div>
        <div class="qrcode-hint" :style="[hintStyle]">长按保存，分享到朋友圈找好友帮你省钱</div>
        <div class="close-btn" @click="close"><img src="@/assets/icon-plug-close.png" alt=""></div>
        <!-- 显示图片区域 -->
        <img class="canvasImg" :src="dataURL" alt="">
    </div>
</template>

<script>
    import html2canvas from 'html2canvas';

    export default {
        data() {
            return {
                curType: this.$route.params.type,//当前是否是正式环境
                qrcordeUrl: '',
                dataURL: '',
                browserId: this.$route.query.uid,
            }
        },
        props: ['activeInfo', 'source', 'isQrcode', 'editor_id'],
        components: {html2canvas},
        computed: {
            step_3() {
                return this.source.plug.step_3;
            },
            bgImg() {
                return this.source.plug.step_3.setBgImg;
            },
            hintStyle() {
                return this.source.plug.step_3.hintText.style;
            },
            titleStyle() {
                return this.source.plug.step_3.title.style;
            },
            nameStyle() {
                return this.source.plug.step_3.name.style;
            },
            getActiveId() {
                return this.activeInfo.id || '';
            }
        },
        methods: {
            // 获取邀请二维码
            getInviteImg() {
                this.$http.post({
                    url: '/bargain/invitation',
                    data: {
                        id: this.activeInfo.id,// 活动id
                        template_id: this.editor_id,//作品ID
                        source_id: this.browserId,//邀请人唯一身份标识
                    }
                }).then(res => {
                    this.qrcordeUrl = res.bargain_result.data_url;
                    this.canvasImg();
                }).catch(({next}) => next())

            },
            // 生成图片
            canvasImg() {
                var opts = {useCORS: true};
                this.dataURL = "";
                html2canvas(this.$refs.faultTree, opts).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/jpeg");
                    this.dataURL = dataURL;
                });

            },
            // 关闭弹窗
            close() {
                this.$emit('closeStep_3');
            },
        },
        watch: {
            getActiveId(newVal, oldVal) {
                // if (this.curType == 'worker' && newVal != oldVal) {
                //     this.getInviteImg();
                // }

            }
        }
    }
</script>

<style scoped>
    .canvasImg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .plugStep_3 {
        position: absolute;
        left: 0;
        height: 100%;
        width: 100%;
        bottom: 0;
        background: #F4F4F4;
    }

    .model_top {
        height: 2.625rem;
        width: 100%;
    }

    .model_middle {
        height: 16.25rem;
        width: 100%;
    }

    .share-wrap {
        display: flex;
        align-items: center;
        flex-flow: column nowrap;
        position: relative;
        height: 100%;
        padding-top: 8.75rem;
        box-sizing: border-box;
    }

    .share-title {
        font-weight: bold;
        color: #333333;
        font-size: 1.875rem;
        line-height: 2.625rem;
        width: 100%;
        text-align: center;
    }

    .project-name {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: #333333;
        font-size: 0.875rem;
        height: 1.25rem;
        margin: 8.1875rem 0 6.8125rem;
    }

    .project-name-text {
        line-height: 1.25rem;
        margin: 0 0.3125rem;
    }

    .line {
        width: 2.8125rem;
        height: 0.0625rem;
        background: #DDDDDD;
    }

    .qrcode {
        width: 6.25rem;
        height: 6.25rem;
        border-radius: 0.125rem;
        background: #FFFFFF;
    }

    .qrcode img {
        width: 100%;
        height: 100%;
    }

    .qrcode-hint {
        width: 100%;
        color: #666666;
        font-size: 0.75rem;
        background: #FFFFFF;
        height: 1.5625rem;
        text-align: center;
        z-index: 1;
        line-height: 1.5625rem;
        position: absolute;
        bottom: 0;
    }

    .close-btn {
        cursor: pointer;
        position: absolute;
        width: 1.25rem;
        right: 0.9375rem;
        z-index: 1;
        top: 0.9375rem;
    }

    .close-btn img {
        width: 100%;
    }
</style>
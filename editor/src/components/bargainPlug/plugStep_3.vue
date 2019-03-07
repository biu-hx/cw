<template>
    <div class="plugStep_3" id="faultTree" ref="faultTree" :style="[bgImg]">
        <div class="share-wrap text-center">
            <div class="model_top">
                <div class="share-title" v-if="!step_3.title.isShow" :style="[titleStyle]">
                    {{activeInfo?activeInfo.name:'活动名称'}}
                </div>
            </div>
            <div class="model_middle">
                <div class="project-name" v-if="!step_3.name.isShow">
                    <div class="line left-line"></div>
                    <div class="project-name-text" :style="[nameStyle]">{{activeInfo?activeInfo.gift_tag:'砍价项目名称'}}
                    </div>
                    <div class="line right-line"></div>
                </div>
            </div>
            <div class="close-btn" @click="close"><img src="@/assets/img/icon-plug-close.png" alt=""></div>
            <div class="qrcode"><img src="@/assets/img/plug-test-qrcode.png" alt=""></div>

            <div class="qrcode-hint" :style="[hintStyle]">长按保存，分享到朋友圈找好友帮你省钱</div>
        </div>
        <!-- 显示图片区域 -->
        <img class="canvasImg" :src="dataURL" alt="">
    </div>
</template>

<script>
    import html2canvas from 'html2canvas';

    export default {
        data() {
            return {
                dataURL: '',
            }
        },
        props: ['source', 'activeInfo'],
        components: {html2canvas},
        computed: {
            step_3() {
                return this.source.step_3;
            },
            bgImg() {
                return this.source.step_3.setBgImg;
            },
            hintStyle() {
                return this.source.step_3.hintText.style;
            },
            titleStyle() {
                return this.source.step_3.title.style;
            },
            nameStyle() {
                return this.source.step_3.name.style;
            },
            activePageData() {
                return this.$store.getters.activePageData
            },
        },
        methods: {
            // 生成图片
            canvasImg() {
                var opts = {useCORS: true};
                this.dataURL = "";
                html2canvas(this.$refs.faultTree, opts).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/jpeg");
                    this.dataURL = dataURL;
                });

            },
            close(){
                Object.assign(this.activePageData.plug.step_1, {isShow: false});
                Object.assign(this.activePageData.plug.step_3, {isShow: false});
                Object.assign(this.activePageData.plug, {curStep: 2, isBargain: true,isShow: false});
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            }
        }
    }
</script>

<style scoped>
    .canvasImg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
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
        height: 42px;
        width: 100%;
    }

    .model_middle {
        height: 260px;
        width: 100%;
    }

    .share-wrap {
        display: flex;
        align-items: center;
        flex-flow: column nowrap;
        position: relative;
        height: 100%;
        padding-top: 140px;
        box-sizing: border-box;
    }

    .share-title {
        font-weight: bold;
        color: #333333;
        font-size: 30px;
        line-height: 42px;
        width: 100%;
        text-align: center;
    }

    .project-name {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: #333333;
        font-size: 14px;
        height: 20px;
        margin: 131px 0 109px;
    }

    .project-name-text {
        line-height: 20px;
        margin: 0 5px;
    }

    .line {
        width: 45px;
        height: 1px;
        background: #DDDDDD;
    }

    .qrcode {
        width: 100px;
        height: 100px;
        border-radius: 2px;
        background: #FFFFFF;
        overflow: hidden;
    }

    .qrcode img {
        width: 100%;
        height: 100%;
    }

    .qrcode-hint {
        width: 100%;
        color: #666666;
        font-size: 12px;
        background: #FFFFFF;
        height: 25px;
        line-height: 25px;
        position: absolute;
        bottom: 0;
    }
    .close-btn{
        cursor: pointer;
        position: absolute;
        width: 20px;
        right: 15px;
        top: 15px;
    }
    .close-btn img{
        width: 100%;
    }

</style>
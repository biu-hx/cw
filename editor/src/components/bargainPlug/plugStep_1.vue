<template>
    <div class="plugStep_1_wrap">
        <div class="plugStep_1" :style="[bgImg]">
            <div class="headImg-wrap">
                <div class="upload-img" v-if="source.step_1.isShowHeadBg" :style="[headImg]">
                    <div class="upload-head-bg">
                        <img src="@/assets/img/plug-addImg.png" alt="">
                        <p class="hint-text">双击上传图片</p>
                        <BaseUploadImg class="handel-btn" accept="image/jpeg,image/png" type="5"
                                       @change="inputChangeHead"/>
                    </div>

                </div>
            </div>

            <div class=" project-style">
                <div v-if="source.step_1.formatType==1" class="project-style-1 text-center">
                    <div :style="{color: source.step_1.setName.name}" class="project-name">
                        {{activeInfo?activeInfo.gift_tag:'砍价项目名称'}}
                    </div>
                    <div class="project-price">
                        <span :style="{color: source.step_1.setName.desc}">已经砍了<b
                                :style="{color: source.step_1.setName.price}">20</b>元</span>
                    </div>
                </div>
                <div v-if="source.step_1.formatType==2" class="project-style-2 text-center">
                    <div :style="{color: source.step_1.setName.name}" class="project-name">
                        {{activeInfo?activeInfo.gift_tag:'砍价项目名称'}}
                    </div>
                    <div :style="{color: source.step_1.setName.desc}" class="text-1">已经砍了</div>
                    <div :style="{color: source.step_1.setName.price}" class="project-price"><b>20</b>元
                    </div>
                </div>
                <div :style="[btnStyle]" class="confirm-btn">
                    <input type="text" :style="{color:source.step_1.setBtn.color}" @change="editorText" maxlength="6"
                           v-model="confirmText" class="editor-text">
                    <div class="start-editor-wrap">
                        <div class="start-editor" @click="closeToast">
                            <span>编辑后一步弹窗</span><img src="@/assets/img/plug-crow-r.png" alt="">
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>

<script>
    import BaseUploadImg from '../BaseUploadImg'

    export default {
        data () {
            return {
                confirmText: this.source.step_1.confirmText
            }
        },
        props: ['source', 'activeInfo'],
        components: {BaseUploadImg},
        computed: {
            bgImg() {
                return this.source.step_1.setBgImg;
            },
            headImg() {
                return this.source.step_1.setHeadImg;
            },
            btnStyle() {
                return this.source.step_1.setBtn;
            },
            activePageData() {
                return this.$store.getters.activePageData
            },
        },
        methods: {
            // 确定关闭弹窗&砍价详情
            closeToast() {
                Object.assign(this.activePageData.plug.step_1, {isShow: false});
                Object.assign(this.activePageData.plug.step_5, {isShow: false});
                Object.assign(this.activePageData.plug, {curStep: 3, isBargain: true});
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            },
            inputChangeHead({url}) {
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.activePageData.plug.step_1, {setHeadImg: obj});
                Object.assign(this.activePageData.plug.step_1.initData.headImg, {index: -1});
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            },
            editorText(){
                if (this.confirmText.length > 6) {
                    this.$toast('当前字数限制为6位');
                    this.confirmText = this.confirmText.substr(0, 6);
                } else {
                    Object.assign(this.activePageData.plug.step_1, {confirmText: this.confirmText});
                }
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            }
        }
    }
</script>

<style scoped>
    .plugStep_1_wrap {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        /*background: rgba(0, 0, 0, 0.75);*/
    }

    .plugStep_1 {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 345px;
        height: 340px;
        background: #DDDDDD;
        transform: translate(-50%, -50%);
    }

    .editor-text {
        width: 100%;
        height: 100%;
        border: none;
        text-align: center;
        caret-color: #000;
        color: #ffffff;
        font-size: 15px;
        background: transparent;
        /*display: none;*/
    }

    .start-editor-wrap {
        display: none;
        position: absolute;
        top: 175px;
        left: 50%;
        transform: translate(-50%);
        box-sizing: border-box;
        padding-top: 5px;
    }

    .start-editor {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #292D45;
        color: #B7B9C3;
        width: 166px;
        height: 34px;
        border-radius: 17px;
        cursor: pointer;

    }

    .start-editor img {
        width: 8px;
        margin-left: 6px;
        margin-top: 4px;
    }

    .headImg-wrap {
        height: 150px;
    }

    .upload-img {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
        height: 150px;
    }

    .upload-head-bg {
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
    }

    .upload-head-bg img {
        width: 36px;
    }

    .handel-btn {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .hint-text {
        margin: 10px 0 0;
        font-size: 14px;
        color: #999999;
    }

    .project-style {
        color: #333333;
        display: flex;
        height: 190px;
        position: relative;
        align-items: center;
        flex-flow: column nowrap;
        /*background: #ababab;*/
    }

    .project-name {
        font-size: 15px;
        padding-top: 35px;
    }

    .project-price {
        font-size: 12px;
        padding: 8px 0 32px;
    }

    .project-price b {
        font-size: 30px;
        font-weight: bold;
        margin: 0 6px 0 10px;
    }

    .project-style-2 .project-name {
        padding-top: 23px;
    }

    .project-style-2 .text-1 {
        padding-top: 10px;
    }

    .project-style-2 .project-price {
        padding: 5px 0 20px;
    }

    .confirm-btn {
        font-size: 15px;
        color: #ffffff;
        background: #8A7CCF;
        border-radius: 4px;
        width: 200px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        text-align: center;
        border: 1px solid transparent;
    }

    .confirm-btn:hover .start-editor-wrap {
        display: block;
    }

</style>
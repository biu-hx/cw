<template>
    <div class="plugStep_1_wrap">
        <div class="plugStep_1" :style="[bgImg]">
            <div class="headImg-wrap">
                <div class="upload-img" v-if="!source.step_5.isShowHeadBg" :style="[headImg]">
                    <div class="upload-head-bg">
                        <img src="@/assets/img/plug-addImg.png" alt="">
                        <p class="hint-text">双击上传图片</p>
                        <BaseUploadImg class="handel-btn" accept="image/jpeg,image/png" type="5"
                                       @change="inputChangeHead"/>
                    </div>

                </div>
            </div>
            <div class="int-info-wrap">
                <input :style="[inputStyle]" class="int-info" type="text" placeholder="输入您的姓名">
                <input :style="[inputStyle]" class="int-info" type="text" placeholder="输入您的手机号">
            </div>

            <div class=" project-style">
                <div :style="[btnStyle]" @click="closeToast" class="confirm-btn">
                    立即发起砍价
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
            return {}
        },
        props: ['source', 'activeInfo'],
        components: {BaseUploadImg},
        computed: {
            bgImg () {
                return this.source.step_5.setBgImg;
            },
            headImg () {
                return this.source.step_5.setHeadImg;
            },
            inputStyle(){
                return this.source.step_5.setInput;
            },
            btnStyle () {
                return this.source.step_5.setBtn;
            },
            activePageData () {
                return this.$store.getters.activePageData
            },
        },
        methods: {
            // 确定关闭弹窗&砍价详情
            closeToast () {
                Object.assign(this.activePageData.plug.step_1, {isShow: true});
                Object.assign(this.activePageData.plug.step_5, {isShow: false});
                Object.assign(this.activePageData.plug, {curStep: 2});
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            },
            inputChangeHead ({url}) {
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.activePageData.plug.step_5, {setHeadImg: obj});
                Object.assign(this.activePageData.plug.step_5.initData.headImg, {index: -1});
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            },
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

    .start-editor-wrap {
        display: none;
        position: absolute;
        top: 40px;
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
    .int-info-wrap{
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        height: 134px;

    }
    .int-info{
        width: 240px;
        height: 40px;
        outline: none;
        font-size: 15px;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #DDDDDD;
        margin-bottom: 10px;
    }
    .int-info::placeholder{
        color: #CCCCCC;
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
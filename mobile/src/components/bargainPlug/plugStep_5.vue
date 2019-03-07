<template>
    <div class="plugStep_5_wrap" @click="closeMsg">
        <div class="plugStep_5" :style="[bgImg]">
            <div class="headImg-wrap">
                <div class="upload-img" v-if="!source.plug.step_5.isShowHeadBg" :style="[headImg]"></div>
            </div>
            <div class="int-info-wrap flex-column">
                <div class="flex-column input-blur">
                    <input :style="[inputStyle]" v-model="userName" @blur="intoView" class="int-info" type="text" placeholder="输入您的姓名">
                    <input :style="[inputStyle]" v-model="userTel" @blur="intoView" class="int-info" type="text" placeholder="输入您的手机号">
                </div>

            </div>

            <div class=" project-style">
                <div :style="[btnStyle]" @click="closeToast" class="confirm-btn">
                    立即发起砍价
                </div>

            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                userName: '',
                userTel: '',
            }
        },
        props: ['source', 'activeInfo'],
        computed: {
            bgImg() {
                return this.source.plug.step_5.setBgImg;
            },
            headImg() {
                return this.source.plug.step_5.setHeadImg;
            },
            inputStyle() {
                return this.source.plug.step_5.setInput;
            },
            btnStyle() {
                return this.source.plug.step_5.setBtn;
            },
        },
        methods: {
            closeMsg(event){
                let btn = document.querySelector(".plugStep_5");
                if(btn){
                    if(!btn.contains(event.target)){       //以外的区域
                       this.$emit('closeStep_5')
                    }
                }
            },
            // 确定关闭弹窗&砍价详情
            closeToast() {
                let telRegexp = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
                if (this.userName.length > 6) {
                    this.$toast('姓名最多输入6位');
                    return false;
                }
                if (!telRegexp.test(this.userTel)) {
                    this.$toast('请输入正确的手机格式号');
                    return false;
                }
                this.$emit('addUserInfo', {userName: this.userName, userTel: this.userTel});
            },
            intoView(){
                setTimeout(function() {
                    let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100);
            },

        }
    }
</script>

<style scoped>
    .plugStep_5_wrap {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        /*background: rgba(0, 0, 0, 0.75);*/
    }

    .plugStep_5 {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 21.5625rem;
        height: 21.25rem;
        background: #DDDDDD;
        transform: translate(-50%, -50%);
    }

    .headImg-wrap {
        height: 9.375rem;
    }

    .upload-img {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
        height: 9.375rem;
    }

    .project-style {
        color: #333333;
        display: flex;
        /*height: 11.875rem;*/
        position: relative;
        align-items: center;
        flex-flow: column nowrap;
        /*background: #ababab;
         */
    }

    .int-info-wrap {
        height: 8.375rem;
    }
    .flex-column{
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .int-info {
        width: 15rem;
        height: 2.5rem;
        outline: none;
        font-size: 0.9375rem;
        text-align: center;
        border-radius: 0.25rem;
        border: 1px solid #DDDDDD;
        margin-bottom: 0.625rem;
    }

    .int-info::placeholder {
        color: #CCCCCC;
    }

    .confirm-btn {
        font-size: 0.9375rem;
        color: #ffffff;
        background: #8A7CCF;
        border-radius: 0.25rem;
        width: 12.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        cursor: pointer;
        text-align: center;
        border: 1px solid transparent;
    }
</style>
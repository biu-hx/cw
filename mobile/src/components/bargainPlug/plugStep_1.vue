<template>
    <div class="plugStep_1_wrap">
        <div class="plugStep_1" :style="[bgImg]">
            <div class="headImg-wrap">
                <div class="upload-img" v-if="source.plug.step_1.isShowHeadBg" :style="[headImg]"></div>
            </div>
            <div class=" project-style">
                <div v-if="source.plug.step_1.formatType==1" class="project-style-1 text-center">
                    <div :style="{color: source.plug.step_1.setName.name}" class="project-name">
                        {{activeInfo.gift_tag}}
                    </div>
                    <div class="project-price">
                        <span :style="{color: source.plug.step_1.setName.desc}">已经砍了<b
                                :style="{color: source.plug.step_1.setName.price}">{{joinInfo.total_price}}</b>元</span>
                    </div>
                </div>
                <div v-if="source.plug.step_1.formatType==2" class="project-style-2 text-center">
                    <div :style="{color: source.plug.step_1.setName.name}" class="project-name">
                        {{activeInfo.gift_tag}}
                    </div>
                    <div :style="{color: source.plug.step_1.setName.desc}" class="text-1">已经砍了</div>
                    <div :style="{color: source.plug.step_1.setName.price}" class="project-price"><b>{{joinInfo.total_price}}</b>元
                    </div>
                </div>
                <button :style="[btnStyle]" @click="closeToast" class="confirm-btn">{{isHelped?'我也要省钱':source.plug.step_1.confirmText}}</button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                browserId: this.$route.query.uid,
            }
        },
        props: ['activeInfo', 'source', 'joinInfo','isHelped'],
        computed: {
            bgImg() {
                return this.source.plug.step_1.setBgImg;
            },
            headImg() {
                return this.source.plug.step_1.setHeadImg;
            },
            btnStyle() {
                return this.source.plug.step_1.setBtn;
            },
        },
        methods: {
            // 确定关闭弹窗&砍价详情
            closeToast() {
                this.$emit('bargainInfo');
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
        height: 11.875rem;
        position: relative;
        align-items: center;
        flex-flow: column nowrap;
        /*background: #ababab;
         */
    }

    .project-name {
        font-size: 0.9375rem;
        padding-top: 2.1875rem;
    }

    .project-price {
        font-size: 0.75rem;
        padding: 0.5rem 0 2rem;
    }

    .project-price b {
        font-size: 1.875rem;
        font-weight: bold;
        margin: 0 0.375rem 0 0.625rem;
    }

    .project-style-2 .project-name {
        padding-top: 1.4375rem;
    }

    .project-style-2 .text-1 {
        padding-top: 0.625rem;
    }

    .project-style-2 .project-price {
        padding: 0.3125rem 0 1.25rem;
    }

    .confirm-btn {
        font-size: 0.9375rem;
        color: #ffffff;
        background: #8A7CCF;
        border-radius: 0.25rem;
        width: 12.5rem;
        height: 2.5rem;
        border: 1px solid transparent;
    }
</style>
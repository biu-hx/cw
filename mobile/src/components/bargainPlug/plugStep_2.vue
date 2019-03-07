<template>
    <div class="plugStep_2">
        <div class="menu-btn-wrap">
            <div class="invite-wrap">
                <div v-if="activePageData.plug.step_2.formatType==1" class="flex-center">
                    <div class="invite-style-1">
                        <div class="invite-title">已有3个小伙伴帮砍价</div>
                        <div class="flex-star invite-desc">
                            <div class="overed-money">已砍价9000元，加油</div>
                            <div class="show-dsc-link">查看详情>></div>
                        </div>
                    </div>
                    <div class="head-model flex-star">
                        <div v-for="i in 5" class="user-head"></div>
                    </div>
                </div>
                <div  v-if="activePageData.plug.step_2.formatType==2" class="flex-center invite-style-2-wrap">
                    <div class="head-model flex-star">
                        <div v-for="i in 5" class="user-head"></div>
                    </div>
                    <div class="invite-style-2">
                        <div class="invite-title">已有3个小伙伴帮砍价</div>
                        <div class="flex-star invite-desc">
                            <div class="overed-money">已砍价9000元，加油</div>
                        </div>
                    </div>
                    <div class="show-dsc-link">查看详情</div>
                </div>


            </div>
            <div  class="show-desc-btn menu-btn">查看楼盘详情</div>
            <div :style="[btnStyle]" class="start-bargain-btn menu-btn" @click="editorStep(3)">召唤好友帮我砍价</div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {
            btnStyle() {
                return this.activePageData.plug.step_2.setBtn;
            },
            activePageData() {
                return this.$store.getters.activePageData
            },
        },
        methods: {}
    }
</script>

<style scoped>
    .plugStep_2 {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 0;
    }

    .flex-star {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .flex-space-between {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .invite-style-1 {
        margin-right: 2.4375rem;
    }

    .invite-style-2-wrap .head-model {
        margin-right: 0.625rem;
    }

    .invite-style-2-wrap .invite-style-2 {
        width: 10.9375rem;
        border-right: 0.0625rem solid #DDDDDD;
        margin-right: 0.625rem;
    }

    .overed-money {
        font-size: 0.75rem;
        margin-right: 1.3125rem;
    }

    .head-model .user-head:nth-child(1) {
        margin-left: 0;
    }

    .user-head {
        width: 1.875rem;
        height: 1.875rem;
        margin-left: -1.25rem;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid #DDDDDD;
        background: #EEEEEE;
    }

    .invite-wrap {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 21.5625rem;
        height: 3.75rem;
        top: -4.4375rem;
        left: 0.9375rem;
        border-radius: 1.875rem;
        color: #5E5E5E;
        background: #FFFFFF;
        box-shadow: 0 0.125rem 0.25rem 0 rgba(0, 0, 0, 0.23);
    }

    .invite-title {
        font-size: 1rem;
        line-height: 1.375rem;
    }

    .invite-desc {
        line-height: 1.0625rem;
    }

    .show-dsc-link {
        color: rgba(138, 124, 207, 1);
        text-decoration: none;
        font-size: 0.75rem;
    }

    .menu-btn-wrap {
        display: flex;
        box-sizing: border-box;
        padding: 0.75rem 0.9375rem;
        position: relative;
        width: 100%;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
    }

    .menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        border-radius: 0.25rem;
        cursor: pointer;
    }

    .show-desc-btn {
        width: 7.1875rem;
        height: 2.5rem;
        color: #5E5E5E;
        margin-right: 0.5625rem;
        background: #FFFFFF;
        box-sizing: border-box;
        border: 1px solid #CCCCCC;
    }

    .start-bargain-btn {
        width: 13.875rem;
        height: 2.5rem;
        color: #FFFFFF;
        background: #8A7CCF;
        box-sizing: border-box;
        border: 1px solid #8A7CCF;
    }
</style>
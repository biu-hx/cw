<template>
    <div class="plugStep_2">
        <div class="menu-btn-wrap">
            <div class="invite-wrap">
                <div v-if="source.step_2.formatType==1" class="flex-center">
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
                <div  v-if="source.step_2.formatType==2" class="flex-center invite-style-2-wrap">
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
        props:['source'],
        computed: {
            btnStyle(){
             return this.source.step_2.setBtn;
            },
            activePageData() {
                return this.$store.getters.activePageData
            },
        },
        methods: {

        }
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
        margin-right: 39px;
    }

    .invite-style-2-wrap .head-model {
        margin-right: 10px;
    }

    .invite-style-2-wrap .invite-style-2 {
        width: 175px;
        border-right: 1px solid #DDDDDD;
        margin-right: 10px;
    }

    .overed-money {
        font-size: 12px;
        margin-right: 21px;
    }

    .head-model .user-head:nth-child(1) {
        margin-left: 0;
    }

    .user-head {
        width: 30px;
        height: 30px;
        margin-left: -20px;
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
        width: 345px;
        height: 60px;
        top: -71px;
        left: 15px;
        border-radius: 30px;
        color: #5E5E5E;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
    }

    .invite-title {
        font-size: 16px;
        line-height: 22px;
    }

    .invite-desc {
        line-height: 17px;
    }

    .show-dsc-link {
        cursor: pointer;
        color: rgba(138, 124, 207, 1);
        text-decoration: none;
        font-size: 12px;
    }


    .menu-btn-wrap {
        display: flex;
        box-sizing: border-box;
        padding: 12px 15px;
        position: relative;
        width: 100%;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
    }

    .menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
    }

    .show-desc-btn {
        width: 115px;
        height: 40px;
        color: #5E5E5E;
        margin-right: 9px;
        background: #FFFFFF;
        box-sizing: border-box;
        border: 1px solid #CCCCCC;
    }

    .start-bargain-btn {
        width: 222px;
        height: 40px;
        color: #FFFFFF;
        background: #8A7CCF;
        box-sizing: border-box;
        border: 1px solid #8A7CCF;
    }
</style>
<template>
    <div class="plugStep_4" :style="[bgImg]">
        <div class="start-invite-wrap">
            <div class="img-wrap" :style="[cardBg]">
                <div v-if="(activeInfo&&activeInfo.bargain_gift.show_type==1)||!activeInfo&&formatType==1" class="card-style-1">
                    <div class="offset-wrap">
                        <div class="card-num text-right">NO.XXXXXXXXXXXX</div>
                        <div class="flex-space-between">
                            <div>
                                <div class="deduction-price"><span>￥<b class="deduction-price-num">{{activeInfo?activeInfo.bargain_gift.gift.price:'1000'}}</b>元{{activeInfo?activeInfo.bargain_gift.gift.type==1?'优惠券':'抵扣券':'抵扣券'}}</span>
                                </div>
                                <div class="deduction-name">{{activeInfo?activeInfo.gift_tag:'砍价项目名称'}}</div>
                            </div>
                            <div class="qrcode">
                                <!--<img src="@/assets/img/plug-test-qrcode.png" alt="">-->
                            </div>

                        </div>
                    </div>
                    <div class="term text-center">{{activeInfo?activeInfo.bargain_gift.gift.valid_start_time.split(' ')[0]:'2019/01/11'}} —— {{activeInfo?activeInfo.bargain_gift.gift.valid_end_time.split(' ')[0]:'2019/01/11'}}</div>
                </div>
                <div v-if="(activeInfo&&activeInfo.bargain_gift.show_type==2)||!activeInfo&&formatType==2"
                     class="card-style-2 flex-space-between">
                    <div class="left-model text-left">
                        <div class="flex-space-between card-num-info align-start">
                            <div class="card-num">NO.XXXXXXXXXXXX</div>
                            <div class="qrcode">
                                <!--<img src="@/assets/img/plug-test-qrcode.png" alt="">-->
                            </div>
                        </div>
                        <div class="deduction-name">{{activeInfo?activeInfo.gift_tag:'砍价项目名称'}}</div>
                        <div class="term text-left">{{activeInfo?activeInfo.bargain_gift.gift.valid_start_time.split(' ')[0]:'2019/01/11'}} —— {{activeInfo?activeInfo.bargain_gift.gift.valid_end_time.split(' ')[0]:'2019/01/11'}}</div>
                    </div>
                    <div class="right-model">
                        <div class="deduction-price row-1">{{activeInfo?activeInfo.bargain_gift.gift.type==1?'优惠券':'抵扣券':'抵扣券'}}</div>
                        <div><span class="deduction-price">￥</span><b class="deduction-price-num">{{activeInfo?activeInfo.bargain_gift.gift.price:'100'}}</b></div>
                    </div>
                </div>
            </div>
            <div class="invited-num">
                已有{{activeInfo?activeInfo.bargain_gift.total-activeInfo.bargain_gift.surplus:'1'}}人成功领券
            </div>
            <div class="project-name" :style="[step_4.name.style]">{{activeInfo?activeInfo.name:'活动名称活动名称'}}</div>
            <div class="count-num">
                <div class="time-name">{{isOver?isOver:'活动仅剩:'}}</div>
                <div class="count-time">
                    <div :class="step_4.countTime.sizeType" :style="[step_4.countTime.style]">
                        <b>{{timeObj.days || '00'}}</b><span>天</span><b>{{timeObj.hours || '00'}}</b><span>小时</span><b>{{timeObj.minutes || '00'}}</b><span>分</span>
                    </div>
                </div>
            </div>
            <div class="max-price" :style="[step_4.progress.textColor]">
                最高可砍{{activeInfo?activeInfo.bargain_rule.target_price:'1000'}}元，已砍0元
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar" :style="[step_4.progress.bar]"></div>
            </div>
            <div class="flex-star user-num">
                <div class="head-model flex-star">
                    <!--<div v-for="i in 5" class="user-head"></div>-->
                </div>
                <div>已有1个小伙伴帮砍价</div>
            </div>
            <button :style="[btnStyle]" class="start-invite-btn">帮好友砍一刀</button>
            <div class="close-btn"><img src="@/assets/img/icon-plug-close.png" alt=""></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formatType: 1,
                timeObj: '',
                isOver:'',
                timer:'',
            }
        },
        props: ['source', 'activeInfo'],
        computed: {
            bgImg() {
                return this.source.step_4.setBgImg;
            },
            cardBg() {
                return this.source.step_4.setCardBg;
            },
            btnStyle() {
                return this.step_4.setBtn.style;
            },
            step_4() {
                return this.source.step_4;
            },
            activePageData() {
                return this.$store.getters.activePageData;
            },
            getActiveTime(){
                return this.activeInfo|| '';
            }
        },
        created() {
            this.freshTime();
        },
        methods: {
            close(){
                Object.assign(this.activePageData.plug.step_1, {isShow: false});
                Object.assign(this.activePageData.plug.step_4, {isShow: false});
                Object.assign(this.activePageData.plug, {curStep: 2, isBargain: true,isShow: false});
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            },
            // 倒计时
            freshTime() {
                clearInterval(this.timer);
                let startTime = new Date();
                let endTime = new Date(this.activeInfo ? this.activeInfo.end_time.replace(/-/g,'/') : '2019-01-01 00:00:00');
                let leftTime = parseInt(endTime.getTime() - startTime.getTime()) / 1000;
                let timeObj = {};
                if (leftTime > 0) {
                    this.isOver = '';
                    this.timer = setInterval(() => {
                        leftTime--;
                        timeObj.days = parseInt(leftTime / 60 / 60 / 24, 10) >= 10 ? parseInt(leftTime / 60 / 60 / 24, 10) : `0${parseInt(leftTime / 60 / 60 / 24, 10)}`; //计算剩余的天数
                        timeObj.hours = parseInt(leftTime / 60 / 60 % 24, 10) >= 10 ? parseInt(leftTime / 60 / 60 % 24, 10) : `0${parseInt(leftTime / 60 / 60 % 24, 10)}`; //计算剩余的小时
                        timeObj.minutes = parseInt(leftTime / 60 % 60, 10) >= 10 ? parseInt(leftTime / 60 % 60, 10) : `0${parseInt(leftTime / 60 % 60, 10)}`;//计算剩余的分钟
                        timeObj.seconds = parseInt(leftTime % 60, 10) >= 10 ? parseInt(leftTime % 60, 10) : `0${parseInt(leftTime % 60, 10)}`;//计算剩余的秒数
                        this.timeObj = timeObj;
                    }, 1000)
                } else {
                    this.timeObj={};
                    this.isOver = '活动已结束';
                    clearInterval(this.timer);
                }

            }

        },
        watch: {
            getActiveTime(newVal, oldVal) {
                this.freshTime();
            }
        }

    }
</script>

<style scoped>
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

    .plugStep_4 {
        position: absolute;
        left: 0;
        height: 100%;
        width: 100%;
        bottom: 0;
        background: #fff;
    }

    .start-invite-wrap {
        box-sizing: border-box;
        padding: 15px;
        text-align: center;
        font-size: 14px;
        color: #333333;
    }

    .img-wrap {
        width: 345px;
        height: 150px;
        box-sizing: border-box;
        margin: 30px auto 8px;
    }

    .user-head {
        width: 30px;
        height: 30px;
        margin-left: -20px;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid #DDDDDD;
        background: #ffffff;
    }

    .invited-num {
        color: #333333;
        font-size: 12px;
        line-height: 17px;
    }

    .project-name {
        font-size: 24px;
        color: #333333;
        padding: 19px 0 39px;
    }

    .max-price {
        font-size: 14px;
        color: #333333;
        margin-bottom: 10px;
    }

    .user-num {
        padding-top: 50px;
        padding-bottom: 10px;
    }

    .progress-bar-wrap {
        height: 18px;
        width: 285px;
        margin: auto;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        background: #DDDDDD;
        border: 2px solid rgba(255, 255, 255, 0.8);
    }

    .progress-bar {
        position: absolute;
        width: 32%;
        left: 0;
        top: 0;
        height: 100%;
        border-radius: 10px;
        background: #FFCF34;

    }

    .head-model .user-head:nth-child(1) {
        margin-left: 0;
    }

    .head-model {
        min-width: 70px;
        margin-right: 10px;
    }

    .start-invite-btn {
        color: #FFFFFF;
        font-size: 15px;
        background: #8A7CCF;
        border-radius: 4px;
        height: 40px;
        width: 100%;
    }

    .time-name {
        color: #333333;
        font-size: 14px;
        line-height: 20px;
    }

    .count-time {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        color: #FF4C25;
    }

    .count-time .middle {
        font-size: 14px;
    }

    .count-time .middle b {
        font-size: 32px;
        margin: 0 9px;
    }

    .count-time .big {
        font-size: 16px;
    }

    .count-time .big b {
        font-size: 42px;
        margin: 0 4px;
    }

    .count-time .small {
        font-size: 12px;
    }

    .count-time .small b {
        font-size: 28px;
        margin: 0 4px;
    }

    .card-style-1 {
        color: #333333;
    }

    .offset-wrap {
        padding: 9px 10px 22px 20px;
    }

    .card-num {
        font-size: 12px;
        line-height: 17px;
    }

    .qrcode {
        width: 39px;
        height: 39px;
        /*background: #CCCCCC;*/
        overflow: hidden;
    }

    .qrcode img {
        width: 100%;
        height: 100%;
    }

    .term {
        line-height: 30px;
        height: 30px;
        font-size: 12px;
        color: #333333;
    }

    .deduction-price {
        font-size: 13px;
        line-height: 18px;
    }

    .deduction-price-num {
        font-size: 36px;
        line-height: 50px;
        margin: 0 5px 0 2px;
    }

    .deduction-name {
        font-size: 17px;
        line-height: 24px;
    }

    .left-model {
        width: 219px;
        height: 150px;
        box-sizing: border-box;
        padding: 10px;
    }

    .right-model {
        width: 126px;
        height: 150px;
        /*background: #F4F4F4;*/
    }

    .card-num-info {
        margin-bottom: 29px;
    }

    .card-style-2 .row-1 {
        padding: 30px 0 32px;
    }

    .align-start {
        align-items: flex-start !important;
    }

    .close-btn {
        cursor: pointer;
        position: absolute;
        width: 20px;
        right: 15px;
        top: 15px;
    }

    .close-btn img {
        width: 100%;
    }
</style>
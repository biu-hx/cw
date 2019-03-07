<template>
    <div class="plugStep_4" :style="[bgImg]">
        <div class="start-invite-wrap">
            <div class="img-wrap" :style="[cardBg]">
                <div v-if="activeInfo.bargain_gift.show_type==1" class="card-style-1">
                    <div class="offset-wrap">
                        <div class="card-num text-right">NO.{{activeInfo.bargain_gift.gift.id}}</div>
                        <div class="flex-space-between">
                            <div>
                                <div class="deduction-price"><span>￥<b class="deduction-price-num">{{activeInfo.bargain_gift.gift.price}}</b>元{{activeInfo.bargain_gift.gift?'优惠券':'优惠券'}}</span>
                                </div>
                                <div class="deduction-name">{{activeInfo.bargain_gift.gift.name}}</div>
                            </div>
                            <div class="qrcode"></div>

                        </div>
                    </div>
                    <div class="term text-center">{{activeInfo.bargain_gift.gift.valid_start_time.split(' ')[0]}} ——
                        {{activeInfo.bargain_gift.gift.valid_end_time.split(' ')[0]}}
                    </div>
                </div>
                <div v-if="activeInfo.bargain_gift.show_type==2" class="card-style-2 flex-space-between">
                    <div class="left-model text-left">
                        <div class="flex-space-between card-num-info align-start">
                            <div class="card-num">NO.{{activeInfo.bargain_gift.gift.id}}</div>
                            <div class="qrcode"></div>
                        </div>
                        <div class="deduction-name">{{activeInfo.bargain_gift.gift.name}}</div>
                        <div class="term text-left">{{activeInfo.bargain_gift.gift.valid_start_time.split(' ')[0]}} ——
                            {{activeInfo.bargain_gift.gift.valid_end_time.split(' ')[0]}}</div>
                    </div>
                    <div class="right-model">
                        <div class="deduction-price row-1">{{activeInfo.bargain_gift.gift?'优惠券':'优惠券'}}</div>
                        <div><span class="deduction-price">￥</span><b class="deduction-price-num">{{activeInfo.bargain_gift.gift.price}}</b></div>
                    </div>
                </div>
            </div>
            <div class="invited-num">已有{{activeInfo.bargain_gift.total-activeInfo.bargain_gift.surplus}}人成功领券</div>
            <div class="project-name" :style="[step_4.name.style]">{{activeInfo.gift_tag}}</div>
            <div class="count-num">
                <div class="time-name">{{isOver?isOver:'活动仅剩:'}}</div>
                <div class="count-time">
                    <div :class="step_4.countTime.sizeType" :style="[step_4.countTime.style]">
                        <b>{{timeObj.days || '00'}}</b><span>天</span><b>{{timeObj.hours || '00'}}</b><span>小时</span><b>{{timeObj.minutes || '00'}}</b><span>分</span>
                    </div>
                </div>
            </div>
            <div class="max-price" :style="[step_4.progress.textColor]">
                最高可砍{{activeInfo.bargain_rule.target_price}}元，已砍{{bargainInfo.total_price}}元
            </div>
            <div class="progress-bar-wrap">
                <div class="progress-bar" :style="[step_4.progress.bar,{width:toPercent()}]"></div>
            </div>
            <div class="flex-star user-num">
                <div class="head-model flex-star">
                    <!--<div v-for="i in 5" class="user-head"></div>-->
                </div>
                <div>已有{{bargainInfo.join_num}}个小伙伴帮砍价</div>
            </div>
            <button v-if="source_id && JSON.stringify(bargainInfo.help_info) === '{}' && !isMyself && bargainInfo.total_price<activeInfo.bargain_rule.target_price" :style="[btnStyle]"
                    @click="helpBargain"
                    class="start-invite-btn">帮好友砍一刀

            </button>
            <button v-if="source_id && JSON.stringify(bargainInfo.help_info) != '{}' && !isMyself" :style="[btnStyle]"
                    @click="close"
                    class="start-invite-btn">已帮砍价，我也要省钱
            </button>
            <button v-if="source_id && JSON.stringify(bargainInfo.help_info) === '{}' && !isMyself && bargainInfo.total_price>=activeInfo.bargain_rule.target_price" :style="[btnStyle]"
                    @click="close"
                    class="start-invite-btn">已完成砍价，我也要省钱
            </button>
            <div class="close-btn" @click="close"><img src="@/assets/icon-plug-close.png" alt=""></div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                browserId: this.$route.query.uid,
                source_id: this.$route.query.friendId,
                timeObj: '',
                isOver: '',
                timer: '',
            }
        },
        props: ['activeInfo', 'bargainInfo', 'source', 'editor_id', 'isMyself'],
        computed: {
            bgImg() {
                return this.source.plug.step_4.setBgImg;
            },
            cardBg() {
                return this.source.plug.step_4.setCardBg;
            },
            btnStyle() {
                return this.step_4.setBtn.style;
            },
            step_4() {
                return this.source.plug.step_4;
            },
            getActiveTime() {
                return this.activeInfo.end_time || '';
            }

        },
        methods: {
            close() {
                this.$emit('closeStep_4');
            },
            // 帮好友砍价
            helpBargain() {
                this.$http.post({
                    url: '/bargain/join',
                    data: {
                        myid: this.browserId,
                        source_id: this.source_id,//邀请人身份
                        template_id: this.editor_id //作品ID
                        // template_id: this.editor_id //作品ID
                    }
                }).then(() => {
                    this.$emit('helpBargain');

                }).catch(({next}) => next())
            },


            // 倒计时
            freshTime() {
                clearInterval(this.timer);
                let startTime = new Date();
                let endTime = new Date(this.activeInfo.end_time.replace(/-/g,'/'));
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
                    this.timeObj = {};
                    this.isOver = '活动已结束';
                    clearInterval(this.timer);
                }


            },
            // 百分比转换
            toPercent() {
                let num = this.bargainInfo.total_price;
                let total = this.activeInfo.bargain_rule.target_price;
                return (Math.round(num / total * 10000) / 100.00 + "%");// 小数点后两位百分比
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
        padding: 0.9375rem;
        text-align: center;
        font-size: 0.875rem;
        color: #333333;
    }

    .img-wrap {
        width: 21.5625rem;
        height: 9.375rem;
        box-sizing: border-box;
        margin: 1.875rem auto 0.5rem;
    }

    .user-head {
        width: 1.875rem;
        height: 1.875rem;
        margin-left: -1.25rem;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid #DDDDDD;
        background: #ffffff;
    }

    .invited-num {
        color: #333333;
        font-size: 0.75rem;
        line-height: 1.0625rem;
    }

    .project-name {
        font-size: 1.5rem;
        color: #333333;
        padding: 1.1875rem 0 2.4375rem;
    }

    .max-price {
        font-size: 0.875rem;
        color: #333333;
        margin-bottom: 0.625rem;
    }

    .user-num {
        padding-top: 3.125rem;
        padding-bottom: 0.625rem;
    }

    .progress-bar-wrap {
        height: 1.125rem;
        width: 17.8125rem;
        margin: auto;
        box-sizing: border-box;
        border-radius: 0.625rem;
        overflow: hidden;
        position: relative;
        background: #DDDDDD;
        border: 2px solid rgba(255, 255, 255, 0.8);
    }

    .progress-bar {
        position: absolute;
        width: 0;
        left: 0;
        top: 0;
        height: 100%;
        border-radius: 0.625rem;
        background: #FFCF34;
    }

    .head-model .user-head:nth-child(1) {
        margin-left: 0;
    }

    .head-model {
        min-width: 4.375rem;
        margin-right: 0.625rem;
    }

    .start-invite-btn {
        color: #FFFFFF;
        font-size: 0.9375rem;
        background: #8A7CCF;
        border-radius: 0.25rem;
        height: 2.5rem;
        width: 100%;
    }

    .time-name {
        color: #333333;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }

    .count-time {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5rem;
        color: #FF4C25;
    }

    .count-time .middle {
        font-size: 0.875rem;
    }

    .count-time .middle b {
        font-size: 2rem;
        margin: 0 0.5625rem;
    }

    .count-time .big {
        font-size: 1rem;
    }

    .count-time .big b {
        font-size: 2.625rem;
        margin: 0 0.25rem;
    }

    .count-time .small {
        font-size: 0.75rem;
    }

    .count-time .small b {
        font-size: 1.75rem;
        margin: 0 0.25rem;
    }

    .card-style-1 {
        color: #333333;
    }

    .offset-wrap {
        padding: 0.5625rem 0.625rem 1.375rem 1.25rem;
    }

    .card-num {
        font-size: 0.75rem;
        line-height: 1.0625rem;
    }

    .qrcode {
        width: 2.4375rem;
        height: 2.4375rem;
        /*background: #CCCCCC;*/
    }

    .term {
        line-height: 1.875rem;
        height: 1.875rem;
        font-size: 0.75rem;
        color: #333333;
    }

    .deduction-price {
        font-size: 0.8125rem;
        line-height: 1.125rem;
    }

    .deduction-price-num {
        font-size: 2.25rem;
        line-height: 3.125rem;
        margin: 0 0.3125rem 0 0.125rem;
    }

    .deduction-name {
        font-size: 1.0625rem;
        line-height: 1.5rem;
    }

    .left-model {
        width: 13.6875rem;
        height: 9.375rem;
        box-sizing: border-box;
        padding: 0.625rem;
    }

    .right-model {
        width: 7.875rem;
        height: 9.375rem;
        /*background: #F4F4F4;
         */
    }

    .card-num-info {
        margin-bottom: 1.8125rem;
    }

    .card-style-2 .row-1 {
        padding: 1.875rem 0 2rem;
    }

    .align-start {
        align-items: flex-start !important;
    }

    .close-btn {
        cursor: pointer;
        position: absolute;
        width: 1.25rem;
        right: 0.9375rem;
        top: 0.9375rem;
    }

    .close-btn img {
        width: 100%;
    }
</style>
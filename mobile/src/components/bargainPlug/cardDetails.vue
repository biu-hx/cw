<template>
    <div class="plugStep_1_wrap">
        <div class="flex-wrap-center">
            <div class="img-wrap" :style="[cardBg]">
                <div v-if="activeInfo.bargain_gift.show_type==1" class="card-style-1">
                    <div class="offset-wrap">
                        <div class="card-num text-right">NO.{{cardInfo.bargain_result.redeem_code}}</div>
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
                            <div class="card-num">NO.{{cardInfo.bargain_result.redeem_code}}</div>
                            <div class="qrcode"></div>
                        </div>
                        <div class="deduction-name">{{activeInfo.bargain_gift.gift.name}}</div>
                        <div class="term text-left">{{activeInfo.bargain_gift.gift.valid_start_time.split(' ')[0]}} ——
                            {{activeInfo.bargain_gift.gift.valid_end_time.split(' ')[0]}}
                        </div>
                    </div>
                    <div class="right-model">
                        <div class="deduction-price row-1">{{activeInfo.bargain_gift.gift?'优惠券':'优惠券'}}</div>
                        <div><span class="deduction-price">￥</span><b class="deduction-price-num">{{activeInfo.bargain_gift.gift.price}}</b>
                        </div>
                    </div>
                </div>
                <div class="close-card" @click="closeToast"><img src="@/assets/plug-close-card.png" alt=""></div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        data() {
            return {}
        },
        props: ['activeInfo', 'source', 'joinInfo', 'cardInfo'],
        computed: {
            cardBg() {
                return this.source.plug.step_4.setCardBg;
            },
        },
        methods: {
            // 确定关闭弹窗&砍价详情
            closeToast() {
                this.$emit('closeCard');

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
        background: rgba(0, 0, 0, 0.5);
    }

    .close-card {
        left: 50%;
        transform: translate(-50%);
        bottom: -5.125rem;
        position: absolute;
    }

    .close-card img {
        width: 100%;
    }

    .flex-wrap-center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
        height: 100%;
    }

    .flex-space-between {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .img-wrap {
        margin-top: -6.875rem;
        width: 21.5625rem;
        height: 9.375rem;
        position: relative;
        box-sizing: border-box;
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
        background: #CCCCCC;
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

    .card-style-1 .deduction-name {
        text-align: center;
    }

    .card-style-2 .row-1 {
        padding: 1.875rem 0 2rem;
    }

    .card-style-2 .right-model {
        text-align: center;
    }
</style>
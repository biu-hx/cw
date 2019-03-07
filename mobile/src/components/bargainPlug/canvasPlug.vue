<template>
    <div class="canvas-plug">
        <div class="plugStep_menu">
            <div class="menu-btn-wrap">
                <!--是否已参与砍价-->
                <div class="invite-wrap" v-if="joinInfo.join_list.length>0">
                    <div v-if="source.plug.step_2.formatType==1" class="flex-center">
                        <div class="invite-style-1">
                            <div class="invite-title">已有{{joinInfo.join_num}}个小伙伴帮砍价</div>
                            <div class="flex-star invite-desc">
                                <div class="overed-money">已砍价{{joinInfo.total_price}}元，加油</div>
                                <div class="show-dsc-link" @click="showBargainDesc">查看详情>></div>
                            </div>
                        </div>
                        <div class="head-model flex-star">
                            <!--<div v-for="i in 5" class="user-head"></div>-->
                        </div>
                    </div>
                    <div v-if="source.plug.step_2.formatType==2" class="flex-center invite-style-2-wrap">
                        <div class="head-model flex-star">
                            <!--<div v-for="i in 5" class="user-head"></div>-->
                        </div>
                        <div class="invite-style-2">
                            <div class="invite-title">已有{{joinInfo.join_num}}个小伙伴帮砍价</div>
                            <div class="flex-star invite-desc">
                                <div class="overed-money">已砍价{{joinInfo.total_price}}元，加油</div>
                            </div>
                        </div>
                        <div class="show-dsc-link" @click="showBargainDesc">查看详情</div>
                    </div>
                </div>
                <!--底部按钮-->
                <div class="flex-star"
                     v-if="activity.bargain_rule && joinInfo.is_receive==0 && joinInfo.total_price<activity.bargain_rule.target_price">
                    <div class="show-desc-btn menu-btn" @click="linkDetail(source.plug.linkUrl)"
                         v-if="source.plug.isShowBtn" :style="[leftStyle]">{{source.plug.leftText}}
                    </div>
                    <div class="start-bargain-btn menu-btn" @click="startBargain" :style="[rightStyle]">
                        <!--{{joinInfo.join_list.length>0?'召唤好友帮我砍价':source.plug.rightText}}-->
                        {{joinInfo.join_list.length>0?source.plug.inviteText:source.plug.rightText}}
                    </div>
                </div>
                <!--是否是正式环境-->
                <div class="flex-star" v-if="curType!='worker'">
                    <div class="show-desc-btn menu-btn" @click="linkDetail(source.plug.linkUrl)"
                         v-if="source.plug.isShowBtn" :style="[leftStyle]">{{source.plug.leftText}}
                    </div>
                    <div class="start-bargain-btn menu-btn" :style="[rightStyle]"
                         @click="startBargain">{{source.plug.rightText}}
                    </div>
                </div>
                <!--是否已砍价-->
                <div class="flex-star"
                     v-if="activity.bargain_rule && joinInfo.total_price>=activity.bargain_rule.target_price">
                    <div class="show-desc-btn menu-btn" @click="linkDetail(source.plug.linkUrl)"
                         v-if="source.plug.isShowBtn" :style="[leftStyle]">{{source.plug.leftText}}
                    </div>
                    <div class="start-bargain-btn menu-btn" @click="isReceive" :style="[rightStyle]">
                        {{joinInfo.is_receive==0?'领取卡券':'查看卡券'}}
                    </div>
                </div>
            </div>
        </div>
        <!--用户留电-->
        <plug-step_5 v-if="isStep_5" :activeInfo="activity" @addUserInfo="addUserInfo" @closeStep_5="closeStep_5"
                     :source="source"></plug-step_5>
        <!--关闭砍价成功-->
        <plug-step_1 v-if="isStep_1" :activeInfo="activity" :isHelped="isHelped" :source="source" @bargainInfo="getBargainInfo"
                     :joinInfo="joinInfo"></plug-step_1>
        <!--召唤砍价-->
        <!--<plug-step_3 v-show="isStep_3" :activeInfo="activity" :editor_id="editor_id||''" @closeStep_3="closeStep_3"-->
                     <!--:source="source"-->
                     <!--:isQrcode="isQrcode"></plug-step_3>-->
        <!--砍价详情  -->
        <plug-step_4 v-show="isStep_4 && Object.keys(activity).length > 0" :activeInfo="activity" :isMyself="isMyself" :source="source"
                     :bargainInfo="joinInfo" :editor_id="editor_id" @closeStep_4="closeStep_4"
                     @helpBargain="helpBargain"></plug-step_4>
        <!--卡券详情-->
        <card-details v-if="isCardDetail" :source="source" :cardInfo="cardInfo" :activeInfo="activity"
                      @closeCard="closeCard"
                      :joinInfo="joinInfo"></card-details>
    </div>

</template>

<script>
    import plugStep_1 from './plugStep_1'
    // import plugStep_3 from './plugStep_3'
    import plugStep_4 from './plugStep_4'
    import plugStep_5 from './plugStep_5'
    import cardDetails from './cardDetails'

    export default {
        data() {
            return {
                curType: this.$route.params.type,//当前是否是正式环境
                source_id: this.$route.query.friendId || '',//邀请人唯一身份标识
                browserId: this.$route.query.uid || '',
                activity: {},//活动详情 数据
                joinInfo: {
                    join_list: []
                },//砍价详情 数据
                cardInfo: '',
                isQrcode: false,
                isStep_1: false,
                isStep_3: false,
                isStep_4: false,
                isStep_5: false,
                isCardDetail: false,
                isMyself: true,
                userName: '',//
                userTel: '',
                isHelped:false,//是否第一次已帮看
            }
        },
        props: ['source'],
        components: {
            plugStep_1,
            plugStep_4,
            plugStep_5,
            cardDetails
        },
        computed: {
            bgImg() {
                return this.source.plug.setBgImg;
            },
            leftStyle() {
                return this.source.plug.leftBtnColor;
            },
            rightStyle() {
                return this.source.plug.rightBtnColor;
            },
            templateSource() {
                return this.$store.state.source || {}
            },
            editor_id() {
                return this.templateSource.id
            },
            activity_id() {
                return this.templateSource.activity_id
            }
        },
        created() {
            if (this.curType == 'worker') {
                this.getActiveDetails();
            }

            if (this.source_id) {
                this.isStep_4 = true;
            }
        },
        methods: {
            // 查看楼盘详情
            linkDetail(url) {
                if (this.source.plug.runJra == 'wechatApplet') {
                    this.triggerEvent(1001, {})
                } else {
                    if (url) {
                        window.location.href = url;
                    }
                }


            },

            // 发起砍价
            startBargain() {
                // 已参与&召唤好友
                if (this.joinInfo.join_list.length > 0) {
                    if (this.source.plug.runJra == 'wechatApplet') {
                        this.triggerEvent(1002, {})
                    } else {
                        this.isStep_3 = true;
                        this.isQrcode = true;
                    }

                } else {
                    if (this.curType == 'worker') {
                        this.isStep_5 = true;
                        // this.joinAct();
                    }

                }
            },
            //获取留电
            addUserInfo(data) {
                this.userName = data.userName;
                this.userTel = data.userTel;
                this.isHelped=false;
                this.joinAct();
            },
            // 获取子组件传值&砍价详情
            async getBargainInfo() {
                if(this.isHelped){
                    await this.getBargaindetail_my();
                    this.isStep_1 = false;
                }else {
                    this.isStep_1 = false;
                }

            },
            // 获取作品详情
            getEditorDetails() {
                this.$http.post({
                    url: '/editor/detail',
                    data: {
                        id: this.editor_id,//作品ID
                    }
                }).then(res => {
                    this.editor_id = res.editor.id;
                    this.activity_id = res.editor.activity_id;
                    // 活动详情
                    this.getActiveDetails();
                })
            },
            // 获取活动详情
            getActiveDetails() {
                this.$http.post({
                    url: '/bargain/actdetail',
                    data: {
                        id: this.templateSource.activity_id, //活动ID
                    }
                }).then(res => {
                    this.activity = res.activity;
                    if (this.source_id) {
                        this.getBargaindetail_other();
                    } else {
                        this.getBargaindetail_my();
                    }
                })
            },
            // 自己&邀请人砍价详情
            async getBargaindetail_my() {
                let obj = {
                    id: this.activity_id,
                    source_id: this.browserId,//url的用户标识
                };
               await this.$http.post({
                    url: '/bargain/detail',
                    data: obj
                }).then(res => {
                    this.joinInfo = res;
                }).catch(({next}) => next())
            },
            async getBargaindetail_other() {
                let obj = {
                    id: this.activity_id,
                    taregt_id: this.browserId,
                    source_id: this.source_id,//url的用户标识
                };
                await this.$http.post({
                    url: '/bargain/detail',
                    data: obj
                }).then(res => {
                    this.joinInfo = res;
                    this.isMyself = false;
                }).catch(({next}) => next())
            },
            // 活动报名
            async joinAct() {
              await this.$http.post({
                    url: '/bargain/joinact',
                    data: {
                        myid: this.browserId,
                        template_id: this.editor_id, //作品ID
                        name: this.userName,
                        mobile: this.userTel
                    }
                }).then(() => {
                }).catch(({next}) => next())
                await this.getBargaindetail_my();
                this.isStep_5 = false;
                this.isStep_1 = true;
            },
            // 查看详情
            showBargainDesc() {
                this.isMyself = true;
                this.isStep_4 = true;
            },
            // 是否领券
            isReceive() {
                if (this.joinInfo.is_receive == 0) {
                    this.getCard();
                } else {
                    this.redetail();
                }
            },
            // 领取卡券
            getCard() {
                this.$http.post({
                    url: '/bargain/receive',
                    data: {
                        source_id: this.browserId,
                        template_id: this.editor_id,
                    }
                }).then(() => {
                    this.joinInfo.is_receive = 1;
                }).catch(({next}) => next())
            },
            // 卡券领取详情
            redetail() {
                this.$http.post({
                    url: '/bargain/redetail',
                    data: {
                        id: this.activity_id,//活动ID
                        source_id: this.browserId,
                    }
                }).then(res => {
                    this.cardInfo = res;
                    this.isCardDetail = true;
                }).catch(({next}) => next())
            },
            // 关闭卡券详情弹窗
            closeCard() {
                this.isCardDetail = false
            },
            // 关闭逻辑
            closeStep_3() {
                this.isStep_3 = false;
            },
            async closeStep_4() {
                if(this.isMyself){
                    this.isStep_4 = false;
                }else {
                    await this.getBargaindetail_my();
                    this.isStep_4 = false;
                }

            },
            closeStep_5() {
                this.isStep_5 = false;
            },
            // 点击帮砍成功后
            async helpBargain() {
                await this.getBargaindetail_other();
                this.joinInfo.join_list=[];
                this.isHelped=true;
                this.isStep_4 = false;
                this.isStep_1=true;

            },
        },
        watch: {
            "templateSource"(newValue) {
                if (this.$route.params.type === "worker" && newValue && newValue.id) {
                    this.getActiveDetails()
                }
            }
        }
    }
</script>

<style scoped>
    .canvas-plug {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        bottom: 0;
    }

    .plugStep_menu {
        height: 100%;
    }

    .menu-btn-wrap {
        display: flex;
        box-sizing: border-box;
        padding: 0.75rem 0.9375rem;
        position: absolute;
        width: 100%;
        bottom: 0;
        /*height: 100%;*/
        justify-content: center;
        /*background: rgba(255, 255, 255, 0.8);*/
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

    .invite-wrap {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 21.5625rem;
        height: 3.75rem;
        top: -4.4375rem;
        left: 50%;
        transform: translate(-50%);
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

    .head-model{
        min-width: 4.375rem;
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

    .invite-desc {
        line-height: 1.0625rem;
    }

    .show-dsc-link {
        cursor: pointer;
        color: rgb(240, 109, 57);
        text-decoration: none;
        font-size: 0.75rem;
    }

    .flex-star {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
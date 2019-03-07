<template>
    <div class="canvas-plug">
        <div class="plugStep_menu" :data-id="activityId">
            <div class="menu-btn-wrap">
                <div v-if="source.isBargain" class="invite-wrap">
                    <div v-if="source.step_2.formatType==1" class="flex-center">
                        <div class="invite-style-1">
                            <div class="invite-title">已有1个小伙伴帮砍价</div>
                            <div class="flex-star invite-desc">
                                <div class="overed-money">已砍价20元，加油</div>
                                <div class="show-dsc-link" >查看详情>></div>
                            </div>
                        </div>
                        <div class="head-model flex-star">
                            <!--<div v-for="i in 5" class="user-head"></div>-->
                        </div>
                    </div>
                    <div v-if="source.step_2.formatType==2" class="flex-center invite-style-2-wrap">
                        <div class="head-model flex-star">
                            <!--<div v-for="i in 5" class="user-head"></div>-->
                        </div>
                        <div class="invite-style-2">
                            <div class="invite-title">已有1个小伙伴帮砍价</div>
                            <div class="flex-star invite-desc">
                                <div class="overed-money">已砍价20元，加油</div>
                            </div>
                        </div>
                        <div class="show-dsc-link">查看详情</div>
                    </div>


                </div>
                <div class="show-desc-btn menu-btn" v-if="source.isShowBtn" :style="[leftStyle]">
                    <span v-if="source.isBargain">{{leftText}}</span>
                    <input v-else type="text" maxlength="6" v-model="leftText" class="editor-left-text editor-text"
                           @change="editorText(1)"
                           :style="{color:source.leftBtnColor.color}">
                </div>
                <div class="start-bargain-btn menu-btn" :style="[rightStyle]">
                    <input v-if="source.isBargain" type="text" maxlength="8" class="editor-right-text editor-text" v-model="inviteText"
                           @change="editorText(3)" :style="{color:source.rightBtnColor.color}">
                    <!--<span @click="start" class="shareBtn" v-if="source.isBargain">{{source.isBargain?'召唤好友帮我砍价':rightText}}</span>-->
                    <input v-else type="text" maxlength="8" class="editor-right-text editor-text" v-model="rightText"
                           @change="editorText(2)" :style="{color:source.rightBtnColor.color}">
                    <div class="step-editor-btn">
                        <div class="start-editor" @click="start"><span>编辑后一步弹窗</span><img
                                src="@/assets/img/plug-crow-r.png"
                                alt=""></div>
                    </div>
                </div>
            </div>
        </div>
        <plug-step_1 v-show="source.step_1.isShow" :activeInfo="activeInfo" :source="source"></plug-step_1>
        <!--<plug-step_3 v-show="source.step_3.isShow" :activeInfo="activeInfo" :source="source"></plug-step_3>-->
        <plug-step_4 v-show="source.step_4.isShow" :activeInfo="activeInfo" :source="source"></plug-step_4>
        <plug-step_5 v-show="source.step_5.isShow" :activeInfo="activeInfo" :source="source"></plug-step_5>
    </div>

</template>

<script>
    import plugStep_1 from './plugStep_1'
    import plugStep_3 from './plugStep_3'
    import plugStep_4 from './plugStep_4'
    import plugStep_5 from './plugStep_5'

    export default {
        data() {
            return {
                activeInfo: '',
                curActiveId: '',
                leftText: this.source.leftText,
                rightText: this.source.rightText,
                inviteText: this.source.inviteText,
            }
        },
        props: ['source'],
        components: {
            plugStep_1,
            plugStep_3,
            plugStep_4,
            plugStep_5,
        },
        computed: {
            activityId() {
                this.curActiveId = this.activitySource.activeId || '';
                return this.activitySource.activeId || '';
            },
            activitySource() {
                return this.$store.state.activitySource
            },
            activePageData() {
                return this.$store.getters.activePageData
            },
            bgImg() {
                return this.source.setBgImg;
            },
            leftStyle() {
                return this.source.leftBtnColor;
            },
            rightStyle() {
                return this.source.rightBtnColor;
            },
        },
        methods: {
            // 修改按钮文案
            editorText(type) {
                if (type == 1) {
                    if (this.leftText.length > 6) {
                        this.$toast('当前字数限制为6位');
                        this.leftText = this.leftText.substr(0, 6);
                    } else {
                        Object.assign(this.activePageData.plug, {leftText: this.leftText});
                    }
                }
                if (type == 2) {
                    if (this.rightText.length > 8) {
                        this.$toast('当前字数限制为8位');
                        this.rightText = this.rightText.substr(0, 8);
                    } else {
                        Object.assign(this.activePageData.plug, {rightText: this.rightText});
                    }
                }
                if (type == 3) {
                    if (this.inviteText.length > 8) {
                        this.$toast('当前字数限制为8位');
                        this.inviteText = this.inviteText.substr(0, 8);
                    } else {
                        Object.assign(this.activePageData.plug, {inviteText: this.inviteText});
                    }
                }
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            },
            // 发起砍价
            start() {
                if (this.activePageData.plug.isBargain) {
                    Object.assign(this.activePageData.plug.step_4, {isShow: true});
                    Object.assign(this.activePageData.plug, {curStep: 4});
                    this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
                } else {
                    if (this.source.runJra == 'wechatApplet') {
                        Object.assign(this.activePageData.plug.step_5, {isShow: true});
                        Object.assign(this.activePageData.plug, {curStep: 1});
                        this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData))
                    } else {
                        if (this.source.linkUrl && this.source.isShowBtn || !this.source.isShowBtn) {
                            Object.assign(this.activePageData.plug.step_5, {isShow: true});
                            Object.assign(this.activePageData.plug, {curStep: 1});
                            this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData))
                        } else {
                            this.$toast('请输入详情URL');
                            return false;
                        }
                    }

                }
            },
            // 查看详情
            showBargainDesc() {
                Object.assign(this.activePageData.plug.step_4, {isShow: true});
                Object.assign(this.activePageData.plug, {curStep: 4});
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            },
            // 活动详情
            getActiveDesc() {
                this.$http.post({
                    url: '/bargain/actdetail',
                    data: {
                        id: this.activityId,//作品ID
                    }
                }).then(res => {
                    this.activeInfo = res.activity;
                }).catch(({next}) => next())

            },
        },
        watch: {
            curActiveId(newVal, oldVal) {
                if (newVal != oldVal && newVal) {
                    this.getActiveDesc()
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

    .editor-text {
        width: 100%;
        height: 100%;
        border: none;
        text-align: center;
        caret-color: #000;
        background: transparent;
        /*display: none;*/
    }

    .editor-left-text {
        color: rgb(51, 51, 51);
    }

    .editor-right-text {
        color: rgb(255, 255, 255);
    }

    .shareBtn {
        width: 100%;
        text-align: center;
        height: 100%;
        line-height: 38px;
    }

    .plugStep_menu {
        height: 100%;
    }

    .menu-btn-wrap {
        display: flex;
        box-sizing: border-box;
        padding: 12px 15px;
        position: absolute;
        width: 100%;
        bottom: 0;
        /*height: 100%;*/
        justify-content: center;
        /*background: rgba(255, 255, 255, 0.8);*/
    }

    .step-editor-btn {
        display: none;
        align-items: center;
        justify-content: flex-end;
        position: absolute;
        right: 34px;
        top: -34px;
        padding-bottom: 12px;
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

    .start-bargain-btn:hover .step-editor-btn {
        display: flex;
    }

    .invite-wrap {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 345px;
        height: 60px;
        top: -71px;
        left: 50%;
        transform: translate(-50%);
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
    .head-model{
        min-width: 70px;
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

    .invite-desc {
        line-height: 17px;
    }

    .show-dsc-link {
        cursor: pointer;
        color: rgb(240, 109, 57);
        text-decoration: none;
        font-size: 12px;
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
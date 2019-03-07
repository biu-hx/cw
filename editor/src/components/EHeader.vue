<template>
    <header class="e-header">
        <div class="e-header-logo">
            <a :href="webUrl">
                <img src="@/assets/img/logo.png" width="120px">
            </a>
        </div>

        <div class="e-header-nav">
            <nav class="nav-menu">
                <a class="nav-menu-item"
                   :class="{'nav-menu-item--active': settingCompBlockType === 1,'nav-menu-item--disabled': activePageData.plugType > 0}"
                   @click="navTabChange(1,activePageData.plugType > 0)">
                    <img src="@/assets/img/nav-bg.png" class="nav-icon">
                    <img src="@/assets/img/nav-bg.active.png" class="nav-icon nav-icon-active">
                    <span class="nav-label">背景</span>
                </a>

                <a class="nav-menu-item"
                   :class="{'nav-menu-item--active': settingCompBlockType === 2,'nav-menu-item--disabled': activePageData.plugType > 0}"
                   @click="navTabChange(2,activePageData.plugType > 0)">
                    <img src="@/assets/img/nav-img.png" class="nav-icon">
                    <img src="@/assets/img/nav-img.active.png" class="nav-icon nav-icon-active">
                    <span class="nav-label">图片</span>
                </a>

                <a class="nav-menu-item"
                   :class="{'nav-menu-item--active': settingCompBlockType === 3,'nav-menu-item--disabled': activePageData.plugType > 0}"
                   @click="navTabChange(3, activePageData.plugType > 0)">
                    <img src="@/assets/img/nav-interact.png" class="nav-icon">
                    <img src="@/assets/img/nav-interact.active.png" class="nav-icon nav-icon-active">
                    <span class="nav-label">互动</span>
                </a>

                <a class="nav-menu-item"
                   :class="{'nav-menu-item--active': settingCompBlockType === 4,'nav-menu-item--disabled': isHavePlug || publishStatus === 3} "
                   @click="navTabChange(4, isHavePlug || publishStatus === 3)">
                    <img src="@/assets/img/nav-plug_in.png" class="nav-icon">
                    <img src="@/assets/img/nav-plug_in.active.png" class="nav-icon nav-icon-active">
                    <span class="nav-label">小插件</span>
                </a>
            </nav>
            <div class="e-header-handle">
                <button class="e-btn e-btn-primary is-round" @click="toPreview">
                    <img src="@/assets/img/icon-preview.png" style="width: 22px;vertical-align: -6px;">
                    预览
                </button>

                <button class="e-btn e-btn-primary is-round" @click="toSave">
                    <img src="@/assets/img/icon-save.png" style="width: 22px;vertical-align: -6px;">
                    保存
                </button>

                <button class="e-btn e-btn-warning is-round" @click="toPublish">
                    <img src="@/assets/img/icon-publish.png" style="width: 22px;vertical-align: -6px;">
                    发布
                </button>
            </div>
        </div>

        <div class="e-header-footer">
            <div class="e-header-profile" v-if="userInfo">
                <div class="header-profile-content">
                    <template>
                        <span>{{mobile}}</span>
                        <img src="@/assets/img/icon-bottom.png" class="icon-bottom">
                    </template>
                </div>

                <ol class="header-profile-menu">
                    <li class="menu-triangle"></li>
                    <li class="menu-li" @click="menuCammand('activity')"><span>活动管理</span></li>
                    <li class="menu-li" @click="menuCammand('gift')"><span>奖品管理</span></li>
                    <li class="menu-li" @click="menuCammand('layout')"><span>退出</span></li>
                </ol>
            </div>
            <a v-else :href="webUrl">
                <div class="e-header-profile">
                    <div class="header-profile-content"><span>请登录</span></div>
                </div>
            </a>
        </div>
        <e-dialog @close="dialogClose" v-if="!closeDialog">
            <div class="login-out-wrap text-center" slot="body">
                <p>确认是否退出登录</p>
                <div class="login-out-handle">
                    <span @click="loginOut">确定</span>
                    <span @click="closeDialog=true">取消</span>
                </div>
            </div>
        </e-dialog>
    </header>
</template>

<script>
    let webUrl = process.env.VUE_APP_WEB
    export default {
        data () {
            return {
                webUrl: webUrl,
                closeDialog: true
            }
        },
        methods: {
            loginOut () {
                this.closeDialog = true;
                this.$store.dispatch("layout");
                window.location.href = process.env.VUE_APP_WEB + '/#/';
                // window.open(process.env.VUE_APP_WEB + '/#/')
            },
            dialogClose () {
                this.closeDialog = true;
            },
            navTabChange (type, disabled) {
                if (disabled) return

                this.$store.commit("settingCompBlockType", type)
                if (type == 2) {
                    this.$store.commit("createdImg")
                } else if (type == 3) {
                    this.$store.commit("createdHotspot")
                } else if (type == 4) {
                    // if (!this.isHavePlug) {
                    this.$store.dispatch("createdPage", {plugType: 1, from: 'PLUGIN'})
                        .then(({page, pageActiveIndex, settingCompBlockType, activeCompData}) => {
                            this.activitySource.pages.push(page)
                            this.$store.commit("activitySource", {
                                activitySource: this.activitySource,
                                pageActiveIndex,
                                settingCompBlockType,
                                activeCompData
                            })

                            this.$store.commit("createdPlug", {plugType: 1});
                            Object.assign(this.activePageData.bg.img, {url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/pic_1.jpg'});
                            Object.assign(this.activePageData.bg, {type: 1});
                            this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
                            // this.$store.state.isHavePlug = !this.isHavePlug;
                        })
                    // }
                }
            },
            toPreview () {
                if (!this.activitySource.plugType || this.activitySource.plugType > 0 && this.activitySource.activeId) {
                    this.$store.commit("updateStoreState", {previewActive: 1})
                } else {
                    this.$toast("请选择活动类型！")
                }
            },

            toSave () {
                if (!this.activitySource.plugType || this.activitySource.plugType > 0 && this.activitySource.activeId) {
                    this.$store.dispatch("publishTemplate", {is_temp: 0, is_draft: 1})
                        .then(() => {
                            this.$toast("已保存")
                        })
                } else {
                    this.$toast("请选择活动类型！")
                }
            },

            toPublish () {
                if (!this.activitySource.plugType || this.activitySource.plugType > 0 && this.activitySource.activeId) {
                    this.$store.commit("updateStoreState", {publishActive: 1})
                } else {
                    this.$toast("请选择活动类型！")
                }
            },

            menuCammand (type) {
                if (type == "layout") {
                    this.closeDialog = false;
                } else {
                    window.location.href = process.env.VUE_APP_WEB + '/#/' + type;
                    // window.open(process.env.VUE_APP_WEB + '/#/' + type)
                }
            }
        },
        computed: {
            userInfo () {
                return this.$store.state.userInfo
            },
            activitySource () {
                return this.$store.state.activitySource
            },
            activePageData () {
                return this.$store.getters.activePageData
            },

            publishStatus () {
                return this.$store.state.publishStatus
            },

            isHavePlug () {
                return this.activitySource.plugType
            },

            settingCompBlockType () {
                return this.$store.state.settingCompBlockType
            },

            mobile () {
                let m = this.userInfo.mobile
                return m ? `${m.substring(0, 3)}*****${m.substring(m.length - 3)}` : ''
            }
        }
    }
</script>

<style type="text/less" lang="less">
    .e-header {
        display: flex;
        align-items: flex-start;
        flex: 0 0 auto;
        height: 70px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 4px 0px rgba(189, 189, 189, 0.5);
        z-index: 99;

        & > .e-header-logo {
            position: relative;
            flex: 0 0 auto;
            padding: 7px 0 7px 30px;
            width: 260px;
            img {
                width: 162px;
            }
        }

        & > .e-header-nav {
            position: relative;
            flex: 1 1 auto;
            display: flex;
            align-items: center;

            & > .nav-menu {
                flex: 1 1 auto;
            }

            & > .e-header-handle {
                flex: 0 0 auto;
                padding-right: 50px;
            }
        }

        & > .e-header-footer {
            flex: 1 1 auto;
            padding: 0 50px;
            max-width: 320px;
            height: 100%;
        }

        & > .e-header-logo,
        & > .e-header-nav {
            &::after {
                content: "";
                position: absolute;
                top: 15px;
                right: 0;
                width: 1px;
                height: 40px;
                background: #ddd;
            }
        }
    }

    .nav-menu {
        display: flex;
        align-items: center;
        padding: 9px 0;

        & > .nav-menu-item {
            display: flex;
            flex-direction: column;
            margin-left: 50px;
            line-height: 1;
            align-items: center;
            white-space: nowrap;

            &.nav-menu-item--disabled {
                cursor: not-allowed;
            }

            &:hover:not(.nav-menu-item--disabled),
            &.nav-menu-item--active {
                cursor: pointer;

                .nav-icon {
                    display: none;
                }

                .nav-icon-active {
                    display: block;
                }

                .nav-label {
                    color: #9380F2;
                }
            }

            .nav-icon {
                width: 30px;
                height: 30px;
            }

            .nav-icon-active {
                display: none;
            }

            .nav-label {
                margin-top: 4px;
                color: #999;
                font-size: 14px;
                line-height: 20px;
            }
        }
    }

    .e-header-profile {
        display: inline-block;
        position: relative;

        &:hover {
            .header-profile-menu {
                display: block;
            }
        }

        & > .header-profile-content {
            padding: 24px 0;
            cursor: pointer;

            span {
                color: #9380F2;
                font-size: 16px;
                text-decoration: underline;
            }

            .icon-bottom {
                margin-left: 2px;
                width: 20px;
                height: 20px;
                vertical-align: -4px;
            }
        }

        & > .header-profile-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -70px;
            padding: 5px 0;
            width: 140px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 0 2px 1px rgba(221, 221, 221, 1);

            & > .menu-triangle {
                position: absolute;
                top: -6px;
                left: 50%;
                margin-left: -6px;

                &::before,
                &::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    border-left: 6px solid rgba(0, 0, 0, 0);
                    border-right: 6px solid rgba(0, 0, 0, 0);
                }

                &::before {
                    top: 0;
                    border-bottom: 6px solid #fff;
                    z-index: 2;
                }

                &::after {
                    top: -1px;
                    border-bottom: 6px solid rgba(221, 221, 221, 1);
                    filter: blur(1px);
                    z-index: 1;
                }
            }

            & > .menu-li {
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                color: #9380F2;
                background: #fff;

                &.menu-li-active,
                &:hover {
                    cursor: pointer;
                    background: rgba(244, 244, 244, 1);
                }
            }
        }

    }

    .login-out-wrap {
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        & > p {
            font-size: 16px;
            margin-bottom: 15px;
        }
    }

    .login-out-handle {
        display: flex;
        align-items: center;
        justify-content: center;

        & > span {
            cursor: pointer;
            margin: 0 10px;
            font-size: 12px;
            padding: 4px 15px;
            border-radius: 4px;
            background: #9582F2;
            color: #ffffff;
        }
    }

</style>
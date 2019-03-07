<template>
    <aside class="e-aside">
        <div class="aside-title">{{activitySource.name || '页面制作 '}}</div>

        <div class="aside-content" ref="asideContent">
            <ol class="aside-tabs-ol" ref="asideTabsOl">
                <li v-for="(page,index) in pages" :key="index" :class="{'tab-active': pageActiveIndex === index}">
                    <div class="page-content" :class="{'page-content-plug': page.type  === 2}">
                        <StagePage :source="page" @click.native="switchPage(index)"/>
                    </div>
                    <div class="tabs-page-menu-num">{{index + 1}}</div>
                    <div class="tabs-page-menu">
                        <button :class="['icon-page', index == 0 && pages.length === 1 || page.plugType > 0 && publishStatus === 3 ? 'icon-page-disabled':'']"
                                :disabled="index == 0 && pages.length === 1 || page.plugType > 0 && publishStatus === 3"
                                @click="deletePage(page,index, index == 0 && pages.length === 1 || page.plugType > 0 && publishStatus === 3)">
                            <img src="@/assets/img/icon-page-delete.png" class="icon-page-delete">
                            {{page}}
                        </button>
                        <button :class="['icon-page', index == 0 ? 'icon-page-disabled':'']" :disabled="index == 0"
                                @click="movePage(page, index, -1)">
                            <img src="@/assets/img/icon-page-moveprev.png" :disabled="index == 0"
                                 class="icon-page-move">
                        </button>
                        <button :class="['icon-page', index == (pages.length-1) ? 'icon-page-disabled':'']"
                                :disabled="index == (pages.length-1)" @click="movePage(page, index, 1)">
                            <img src="@/assets/img/icon-page-movenext.png" class="icon-page-move">
                        </button>
                    </div>
                    <div class="plug-step-index" v-if="page.plug.status">
                        <div class="cur-plug-step" @click="showPlugIndex(i,index)"
                             :class="i-1==page.plug.curStep?'active':''" v-for="i in 5" :key="i">{{index +
                            1}}{{i-1>0?`.${i-1}`:''}}
                        </div>
                    </div>
                </li>
                <li>
                    <div class="page-content add-box" @click="creatPage">
                        <img src="@/assets/img/icon-add.png">
                        <div>添加页面</div>
                    </div>
                </li>
            </ol>
        </div>
    </aside>
</template>

<script>
    import StagePage from './StagePage'

    export default {
        data () {
            return {
                selected: 1,
            }
        },
        methods: {
            creatPage () {
                // this.$store.commit("createdPage");

                this.$store.dispatch("createdPage")
                    .then(({page, pageActiveIndex, settingCompBlockType, activeCompData}) => {
                        let data = this.$store.state.activitySource
                        data.pages.push(page)
                        this.$store.commit("activitySource", {
                            data,
                            pageActiveIndex,
                            settingCompBlockType,
                            activeCompData
                        })

                        this.$store.commit("insetHistory");
                        this.$nextTick().then(() => {
                            this.$refs["asideContent"].scrollTop = this.$refs["asideTabsOl"].clientHeight
                        })
                    })
            },
            switchPage (index) {
                if (index !== this.pageActiveIndex) {
                    this.$store.commit("pageActiveIndex", index)
                    if (this.activePageData.plug.status) {
                        this.$store.commit("settingCompBlockType", 4)
                    } else {
                        this.$store.commit("settingCompBlockType")
                    }
                }
            },

            movePage (page, index, value) {
                let pages = this.pages
                pages.splice(index, 1)
                pages.splice(index + value, 0, page);

                this.$store.commit("settingCompBlockType")
                this.$store.commit("pageActiveIndex", index)
            },
            deletePage (page, index, disabled) {

                if (disabled) return

                let length = this.pages.length
                let activeIndex = this.pageActiveIndex

                if (this.pageActiveIndex === index && index === length - 1 || this.pageActiveIndex > index) {
                    activeIndex = this.pageActiveIndex - 1
                }

                if (this.pageActiveIndex == index) {
                    this.$store.commit("activeCompData")
                }
                if (this.pages[index].plug.status) {
                    this.$store.commit("settingCompBlockType", '1');
                    this.$store.state.activitySource.plugType = 0;
                }
                this.pages.splice(index, 1)
                this.$store.commit("pageActiveIndex", activeIndex)

                if (page.plugType > 0) {
                    this.activitySource.plugType = 0
                    this.activitySource.activeId = undefined
                }

                this.$store.commit("activitySource", {activitySource: this.activitySource})
            },

            showPlugIndex (step, index) {
                this.selected = step;
                let curPlug = this.pages[index].plug;
                Object.assign(curPlug, {curStep: step - 1});
                switch (step - 1) {
                    case 0:
                        Object.assign(curPlug, {isShow: true});
                        Object.assign(curPlug, {isBargain: false});
                        Object.assign(curPlug.step_1, {isShow: false});
                        // Object.assign(curPlug.step_3, {isShow: false});
                        Object.assign(curPlug.step_4, {isShow: false});
                        Object.assign(curPlug.step_5, {isShow: false});
                        break;
                    case 1:
                        Object.assign(curPlug, {isShow: false});
                        Object.assign(curPlug, {isBargain: false});
                        Object.assign(curPlug.step_1, {isShow: false});
                        // Object.assign(curPlug.step_3, {isShow: false});
                        Object.assign(curPlug.step_4, {isShow: false});
                        Object.assign(curPlug.step_5, {isShow: true});
                        break;
                    case 2:
                        Object.assign(curPlug, {isShow: false});
                        Object.assign(curPlug, {isBargain: false});
                        Object.assign(curPlug.step_1, {isShow: true});
                        // Object.assign(curPlug.step_3, {isShow: false});
                        Object.assign(curPlug.step_4, {isShow: false});
                        Object.assign(curPlug.step_5, {isShow: false});
                        break;
                    case 3:
                        Object.assign(curPlug, {isShow: true});
                        Object.assign(curPlug, {isBargain: true});
                        Object.assign(curPlug.step_1, {isShow: false});
                        // Object.assign(curPlug.step_3, {isShow: false});
                        Object.assign(curPlug.step_4, {isShow: false});
                        Object.assign(curPlug.step_5, {isShow: false});
                        break;
                    case 4:
                        Object.assign(curPlug, {isShow: false});
                        Object.assign(curPlug, {isBargain: true});
                        Object.assign(curPlug.step_1, {isShow: false});
                        // Object.assign(curPlug.step_3, {isShow: false});
                        Object.assign(curPlug.step_4, {isShow: true});
                        Object.assign(curPlug.step_5, {isShow: false});
                        break;
                }
                this.$store.commit("settingCompBlockType", 4)
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData));
            },
        },
        components: {
            StagePage
        },
        computed: {
            activitySource () {
                return this.$store.state.activitySource
            },
            pageActiveIndex () {
                return this.$store.state.pageActiveIndex
            },
            pages () {
                let pages = this.activitySource && this.activitySource.pages ? this.activitySource.pages : []
                if (pages.length == 1 && pages[0].plug.status) {
                    this.$store.commit("settingCompBlockType", 4)
                }
                return pages
            },
            activePageData () {
                return this.$store.getters.activePageData
            },

            publishStatus () {
                return this.$store.state.publishStatus
            }
        }
    }
</script>

<style type="text/less" lang="less">
    .e-aside {
        display: flex;
        flex-direction: column;
        position: absolute;
        height: 100%;
        width: 259px;
        background: #eee;
        z-index: 3;

        & > .aside-title {
            flex: 0 0 auto;
            padding: 18px 0;
            width: 4em;
            margin: 0 auto;
            font-size: 16px;
            color: #333;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

            &:hover {
                width: auto;
                white-space: unset;
            }
        }

        & > .aside-content {
            flex: 1 1 auto;
            overflow: hidden;
            overflow-y: auto;
        }
    }

    .aside-tabs-ol {
        background: #FAFAFA;

        & > li {
            position: relative;
            padding: 19px 30px 22px;
            width: 259px;
            /*height: 306px;*/

            &.tab-active {
                background: #E9E9E9;
            }

            &:hover,
            &.tab-active {
                .tabs-page-menu {
                    display: block;
                }
            }

            & > .page-content {
                position: relative;
                overflow: hidden;
                width: 150px;
                height: 241px;
                background: #fff;
                border: 1px solid rgba(221, 221, 221, 1);

                &.page-content-plug {
                    margin-top: 10px;
                    box-shadow: -4px -4px 0 1px #fff, -5px -5px 0 1px rgba(233, 233, 233, 1),-9px -9px 0 1px #fff, -10px -10px 0 1px rgba(233, 233, 233, 1);
                }
            }

            & > .tabs-page-menu-num {
                position: absolute;
                top: 19px;
                right: 37px;
            }

            .tabs-page-menu {
                display: none;
                position: absolute;
                bottom: 22px;
                right: 37px;
                width: 32px;
            }

            .add-box {
                padding-top: 100px;
                color: #999;
                text-align: center;
                border: 1px dashed #ccc;

                img {
                    margin-bottom: 10px;
                }

                &:hover {
                    border-style: solid;
                    cursor: pointer;
                }
            }
        }

        .icon-page {
            padding: 0;
            background: none;
            font-size: 0;
            cursor: pointer;

            & + .icon-page {
                margin-top: 18px;
            }
        }

        .icon-page-disabled {
            cursor: not-allowed;
        }

        .icon-page-move {
            width: 18px;
            height: 18px;
        }

        .icon-page-delete {
            width: 18px;
            height: 18px;
        }

    }

    .aside-tabs-ol li:hover .plug-step-index {
        display: block;
    }

    .plug-step-index {
        width: 70px;
        height: 100%;
        display: none;
        padding: 20px 10px 0;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);

        & > .cur-plug-step {
            box-sizing: border-box;
            height: 30px;
            color: #333333;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            margin-bottom: 5px;
            background: #FFFFFF;
        }

        & > .cur-plug-step.active {
            background: #8A7CCF;
            color: #ffffff;
            border-color: #B9AFE8;
        }
    }
</style>
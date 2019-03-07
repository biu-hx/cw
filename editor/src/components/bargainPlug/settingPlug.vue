<template>
    <div class="e-setting">
        <!--插件主页设置-->
        <div class="e-setting" v-show="pageData.plug.curStep==0">
            <div class="e-setting-title">助力省钱</div>
            <div class="e-setting-scroll">
                <div class="e-setting-content bg-setting-container">
                    <section class="setting-panel">
                        <div class="setting-head" style="justify-content: space-between">
                            <span class="setting-title">适用环境</span>
                        </div>
                        <div class="hota-event-wrapper">
                            <div class="event-label">选择环境</div>
                            <div class="event-select e-select w200-e-select relative">
                                <div class="e-select-input"
                                     @click.stop="environmentStatu=true,selectState=false,activeItemStatu=false,navigateStatu=false">
                                    <input type="text" readonly :value="environmentList[initData.curJraIndex].name">
                                    <img src="@/assets/img/icon-arrow-bottom.png" class="icon-arrow-bottom">
                                </div>
                                <ol class="e-select-menu" v-show="environmentStatu">
                                    <li class="e-select-item" v-for="(item,index) in environmentList" :key="index"
                                        @click="selectJra(item,index)">
                                        {{item.name}}
                                    </li>
                                </ol>
                                <div v-if="publishStatus==3" class="fiexd-rect"></div>
                            </div>
                        </div>
                    </section>
                    <section class="setting-panel">
                        <div class="setting-head" style="justify-content: space-between">
                            <span class="setting-title">活动类型</span>
                        </div>
                        <div class="hota-event-wrapper" v-if="activeItem.length>0">
                            <div class="event-label">选择类型</div>
                            <div class="event-select e-select w200-e-select relative">
                                <div class="e-select-input"
                                     @click.stop="activeItemStatu=true,selectState=false,environmentStatu=false">
                                    <input type="text" readonly :value="activeItem[initData.curActiveIndex].name">
                                    <img src="@/assets/img/icon-arrow-bottom.png" class="icon-arrow-bottom">
                                </div>
                                <ol class="e-select-menu" v-show="activeItemStatu">
                                    <li class="e-select-item" v-for="(item,index) in activeItem" :key="index"
                                        @click="selectAct(item,index)">
                                        {{item.name}}
                                    </li>
                                </ol>
                                <div v-if="publishStatus==3" class="fiexd-rect"></div>
                            </div>
                        </div>
                        <div class="creat-active" style="margin-top: 20px" v-if="publishStatus!=3">
                            <span class="creat-active-hint">如无可用的抽奖类型，点此</span>
                            <button class="creat-active-btn" @click="openWindow">新建</button>
                        </div>
                    </section>
                    <section class="setting-panel">
                        <div class="setting-head">
                            <span class="setting-title">图片容器</span>
                        </div>
                        <div class="creat-active-img-wrap">
                            <div class="img-wrap-select-wrap">
                                <div v-for="(item,index) in defaultImg" :class="initData.selectedIndex==index?'selected':''"
                                     class="img-wrap-select"
                                     @click="selectImg(index)">
                                    <img :src="item.url" alt="">
                                    <div v-if="initData.selectedIndex==index" class="selected-icon">
                                        <img src="@/assets/img/icon-plug-selected.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <label class="handle-btn">
                                    <BaseUploadImg class="handel-btn" accept="image/jpeg,image/png" type="3"
                                                   @change="inputChange">上传自定义图片
                                    </BaseUploadImg>
                                </label>
                            </div>
                            <div class="cell text-center"><span class="creat-active-hint">自适应内部图片高度</span></div>
                        </div>
                    </section>
                    <section class="setting-panel">
                        <div class="dashed-1 dashed"></div>
                        <div class="dashed-2 dashed"></div>
                        <div class="setting-head">
                            <span class="setting-title">浮动按钮</span>
                        </div>
                        <div class="btn-setting-model">
                            <div class="flex-center-row">
                                <div class="active-btn-info">
                                    <div class="left-btn-info btn-style">
                                        <label class="custom-checkbox" for="is-show-btn">
                                            <input id="is-show-btn" v-model="pageData.plug.isShowBtn" @click="isShowBtn(pageData.plug.isShowBtn)" type="checkbox">
                                            <i></i> <span class="check-name">左按钮</span>
                                        </label>
                                    </div>
                                    <div class="right-btn-info btn-style"></div>
                                </div>
                            </div>
                            <div class="setting-item-wrap">
                                <div class="setting-item" v-for="(item,index) in initData.leftSetting" :key="index">
                                    <span class="setting-name">{{item.name}}</span>
                                    <span class="color-cell" :style="{backgroundColor: item.color}" ref="colorCellImg"
                                          @click="setBtn(1,item.keyName,index)"></span>
                                </div>
                                <div class="color-sketch-fixed" v-if="showSketchState==1" @click.stop>
                                    <sketch v-model="sketchColor" @input="sketchColorInput"
                                            @mouseup.native="sketchEditStatus=false"
                                            @mousedown.native="sketchEditStatus=true"></sketch>
                                </div>
                            </div>
                            <div class="hota-event-wrapper" style="margin-bottom: 32px">
                                <div class="event-label">链接跳转API接口</div>
                                <div class="event-select e-select w200-e-select">
                                    <div class="e-select-input"
                                         @click.stop="navigateStatu=true,selectState=false,activeItemStatu=false,environmentStatu=false">
                                        <input type="text" readonly :value="navigateList[initData.curNavigateIndex].name">
                                        <img src="@/assets/img/icon-arrow-bottom.png" class="icon-arrow-bottom">
                                    </div>
                                    <ol class="e-select-menu" v-show="navigateStatu">
                                        <li class="e-select-item" v-for="(item,index) in navigateList" :key="index"
                                            @click="selectNavigate(item,index)">
                                            {{item.name}}
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <!--<div class="img-input-group" style="margin-bottom: 30px;">-->
                                <!--<span class="name">链接</span>-->
                                <!--<input type="text" v-model="inputValue" class="input" @blur="blur">-->
                            <!--</div>-->
                        </div>
                        <div class="btn-setting-model">
                            <div class="flex-center-row">
                                <div class="active-btn-info">
                                    <div class="left-btn-info btn-style"></div>
                                    <div class="right-btn-info btn-style"><span>右按钮</span></div>
                                </div>
                            </div>
                            <div class="setting-item-wrap">
                                <div class="setting-item" v-for="(item,index) in initData.rightSetting" :key="index">
                                    <span class="setting-name">{{item.name}}</span>
                                    <span class="color-cell" :style="{backgroundColor: item.color}" ref="colorCellImg"
                                          @click="setBtn(2,item.keyName,index)"></span>
                                </div>
                                <div class="color-sketch-fixed" v-if="showSketchState==2" @click.stop>
                                    <sketch v-model="sketchColor" @input="sketchColorInput"
                                            @mouseup.native="sketchEditStatus=false"
                                            @mousedown.native="sketchEditStatus=true"></sketch>
                                </div>

                            </div>
                            <div class="hota-event-wrapper">
                                <div class="event-label">解禁条件</div>
                                <div class="event-select e-select">
                                    <div class="e-select-input"
                                         @click.stop="selectState=true,activeItemStatu=false,environmentStatu=false,navigateStatu=false">
                                        <input type="text" readonly :value="eventModelList[0].name">
                                        <img src="@/assets/img/icon-arrow-bottom.png" class="icon-arrow-bottom">
                                    </div>
                                    <ol class="e-select-menu" v-show="selectState">
                                        <li class="e-select-item" :class="item.value==2?'grey':''" v-for="(item,index) in eventModelList" :key="index"
                                            @click="changeSelect(item)">
                                            {{item.name}}
                                        </li>
                                    </ol>
                                </div>
                            </div>

                        </div>

                    </section>
                </div>
            </div>
        </div>
        <!--插件设置-第一步-->
        <setting-step_5 v-show="pageData.plug.curStep==1"></setting-step_5>
        <setting-step_1 v-show="pageData.plug.curStep==2"></setting-step_1>
        <setting-step_2 v-show="pageData.plug.curStep==3"
                        :rightSetting="initData.rightSetting"></setting-step_2>
        <!--<setting-step_3 :isHavePlug="isHavePlug" v-show="pageData.plug.curStep==4"></setting-step_3>-->
        <setting-step_4 v-show="pageData.plug.curStep==4"></setting-step_4>
    </div>
</template>

<script>
    import BaseUploadImg from '../BaseUploadImg'
    import settingStep_1 from './settingStep_1';
    import settingStep_2 from './settingStep_2';
    import settingStep_3 from './settingStep_3';
    import settingStep_4 from './settingStep_4';
    import settingStep_5 from './settingStep_5';
    import {Sketch} from 'vue-color'

    export default {
        data () {
            return {
                activeColor:'#ffffff',
                editor_id: this.$route.query.templateId || '',//作品ID
                checked: '',
                keyName: '',
                sketchColor: {},//颜色拾取
                showSketchState: 0,//是否显示拾色器
                isShow: true,//是否显示
                // 下拉列表
                activeItemStatu: false,
                activeItem: [],// 活动列表
                // 解禁条件
                eventModelList: [
                    {
                        name: '静默授权',
                        value: 1
                    },
                    {
                        name: '报名',
                        value: 2
                    }
                ],
                // 选择环境
                environmentList: [
                    {
                        name: '小程序',
                        value: 'wechatApplet'
                    }
                ],
                environmentStatu: false,
                selectState: false,
                defaultImg: [
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/pic_1.jpg?imageView2/1/w/140/h/70'
                    },
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/pic_2.jpg?imageView2/1/w/140/h/70'
                    },

                ],
                navigateList:[
                    {
                        name: '详情页',
                        value: '1'
                    }
                ],
                navigateStatu: false,
                inputValue: '',//连接URL
                sketchEditStatus:false
            }
        },
        props:['isCreated'],
        computed: {
            publishStatus(){
              return this.$store.state.publishStatus;
            },
            initData(){
                return this.pageData.plug.initData;
            },
            pageData () {
                let data = this.$store.getters.activePageData;
                return data
            },
        },
        components: {
            Sketch,
            BaseUploadImg,
            settingStep_1,
            settingStep_2,
            settingStep_3,
            settingStep_4,
            settingStep_5,
        },
        created () {
            this.getActlist();
        },
        mounted () {
            document.addEventListener("click", (e) => {
                this.selectState = false;
                this.activeItemStatu = false;
                this.environmentStatu = false;
                this.navigateStatu =false;
                let index = this.showSketchState == 1 ? this.checked : this.showSketchState == 2 ? this.checked + 3 : '';
                if (this.showSketchState != 0 && e.target != this.$refs['colorCellImg'][index]) {
                    this.showSketchState = 0
                }
            })
        },
        methods: {
            // 获取详细活动列表
            getActlist () {
                this.$http.post({
                    url: '/activity/list',
                    data: {
                        page_flag: 0,
                        // id: this.editor_id,//作品ID
                    }
                }).then(res => {
                    this.activeItem = res.items;
                    if (res.items.length > 0) {
                        this.$store.commit("updateStoreState", {
                            activitySource: JSON.parse(JSON.stringify(Object.assign(this.$store.state.activitySource, {
                                activeId: res.items[this.initData.curActiveIndex].id,
                                activeType: res.items[this.initData.curActiveIndex].type
                            })))
                        });
                    }
                }).catch(({next}) => next())
            },
            // 选中活动
            selectAct (data, index) {
                Object.assign(this.pageData.plug.initData, {curActiveIndex: index});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
                this.$store.commit("activitySource", {
                    'activitySource': JSON.parse(JSON.stringify(Object.assign(this.$store.state.activitySource, {
                        activeId: data.id,
                        activeType: data.type,
                    })))
                });

            },
            // 选择环境
            selectJra(data, index){
                Object.assign(this.pageData.plug, {runJra: data.value});
                Object.assign(this.pageData.plug.initData, {curJraIndex: index});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },
            //选择跳转位置
            selectNavigate(data,index){
                Object.assign(this.pageData.plug.initData, {curNavigateIndex: index});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },
            // 新建活动跳转
            openWindow () {
                this.$emit('creatActive')
            },
            // 上传图片
            inputChange ({url}) {
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.initData, {selectedIndex: -1});
                Object.assign(this.pageData.plug, {setBgImg: obj});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },

            // 是否显示按钮
            isShowBtn (type) {
                Object.assign(this.pageData.plug, {isShowBtn: !type});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },
            // 设置颜色
            setBtn (type, key, index) {
                this.checked = index;
                this.showSketchState = type;
                this.keyName = key;
            },
            setBgColor (color,insetHistoryState) {
                let key = this.keyName, type = this.showSketchState, index = this.checked;
                if (type == 1) {
                    Object.assign(this.pageData.plug.initData.leftSetting[index], {color: color});
                    Object.assign(this.pageData.plug.leftBtnColor, {[key]: color});
                }
                if (type == 2) {
                    Object.assign(this.pageData.plug.initData.rightSetting[index], {color: color});
                    Object.assign(this.pageData.plug.rightBtnColor, {[key]: color});
                    Object.assign(this.pageData.plug.step_2.setBtn, {[key]: color});
                }
                this.$store.commit("updateActivitySource", [Object.assign({}, this.pageData), insetHistoryState])
            },
            //图片链接失去焦点
            blur () {
                Object.assign(this.pageData.plug, {linkUrl: this.inputValue});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },
            // 选择图片容器
            selectImg (index) {
                let url = this.defaultImg[index].url.split('?')[0];
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug, {setBgImg: obj});
                Object.assign(this.pageData.plug.initData, {selectedIndex: index});
                Object.assign(this.pageData.bg.img, {url: url});
                Object.assign(this.pageData.bg, {type: 1});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },
            // 下拉选择
            changeSelect (data) {
                console.log(data)
            },
            sketchColorInput (color) {
                if (color.a === 1) {
                    this.activeColor = color.hex
                } else {
                    let {a, r, g, b} = this.sketchColor.rgba
                    this.activeColor = `rgba(${r}, ${g}, ${b}, ${a})`
                }

                this.setBgColor(this.activeColor, this.sketchEditStatus ? "pause" : undefined)
            },
        },
        watch: {
            isCreated(newVal,oldVal){
                this.getActlist();
                Object.assign(this.pageData.plug.initData, {curActiveIndex: 0});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            }
        }
    }
</script>

<style type="text/less" lang="less">
    .e-setting-title {
        background: #CCCCCC;
        background: no-repeat 0 0;
        background-size: cover;
    }

    .creat-active {
        display: flex;
        justify-content: center;
        align-items: center;

        & > .creat-active-hint {
            color: #999999;
            font-size: 14px;
            margin-right: 10px;
        }

        & > .creat-active-btn {
            width: 60px;
            height: 30px;
            background: #8A7CCF;
            font-size: 14px;
            border-radius: 16px;
            color: #ffffff;
        }
    }

    .img-wrap-select-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        & > .img-wrap-select {
            box-sizing: border-box;
            width: 135px;
            height: 70px;
            border: 2px solid #ffffff;
            background: #FFFFFF;
            cursor: pointer;
            border-radius: 2px;
            position: relative;

            & > img {
                max-width: 100%;
            }
        }

        & > .img-wrap-select.selected {
            border-color: #8A7CCF;
        }
    }

    .creat-active-img-wrap {
        & > .cell {
            & > .handle-btn {
                display: block;
                box-sizing: border-box;
                border: 1px solid #DDDDDD;
                background: #FFFFFF;
                color: #333333;
                font-size: 14px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
                margin: 10px 0;
            }

            & > .creat-active-hint {
                font-size: 12px;
                color: #999999;
            }
        }
    }

    .setting-item-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-flow: row wrap;
        position: relative;

        & > .color-sketch-fixed {
            top: 45px;
        }

        & > .setting-item:nth-child(3n) {
            margin-right: 0;
        }

        & > .setting-item {
            display: flex;
            align-items: center;
            margin-right: 20px;
            margin-bottom: 15px;

            & > .setting-name {
                flex: 1;
                font-size: 14px;
                color: #333333;
                margin-right: 10px;
            }

            & > .color-cell {
                width: 40px;
                height: 24px;
                box-sizing: border-box;
                border-radius: 2px;
                border: 1px solid #CCCCCC;
                background: #333333;
                cursor: pointer;
            }
        }
    }

    .flex-center-row {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active-btn-info {
        font-size: 12px;
        color: #666666;
        display: flex;
        padding: 5px;
        border-radius: 2px;
        box-sizing: border-box;
        align-items: center;
        background: #F0F0F0;
        z-index: 1;
        margin-bottom: 20px;
        justify-content: center;
        border: 1px dashed #DDDDDD;

        & > .btn-style {
            height: 20px;
            display: flex;
            align-items: center;
            position: relative;
            justify-content: center;
            border-radius: 2px;
            background: #DDDDDD;
        }

        & > .left-btn-info {
            width: 70px;
            justify-content: flex-start;
            margin-right: 5px;
        }

        & > .right-btn-info {
            width: 100px;
        }
    }

    .e-select {
        width: 135px;
    }

    .w200-e-select {
        flex: 1!important;
        width: 200px !important;
    }

    .event-label {
        color: #333333;
    }

    .setting-panel {
        position: relative;

        & > .dashed {
            position: absolute;
            width: 100%;
            height: 1px;
            left: 0;
            border-top: 1px dashed #DDDDDD;
        }

        & > .dashed-1 {
            top: 81px;
        }

        & > .dashed-2 {
            top: 241px;
        }
    }

    .selected-icon {
        position: absolute;
        width: 22px;
        height: 18px;
        right: 0;
        bottom: 0;

        & > img {
            width: 100%;
        }
    }

    .e-select > .e-select-menu {
        z-index: 3;
    }

    .custom-checkbox {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        & > .check-name {
            font-size: 12px;
            margin-left: 5px;
        }
    }

    .custom-checkbox input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        outline: none;
        display: none
    }

    .custom-checkbox input[type="checkbox"] + i {
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url("../../assets/img/icon_check.png") no-repeat;
        background-size: cover;
    }

    .custom-checkbox input[type="checkbox"]:checked + i {
        background-image: url("../../assets/img/icon_checked.png");
        background-size: cover;
    }
    .fiexd-rect{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(104, 104, 104, 0);
    }
</style>
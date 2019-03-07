<template>
    <div class="e-setting">
        <div class="e-setting-title">弹窗-召唤砍价</div>
        <div class="e-setting-scroll">
            <div class="e-setting-content bg-setting-container">
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">底图</span>
                    </div>
                    <div class="creat-active-img-wrap">
                        <div class="img-wrap-select-wrap">
                            <div v-for="(item,index) in defaultImg" :class="selectedIndex==index?'selected':''"
                                 class="img-wrap-select"
                                 @click="selectImg(index)">
                                <img :src="item.url" alt="">
                                <div v-if="selectedIndex==index" class="selected-icon">
                                    <img src="@/assets/img/icon-plug-selected.png" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="cell">
                            <label class="handle-btn">
                                <BaseUploadImg class="handel-btn" accept="image/jpeg,image/png" type="6"
                                            @change="inputChange">上传自定义图片
                                </BaseUploadImg>
                            </label>
                        </div>
                        <div class="cell text-center"><span class="creat-active-hint">最佳尺寸：750*1208</span></div>
                    </div>
                </section>
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">文字样式</span>
                    </div>
                    <!--主标题-->
                    <div class="section-head-desc">
                        <span>主标题</span>
                        <div class="checkbox-wrap">
                            <label class="custom-checkbox" for="is-show-title">
                                <span class="check-name">不显示</span>
                                <input id="is-show-title" v-model="isShowTitle" @click="titleCheck" type="checkbox">
                                <i></i>
                            </label>
                        </div>

                    </div>
                    <div class="plug-style-row">
                        <div class="hota-event-wrapper">
                            <div class="event-label">字号</div>
                            <div class="event-select e-select">
                                <div class="e-select-input" @click.stop="isTitleList=true,isNameList=false">
                                    <input type="text" readonly :value="titleList[titleListIndex].name">
                                    <img src="@/assets/img/icon-arrow-bottom.png" class="icon-arrow-bottom">
                                </div>
                                <ol class="e-select-menu" v-show="isTitleList">
                                    <li class="e-select-item" v-for="(item,index) in titleList" :key="index"
                                        @click="changeSelect(1,item,index)">
                                        {{item.name}}
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div class="bold-btn" :class="{active:isTitleBold}" @click="isBold(1)"><span>加粗</span></div>
                    </div>
                    <div class="setting-item-wrap">
                        <div class="setting-item" v-for="(item,index) in titleFormat" :key="index">
                            <span class="setting-name">{{item.name}}</span>
                            <span class="color-cell" :style="{backgroundColor: item.color}" ref="colorCellImg"
                                  @click="setBtn(1,item.keyName,index)"></span>
                        </div>
                        <div class="color-sketch-fixed" v-if="showSketchState==1">
                            <sketch v-model="sketchColor"></sketch>
                        </div>
                    </div>
                    <!--项目名称-->
                    <div class="section-head-desc">
                        <span>项目名称</span>
                        <div class="checkbox-wrap">
                            <label class="custom-checkbox" @click="nameCheck" for="is-show-name">
                                <span class="check-name">不显示</span>
                                <input id="is-show-name" v-model="isShowName" type="checkbox">
                                <i></i>
                            </label>
                        </div>

                    </div>
                    <div class="plug-style-row">
                        <div class="hota-event-wrapper">
                            <div class="event-label">字号</div>
                            <div class="event-select e-select">
                                <div class="e-select-input" @click.stop="isNameList=true,isTitleList=false">
                                    <input type="text" readonly :value="nameList[nameListIndex].name">
                                    <img src="@/assets/img/icon-arrow-bottom.png" class="icon-arrow-bottom">
                                </div>
                                <ol class="e-select-menu" v-show="isNameList">
                                    <li class="e-select-item" v-for="(item,index) in nameList" :key="index"
                                        @click="changeSelect(2,item,index)">
                                        {{item.name}}
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div class="bold-btn" :class="{active:isNameBold}" @click="isBold(2)"><span>加粗</span></div>
                    </div>
                    <div class="setting-item-wrap">
                        <div class="setting-item" v-for="(item,index) in nameFormat" :key="index">
                            <span class="setting-name">{{item.name}}</span>
                            <span class="color-cell" :style="{backgroundColor: item.color}" ref="colorCellImg"
                                  @click="setBtn(2,item.keyName,index)"></span>
                        </div>
                        <div class="color-sketch-fixed" v-if="showSketchState==2">
                            <sketch v-model="sketchColor"></sketch>
                        </div>
                    </div>
                    <div class="section-head-desc">
                        <span>底部文字</span>
                    </div>
                    <div class="setting-item-wrap">
                        <div class="setting-item" v-for="(item,index) in hintFormat" :key="index">
                            <span class="setting-name">{{item.name}}</span>
                            <span class="color-cell" :style="{backgroundColor: item.color}" ref="colorCellImg"
                                  @click="setBtn(3,item.keyName,index)"></span>
                        </div>
                        <div class="color-sketch-fixed" v-if="showSketchState==3">
                            <sketch v-model="sketchColor"></sketch>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    </div>
</template>

<script>
    import BaseUploadImg from '../BaseUploadImg'
    import {Sketch} from 'vue-color'

    export default {
        data() {
            return {
                checked: '',
                keyName: '',//
                sketchColor: {},//颜色拾取
                showSketchState: 0,//是否显示拾色器
                titleFormat: [
                    {
                        name: '文字',
                        keyName: 'color',
                        color: '#333333',
                    },

                ],
                nameFormat: [
                    {
                        name: '文字',
                        keyName: 'color',
                        color: '#333333',
                    },

                ],
                hintFormat: [
                    {
                        name: '文字',
                        keyName: 'color',
                        color: '#333333',
                    },

                ],
                titleList: [
                    {
                        name: '30号居中',
                        style: {
                            fontSize: '30px',
                            textAlign: 'center',
                        },
                        value: 1
                    },
                    {
                        name: '28号居中',
                        style: {
                            fontSize: '28px',
                            textAlign: 'center',
                        },
                        value: 2
                    }
                ],
                titleListIndex: 0,
                nameList: [
                    {
                        name: '14号居中',
                        style: {
                            fontSize: '14px',
                            textAlign: 'center',
                        },
                        value: 1
                    },
                    {
                        name: '12号居中',
                        style: {
                            fontSize: '12px',
                            textAlign: 'center',
                        },
                        value: 2
                    }
                ],
                nameListIndex: 0,
                isTitleList: false,
                isNameList: false,
                isShowTitle: false,//是否显示标题
                isShowName: false,//是否显示名称
                isTitleBold: true,//标题是否加粗
                isNameBold: false,//名称是否加粗
                selectedIndex: 0,//选中的容器
                defaultImg: [
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/call_bg_1.jpg?imageView2/1/w/140/h/70'
                    },
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/call_bg_2.jpg?imageView2/1/w/140/h/70'
                    },

                ],

            }
        },
        computed: {
            pageData() {
                let data = this.$store.getters.activePageData;
                return data
            },
        },
        components: {
            Sketch,
            BaseUploadImg
        },
        mounted() {
            document.addEventListener("click", (e) => {
                let index = this.showSketchState;
                this.isTitleList = false;
                this.isNameList = false;
                if (this.showSketchState != 0 && e.target != this.$refs['colorCellImg'][index - 1]) {
                    this.showSketchState = 0
                }
            })
        },
        methods: {
            // 上传图片
            inputChange({url}) {
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                this.selectedIndex = -1;
                Object.assign(this.pageData.plug.step_3, {setBgImg: obj});
                this.$store.commit("updateActivitySource", JSON.parse(JSON.stringify(Object.assign({}, this.pageData))));
            },
            // 选择图片容器
            selectImg(index) {
                this.selectedIndex = index;
                let url = this.defaultImg[index].url.split('?')[0];
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.step_3, {setBgImg: obj});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },
            // 是否显示
            titleCheck() {
                this.isShowTitle = !this.isShowTitle;
                Object.assign(this.pageData.plug.step_3.title, {isShow: this.isShowTitle});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },
            nameCheck() {
                this.isShowName = !this.isShowName;
                Object.assign(this.pageData.plug.step_3.name, {isShow: this.isShowName});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },
            // 是否加粗
            isBold(type) {
                let obj = this.pageData.plug.step_3;
                switch (type) {
                    case 1:
                        if (this.isTitleBold) {
                            Object.assign(obj.title.style, {fontWeight: 'normal'});
                            this.isTitleBold = false;
                        } else {
                            Object.assign(obj.title.style, {fontWeight: 'bold'});
                            this.isTitleBold = true;
                        }
                        break;
                    case 2:
                        if (this.isNameBold) {
                            Object.assign(obj.name.style, {fontWeight: 'normal'});
                            this.isNameBold = false;
                        } else {
                            Object.assign(obj.name.style, {fontWeight: 'bold'});
                            this.isNameBold = true;
                        }
                        break;
                }
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },
            // 颜色设置
            setBtn(type, key, index) {
                this.checked = index;
                this.showSketchState = type;
                this.keyName = key;
            },
            setBgColor(color) {
                let key = this.keyName, type = this.showSketchState, index = this.checked;
                if (type == 1) {
                    this.titleFormat[index].color = color;
                    Object.assign(this.pageData.plug.step_3.title.style, {[key]: color});
                }
                if (type == 2) {
                    this.nameFormat[index].color = color;
                    Object.assign(this.pageData.plug.step_3.name.style, {[key]: color});
                }
                if (type == 3) {
                    this.hintFormat[index].color = color;
                    Object.assign(this.pageData.plug.step_3.hintText.style, {[key]: color});
                }
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },

            // 下拉选择
            changeSelect(type, data, index) {
                let obj = this.pageData.plug.step_3;
                if (type == 1) {
                    this.titleListIndex = index;
                    Object.assign(obj.title.style, {fontSize: data.style.fontSize, textAlign: data.style.textAlign});
                }
                if (type == 2) {
                    this.nameListIndex = index;
                    Object.assign(obj.name.style, {fontSize: data.style.fontSize, textAlign: data.style.textAlign});
                }
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },

        },
        watch: {
            "sketchColor"() {
                let {a, r, g, b} = this.sketchColor.rgba;
                this.setBgColor(`rgba(${r}, ${g}, ${b}, ${a})`);
            },
            isHavePlug(newVal, oldVal) {
                if (!newVal) {
                    this.titleFormat = [
                        {
                            name: '文字',
                            keyName: 'color',
                            color: '#333333',
                        },

                    ];
                    this.nameFormat = [
                        {
                            name: '文字',
                            keyName: 'color',
                            color: '#333333',
                        },

                    ];
                    this.hintFormat = [
                        {
                            name: '文字',
                            keyName: 'color',
                            color: '#333333',
                        },

                    ];
                    this.nameListIndex = 0;
                    this.titleListIndex = 0;
                    this.isShowTitle = false;//是否显示标题
                    this.isShowName = false;//是否显示名称
                    this.isTitleBold = true;//标题是否加粗
                    this.isNameBold = false;//名称是否加粗
                    this.selectedIndex = 0;//选中的容器
                }
            }
        }
    }
</script>

<style scoped>
    .section-head-desc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #999999;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .e-select {
        width: 162px;
    }

    .plug-style-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .checkbox-wrap {
        display: flex;
        align-items: center;
        color: #333333;
        font-size: 14px;
    }

    .bold-btn {
        width: 56px;
        height: 34px;
        border-radius: 2px;
        color: #999999;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #DDDDDD;
        border: 1px solid #CCCCCC;
        box-sizing: border-box;
        cursor: pointer;
    }

    .bold-btn.active {
        color: #8A7CCF;
        background: #FFFFFF;
    }

    .setting-panel .setting-item-wrap {
        margin-bottom: 15px;
    }

    .setting-panel .setting-item-wrap:last-child {
        margin-bottom: 0;
    }

    .check-name {
        margin-left: 0;
        margin-right: 5px;
    }
</style>
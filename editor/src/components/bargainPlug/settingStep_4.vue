<template>
    <div class="e-setting">
        <div class="e-setting-title">弹窗-好友砍价</div>
        <div class="e-setting-scroll">
            <div class="e-setting-content bg-setting-container">
                <!--底图-->
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">底图</span>
                    </div>
                    <div class="creat-active-img-wrap">
                        <div class="img-wrap-select-wrap">
                            <div v-for="(item,index) in defaultImg_1" :class="step_4.initData.selectBgIndex==index?'selected':''"
                                 class="img-wrap-select" @click="selectBg(index)">
                                <img :src="item.url" alt="">
                                <div v-if="step_4.initData.selectBgIndex==index" class="selected-icon">
                                    <img src="@/assets/img/icon-plug-selected.png" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="cell">
                            <label class="handle-btn">
                                <BaseUploadImg class="handel-btn" accept="image/jpeg,image/png" type="7"
                                            @change="inputChangeBg">上传自定义图片
                                </BaseUploadImg>
                            </label>
                        </div>
                        <div class="cell text-center"><span class="creat-active-hint">最佳尺寸：750*1208</span></div>
                    </div>
                </section>
                <!--卡券背景-->
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">卡券背景</span>
                    </div>
                    <div class="creat-active-img-wrap">
                        <div class="img-wrap-select-wrap">
                            <div v-for="(item,index) in defaultImg_2" :class="step_4.initData.selectCardBgIndex==index?'selected':''"
                                 class="img-wrap-select"
                                 @click="selectCardBg(index)">
                                <img :src="item.url" alt="">
                                <div v-if="step_4.initData.selectCardBgIndex==index" class="selected-icon">
                                    <img src="@/assets/img/icon-plug-selected.png" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="cell">
                            <label class="handle-btn">
                                <BaseUploadImg class="handel-btn" accept="image/jpeg,image/png" type="8"
                                            @change="inputCardBg">上传自定义图片
                                </BaseUploadImg>
                            </label>
                        </div>
                        <div class="cell text-center"><span class="creat-active-hint">最佳尺寸：690*300</span></div>
                    </div>
                </section>
                <!--项目名称-->
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">项目名称</span>
                    </div>
                    <div class="plug-style-row">
                        <div class="hota-event-wrapper">
                            <div class="event-label">字号</div>
                            <div class="event-select e-select">
                                <div class="e-select-input" @click.stop="isNameList=true">
                                    <input type="text" readonly :value="nameList[step_4.initData.nameListIndex].name">
                                    <img src="@/assets/img/icon-arrow-bottom.png" class="icon-arrow-bottom">
                                </div>
                                <ol class="e-select-menu" v-show="isNameList">
                                    <li class="e-select-item" v-for="(item,index) in nameList" :key="index"
                                        @click="changeSelect(item,index)">
                                        {{item.name}}
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div class="bold-btn" :class="{active:step_4.initData.isNameBold}" @click="isBold"><span>加粗</span></div>
                    </div>
                    <div class="setting-item-wrap">
                        <div class="setting-item" v-for="(item,index) in step_4.initData.setNameColor" :key="index">
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
                </section>
                <!--倒计时-->
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">倒计时样式</span>
                    </div>
                    <div class="setting-item-wrap">
                        <div class="setting-item" v-for="(item,index) in step_4.initData.setCountColor" :key="index">
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
                    <div class="set-row pdt-20">
                        <div class="set-name">尺寸</div>
                        <div class="set-size-wrap">
                            <div class="set-size" @click="selectSize(index)" :class="{selected:step_4.countTime.sizeIndex==index}"
                                 v-for="(item,index) in setSize.list">
                                <span>{{item.name}}</span>
                                <div v-if="step_4.countTime.sizeIndex==index" class="selected-icon">
                                    <img src="@/assets/img/icon-plug-selected.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!--砍价进度条-->
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">砍价进度条样式</span>
                    </div>
                    <div class="setting-item-wrap">
                        <div class="setting-item" v-for="(item,index) in step_4.initData.setBar" :key="index">
                            <span class="setting-name">{{item.name}}</span>
                            <span class="color-cell" :style="{backgroundColor: item.color}" ref="colorCellImg"
                                  @click="setBtn(3,item.keyName,index)"></span>
                        </div>
                        <div class="color-sketch-fixed" v-if="showSketchState==3" @click.stop>
                            <sketch v-model="sketchColor" @input="sketchColorInput"
                                    @mouseup.native="sketchEditStatus=false"
                                            @mousedown.native="sketchEditStatus=true"></sketch>
                        </div>
                    </div>

                </section>
                <!--按钮-->
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">按钮</span>
                    </div>
                    <div class="btn-setting-model">
                        <div class="setting-item-wrap">
                            <div class="setting-item" v-for="(item,index) in step_4.initData.setBtnColor" :key="index">
                                <span class="setting-name">{{item.name}}</span>
                                <span class="color-cell" :style="{backgroundColor: item.color}" ref="colorCellImg"
                                      @click="setBtn(4,item.keyName,index)"></span>
                            </div>
                            <div class="color-sketch-fixed" v-if="showSketchState==4" @click.stop>
                                <sketch v-model="sketchColor" @input="sketchColorInput"
                                        @mouseup.native="sketchEditStatus=false"
                                            @mousedown.native="sketchEditStatus=true"></sketch>
                            </div>
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
                activeColor:'#ffffff',
                checked: '',
                keyName: '',
                sketchColor: {},//颜色拾取
                showSketchState: 0,//是否显示拾色器
                sketchEditStatus:false,
                // 项目名称字体选项
                nameList: [
                    {
                        name: '24号居中',
                        style: {
                            fontSize: '24px',
                            textAlign: 'center',
                        },
                        value: 1
                    },
                    {
                        name: '20号居中',
                        style: {
                            fontSize: '20px',
                            textAlign: 'center',
                        },
                        value: 2
                    }
                ],
                isNameList: false,
                // 设置倒计时尺寸
                setSize: {
                    list: [
                        {
                            name: '大',
                            type: 'big'
                        },
                        {
                            name: '中',
                            type: 'middle'
                        },
                        {
                            name: '小',
                            type: 'small'
                        },
                    ]
                },

                defaultImg_1: [
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/detail_bg_1.jpg?imageView2/1/w/140/h/70'
                    },
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/detail_bg_2.jpg?imageView2/1/w/140/h/70'
                    },

                ],
                defaultImg_2: [
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/coupon_bg_1.jpg?imageView2/1/w/140/h/70'
                    },
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/coupon_bg_2.jpg?imageView2/1/w/140/h/70'
                    },

                ],

            }
        },
        computed: {
            step_4(){
                return this.pageData.plug.step_4;
            },
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
                this.isNameList = false;
                let index = '';
                switch (this.showSketchState) {
                    case 1:
                        index = this.checked;
                        break;
                    case 2:
                        index = this.checked + this.showSketchState - 1;
                        break;
                    case 3:
                        index = this.checked + this.showSketchState - 1;
                        break;
                    case 4:
                        index = this.checked + this.showSketchState;
                        break;

                }
                if (this.showSketchState != 0 && e.target != this.$refs['colorCellImg'][index]) {
                    this.showSketchState = 0
                }
            })
        },
        methods: {
            // 上传图片
            inputChangeBg({url}) {
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.step_4.initData, {selectBgIndex: -1});
                Object.assign(this.pageData.plug.step_4, {setBgImg: obj});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },
            inputCardBg({url}) {
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.step_4.initData, {selectCardBgIndex: -1});
                Object.assign(this.pageData.plug.step_4, {setCardBg: obj});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },
            // 颜色设置
            setBtn(type, key, index) {
                this.checked = index;
                this.keyName = key;
                this.showSketchState = type;
            },
            setBgColor(color,insetHistoryState) {
                let key = this.keyName, type = this.showSketchState, index = this.checked;
                if (type == 1) {
                    Object.assign(this.step_4.initData.setNameColor[index], {color: color});
                    Object.assign(this.pageData.plug.step_4.name.style, {[key]: color});
                }
                if (type == 2) {
                    Object.assign(this.step_4.initData.setCountColor[index], {color: color});
                    Object.assign(this.pageData.plug.step_4.countTime.style, {[key]: color});
                }
                if (type == 3) {
                    Object.assign(this.step_4.initData.setBar[index], {color: color});
                    if (index == 0) {
                        Object.assign(this.pageData.plug.step_4.progress.bar, {[key]: color});
                    }
                    if (index == 1) {
                        Object.assign(this.pageData.plug.step_4.progress.textColor, {[key]: color});
                    }
                }
                if (type == 4) {
                    Object.assign(this.step_4.initData.setBtnColor[index], {color: color});
                    Object.assign(this.pageData.plug.step_4.setBtn.style, {[key]: color});
                }
                this.$store.commit("updateActivitySource", [Object.assign({}, this.pageData), insetHistoryState])
            },
            // 是否加粗
            isBold() {
                let obj = this.pageData.plug.step_4;
                if (this.step_4.initData.isNameBold) {
                    Object.assign(obj.name.style, {fontWeight: 'normal'});
                    Object.assign(obj.initData, {isNameBold: false});
                } else {
                    Object.assign(obj.name.style, {fontWeight: 'bold'});
                    Object.assign(obj.initData, {isNameBold: true});
                }
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },
            // 选择尺寸
            selectSize(index) {
                let obj = this.pageData.plug.step_4;
                let size = this.setSize.list[index].type;
                Object.assign(obj.countTime, {sizeType: size});
                Object.assign(obj.countTime, {sizeIndex: index});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },

            // 选择图片容器
            selectBg(index) {
                let url = this.defaultImg_1[index].url.split('?')[0];
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.step_4, {setBgImg: obj});
                Object.assign(this.pageData.plug.step_4.initData, {selectBgIndex: index});
                this.$store.commit("updateActivitySource", JSON.parse(JSON.stringify(Object.assign({}, this.pageData))));
            },
            selectCardBg(index) {
                let url = this.defaultImg_2[index].url.split('?')[0];
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.step_4, {setCardBg: obj});
                Object.assign(this.pageData.plug.step_4.initData, {selectCardBgIndex: index});
                this.$store.commit("updateActivitySource", JSON.parse(JSON.stringify(Object.assign({}, this.pageData))));
            },
            // 下拉选择
            changeSelect(data, index) {
                let obj = this.pageData.plug.step_4;
                Object.assign(this.pageData.plug.step_4.initData, {nameListIndex: index});
                Object.assign(obj.name.style, {fontSize: data.style.fontSize, textAlign: data.style.textAlign});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
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

    }
</script>

<style scoped>
    .e-select {
        width: 162px;
    }

    .plug-style-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
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


    .set-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .set-size-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .set-name {
        font-size: 14px;
        color: #333333;
        margin-right: 10px;
    }

    .set-size-wrap .set-size:last-child {
        margin-right: 0;
    }

    .set-size {
        width: 50px;
        height: 24px;
        color: #333333;
        font-size: 14px;
        border-radius: 2px;
        border: 1px solid #CCCCCC;
        box-sizing: border-box;
        position: relative;
        background: #FFFFFF;
        display: flex;
        margin-right: 10px;
        cursor: pointer;
        justify-content: center;
        align-items: center;
    }

    .setting-item-wrap > .setting-item {
        margin-bottom: 0;
    }

    .pdt-20 {
        padding-top: 20px;
    }

    .selected {
        border-color: #8A7CCF;
    }

    .setting-item-wrap > .color-sketch-fixed {
        top: 25px;
    }
</style>
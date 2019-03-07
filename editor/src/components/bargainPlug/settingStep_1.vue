<template>
    <div class="e-setting">
        <div class="e-setting-title">弹窗-我要发起砍价</div>
        <div class="e-setting-scroll">
            <div class="e-setting-content bg-setting-container">
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">弹窗底图</span>
                    </div>
                    <div class="creat-active-img-wrap">
                        <div class="img-wrap-select-wrap">
                            <div v-for="(item,index) in defaultImg_1" :class="step_1.initData.toastImg.index==index?'selected':''"
                                 class="img-wrap-select"
                                 @click="selectBg(index)">
                                <img :src="item.url" alt="">
                                <div v-if="step_1.initData.toastImg.index==index" class="selected-icon">
                                    <img src="@/assets/img/icon-plug-selected.png" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="cell">
                            <label class="handle-btn">
                                <BaseUploadImg class="handel-btn" accept="image/jpeg,image/png" type="4"
                                            @change="inputChangeBg">上传自定义图片
                                </BaseUploadImg>
                            </label>
                        </div>
                        <div class="cell text-center"><span class="creat-active-hint">最佳尺寸：690*680</span></div>
                    </div>
                </section>
                <section class="setting-panel">
                    <div class="setting-head" style="justify-content: space-between">
                        <span class="setting-title">头图</span>
                        <div class="checkbox-wrap">
                            <label class="custom-checkbox" for="is-show-headImg">
                                <span class="check-name">不显示</span>
                                <input id="is-show-headImg" v-model="!step_1.isShowHeadBg" @click="headCheck(step_1.isShowHeadBg)" type="checkbox">
                                <i></i>
                            </label>
                        </div>
                    </div>
                    <div class="creat-active-img-wrap">
                        <div class="img-wrap-select-wrap">
                            <div v-for="(item,index) in defaultImg_2" :class="step_1.initData.headImg.index==index?'selected':''"
                                 class="img-wrap-select"
                                 @click="selectHead(index)">
                                <img :src="item.url" alt="">
                                <div v-if="step_1.initData.headImg.index==index" class="selected-icon">
                                    <img src="@/assets/img/icon-plug-selected.png" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="cell">
                            <label class="handle-btn">
                                <BaseUploadImg class="handel-btn" accept="image/jpeg,image/png" type="5"
                                            @change="inputChangeHead">上传自定义图片
                                </BaseUploadImg>
                            </label>
                        </div>
                        <div class="cell text-center"><span class="creat-active-hint">最佳尺寸：690*300</span></div>
                    </div>
                </section>
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">文字样式</span>
                    </div>
                    <div class="section-head-desc">版式</div>
                    <div class="creat-active-img-wrap ">
                        <div class="img-wrap-select-wrap format">
                            <div :class="step_1.formatType==1?'selected':''" class="img-wrap-select"
                                 @click="setFormatType(1)">
                                <img src="@/assets/img/settingStep_1_1.png" alt="">
                                <div v-if="step_1.formatType.index==1" class="selected-icon">
                                    <img src="@/assets/img/icon-plug-selected.png" alt="">
                                </div>
                            </div>
                            <div :class="step_1.formatType==2?'selected':''" class="img-wrap-select"
                                 @click="setFormatType(2)">
                                <img src="@/assets/img/settingStep_1_2.png" alt="">
                                <div v-if="step_1.formatType==2" class="selected-icon">
                                    <img src="@/assets/img/icon-plug-selected.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section-head-desc">颜色</div>
                    <div class="btn-setting-model">
                        <div class="setting-item-wrap">
                            <div class="setting-item" v-for="(item,index) in step_1.initData.setColor" :key="index">
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
                    </div>
                </section>
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">按钮</span>
                    </div>
                    <div class="btn-setting-model">
                        <div class="setting-item-wrap">
                            <div class="setting-item" style="margin-bottom: 0" v-for="(item,index) in step_1.initData.setBtn" :key="index">
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
                sketchColor: {},//颜色拾取
                showSketchState: 0,//是否显示拾色器
                selectState: false,
                sketchEditStatus:false,
                defaultImg_1: [
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/confirm_bg_1.jpg?imageView2/1/w/140/h/70'
                    },
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/confirm_bg_2.jpg?imageView2/1/w/140/h/70'
                    },

                ],
                defaultImg_2: [
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/confirm_pic_1.jpg?imageView2/1/w/140/h/70'
                    },
                    {
                        url: 'http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/confirm_pic_2.jpg?imageView2/1/w/140/h/70'
                    },

                ],

            }
        },
        computed: {
            step_1(){
                return this.pageData.plug.step_1;
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
                let index = this.showSketchState == 1 ? this.checked : this.showSketchState == 2 ? this.checked + 3 : '';
                if (this.showSketchState != 0 && e.target != this.$refs['colorCellImg'][index]) {
                    this.showSketchState = 0
                }
            })
        },
        methods: {
            // 是否显示头图
            headCheck(type) {
                Object.assign(this.pageData.plug.step_1, {isShowHeadBg: !type});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },
            // 选择图片容器
            selectBg(index) {
                let url = this.defaultImg_1[index].url.split('?')[0];
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.step_1, {setBgImg: obj});
                Object.assign(this.pageData.plug.step_1.initData.toastImg, {index: index});
                this.$store.commit("updateActivitySource", JSON.parse(JSON.stringify(Object.assign({}, this.pageData))));
            },
            selectHead(index) {
                let url = this.defaultImg_2[index].url.split('?')[0];
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.step_1, {setHeadImg: obj});
                Object.assign(this.pageData.plug.step_1.initData.headImg, {index: index});
                this.$store.commit("updateActivitySource", JSON.parse(JSON.stringify(Object.assign({}, this.pageData))));
            },
            // 上传图片
            inputChangeBg({url}) {
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.step_1.initData.toastImg, {index: -1});
                Object.assign(this.pageData.plug.step_1, {setBgImg: obj});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));
            },
            inputChangeHead({url}) {
                let obj = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: '100% auto',
                    backgroundRepeat: 'no-repeat'
                };
                Object.assign(this.pageData.plug.step_1.initData.headImg, {index: -1});
                Object.assign(this.pageData.plug.step_1, {setHeadImg: obj});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData));

            },
            // 设置版式
            setFormatType(index) {
                Object.assign(this.pageData.plug.step_1, {formatType: index});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },
            // 设置颜色
            setBtn(type, key, index) {
                this.checked = index;
                this.showSketchState = type;
                this.keyName = key;
            },
            setBgColor(color,insetHistoryState) {
                let key = this.keyName, type = this.showSketchState, index = this.checked;
                if (type == 1) {
                    Object.assign(this.step_1.initData.setColor[index], {color: color});
                    Object.assign(this.pageData.plug.step_1.setName, {[key]: color});
                }
                if (type == 2) {
                    Object.assign(this.step_1.initData.setBtn[index], {color: color});
                    Object.assign(this.pageData.plug.step_1.setBtn, {[key]: color});
                }
                this.$store.commit("updateActivitySource", [Object.assign({}, this.pageData), insetHistoryState])
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

<style scoped type="text/css" lang="less">
    .section-head-desc {
        color: #999999;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .format {
        margin-top: -10px;
        margin-bottom: 20px;

        & > .img-wrap-select {
            height: 120px;
        }
    }

    .checkbox-wrap {
        display: flex;
        align-items: center;
        color: #333333;
        font-size: 14px;
    }

    .check-name {
        margin-right: 5px;
    }
</style>
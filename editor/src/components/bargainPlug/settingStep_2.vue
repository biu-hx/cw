<template>
    <div class="e-setting">
        <div class="e-setting-title">我已开启砍价</div>
        <div class="e-setting-scroll">
            <div class="e-setting-content bg-setting-container">
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">悬浮条</span>
                    </div>
                    <div class="fixed-row-wrap">
                        <div class="fixed-row" :class="step_2.formatType==i?'selected':''" v-for="i in 2"
                             @click="selected(i)">
                            <img :src="format.defaultStyle[i-1]" alt="">
                            <div v-if="step_2.formatType==i" class="selected-icon">
                                <img src="@/assets/img/icon-plug-selected.png" alt="">
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
                            <div class="setting-item" v-for="(item,index) in rightSetting" :key="index">
                                <span class="setting-name">{{item.name}}</span>
                                <span class="color-cell" :style="{backgroundColor: item.color}" ref="colorCellImg"
                                      @click="setBtn(index,item.keyName)"></span>
                            </div>
                            <div class="color-sketch-fixed" v-if="showSketchState==1" @click.stop>
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
    import {Sketch} from 'vue-color'

    export default {
        data() {
            return {
                checked: '',
                keyName: '',
                activeColor:'#ffffff',
                sketchColor: {},//颜色拾取
                showSketchState: 0,//是否显示拾色器
                sketchEditStatus:false,
                format: {
                    defaultStyle: [
                        require('../../assets/img/plug-fixed-type-1.png'),
                        require('../../assets/img/plug-fixed-type-2.png')
                    ],
                },
                selectState: false,
            }
        },
        props:['rightSetting'],
        computed: {
            step_2(){
                return this.pageData.plug.step_2;
            },
            pageData() {
                let data = this.$store.getters.activePageData;
                return data
            },
        },
        components: {
            Sketch,
        },
        mounted() {
            document.addEventListener("click", (e) => {
                let index = this.checked;
                if (this.showSketchState != 0 && e.target != this.$refs['colorCellImg'][index]) {
                    this.showSketchState = 0
                }
            })
        },
        methods: {
            //设置悬浮条样式
            selected(index) {
                Object.assign(this.pageData.plug.step_2, {formatType: index});
                this.$store.commit("updateActivitySource", Object.assign({}, this.pageData))
            },
            // 设置按钮样式
            setBtn(index, key) {
                this.checked = index;
                this.keyName = key;
                this.showSketchState = 1;
            },
            setBgColor(color,insetHistoryState) {
                let key = this.keyName, index = this.checked;
                Object.assign(this.pageData.plug.rightBtnColor, {[key]: color});
                Object.assign(this.pageData.plug.initData.rightSetting[index], {color: color});
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

<style scoped>
    .fixed-row-wrap .fixed-row:last-child {
        margin-bottom: 0;
    }

    .fixed-row {
        cursor: pointer;
        width: 280px;
        height: 48px;
        overflow: hidden;
        position: relative;
        background: #ffffff;
        box-sizing: border-box;
        border-radius: 2px;
        margin-bottom: 15px;
    }

    .fixed-row img {
        width: 100%;
    }

    .fixed-row.selected {
        background: #DDDDDD;
        border: 2px solid #8A7CCF;
    }

</style>
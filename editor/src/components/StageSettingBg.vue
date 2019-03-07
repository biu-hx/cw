<template>
    <div class="e-setting">
        <div class="e-setting-title">背景</div>
        <div class="e-setting-scroll">
            <div class="e-setting-content bg-setting-container">
                <section class="setting-panel">
                    <div class="setting-panel-head">
                        <span class="setting-title">颜色</span>
                    </div>
                    <div class="color-wrapper">
                        <span v-for="(color,index) in bgColor" :key="index"
                              :class="['color-cell', activeColor === color ? 'color-active': '']"
                              :style="{backgroundColor: color}" @click="setBgColor(color)"></span>
                        <img src="@/assets/img/icon-bitmap.png"
                             class="color-cell" @click="showSketchState = 1" ref="colorCellImg">
                        <div class="color-sketch-fixed" v-show="showSketchState" @click.stop>
                            <sketch v-model="sketchColor" @input="sketchColorInput"
                                    @mouseup.native="sketchColorMouseup"
                                    @mousedown.native="sketchColorMousedown"></sketch>
                        </div>
                    </div>
                </section>

                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">上传图片</span>
                        <div class="setting-content text-right">
                            <div class="tabs-group">
                                <span class="tabs-group-item tabs-item-active" @click="tabMode('cover')">自适应</span>
                                <span class="tabs-group-item disabled">平铺</span>
                                <!--<span class="tabs-group-item" @click="tabMode('repeat')">平铺</span>-->
                            </div>
                        </div>
                    </div>
                    <StageUploadImgBg @change="setBgImg">
                        <div class="img-wrapper" v-if="bgImg.url">
                            <img :src="bgImg.url">
                        </div>
                    </StageUploadImgBg>
                </section>

                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">纹理选择</span>
                    </div>
                    <ol class="texture-wrapper">
                        <li v-for="(item,index) in textureList" :key="index"
                            :class="[{'texture--active': activeTexture === item.id && active === 2}]">
                            <img class="texture--active__bgimg" :src="item.url" @click="setBgTexture(item)">
                            <img class="texture--active__checkimg" src="@/assets/img/icon-bg-texture.active.png">
                        </li>
                    </ol>
                </section>

                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">透明度</span>
                    </div>
                    <BaseSlider v-model="sliderValue" @change="sliderChange"/>
                </section>

                <section class="setting-footer text-center">
                    <!--<button class=" setting-bg-btn" @click="setStyleApplyToAll">应用于所有页面</button>-->
                    <button class="e-btn e-btn--primary e-btn__setting-bg is-round" @click="setStyleApplyToAll">
                        应用于所有页面
                    </button>
                </section>

            </div>
        </div>
    </div>
</template>

<script>
    import BaseSlider from './BaseSlider'
    import StageUploadImgBg from './StageUploadImgBg'

    import {Sketch} from 'vue-color'

    export default {
        data () {
            return {
                active: 1,
                activeColor: '#FFFFFF',
                activeTexture: '',

                bgColor: ['#FFFFFF', "#EEEEEE", "#D2FFD9", "#DAE8FF", "#FFC9C9", "#FFECB1", "#FFCF34", "#FF7E37", "#967ADD", "#5895F8", "#284272"],
                textureList: [{
                    id: "texture1",
                    url: "http://cewan-1256356146.piccd.myqcloud.com/pro/editor/bg/texture_1.png"
                }, {
                    id: 'texture2',
                    url: "http://cewan-1256356146.piccd.myqcloud.com/pro/editor/bg/texture_2.png"
                }],

                sliderValue: 0,
                sketchColor: {},
                showSketchState: 0,

                sketchEditStatus: false
            }
        },
        methods: {
            setBgColor (color, insetHistoryState) {
                this.activeColor = color
                Object.assign(this.pageData.bg.style, {backgroundColor: color})
                this.setBg(insetHistoryState)
            },
            setBgImg (url) {
                this.active = 1
                Object.assign(this.pageData.bg.img, {url})
                this.tabMode()
            },
            setBgTexture (data) {
                this.active = 2
                this.activeTexture = data.id
                Object.assign(this.pageData.bg.texture, {
                    id: data.id,
                    url: data.url,
                    style: {
                        backgroundSize: "auto",
                        backgroundRepeat: 'repeat'
                    }
                })
                this.setBg()
            },

            tabMode (type) {
                if (type == "repeat") {
                    Object.assign(this.pageData.bg.img.style, {
                        // backgroundSize: "auto",
                        // backgroundPosition: "unset"
                    })
                } else {
                    // type == 'cover'
                    Object.assign(this.pageData.bg.img.style, {
                        backgroundSize: "100% auto",
                        backgroundPosition: "top left",
                        backgroundRepeat: 'no-repeat'
                    })
                }
                this.setBg()
            },

            sliderChange (type) {
                Object.assign(this.pageData.bg.style, {opacity: this.sliderValue})
                this.setBg(['up', 'input'].includes(type) ? 'inset' : 'pause')
            },

            setStyleApplyToAll () {
                this.$confirm("所有页面都会使用此背景，可以吗?").then(() => {
                    let data = JSON.stringify(this.pageData.bg)
                    this.activitySource.bg = JSON.parse(data)
                    this.activitySource.pages = this.activitySource.pages.map(item => (item.bg = JSON.parse(data), item))
                    this.$store.commit("activitySource", this.activitySource)
                    this.$store.commit("insetHistory")
                })
            },

            setBg (insetHistoryState) {
                this.pageData.bg.type = this.active
                this.$store.commit("updateActivitySource", [Object.assign({}, this.pageData), insetHistoryState])
            },

            sketchColorMousedown () {
                this.sketchEditStatus = true
            },
            sketchColorMouseup () {
                this.sketchEditStatus = false
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

            init () {
                this.active = this.pageData.bg.type;
                this.activeTexture = this.pageData.bg.texture.id;
                this.activeColor = this.pageData.bg.style.backgroundColor || "#FFFFFF";
                this.sketchColor = this.activeColor || {}
                this.sliderValue = (this.pageData.bg.style.opacity || 0)
            },
        },
        components: {
            BaseSlider,
            StageUploadImgBg,
            Sketch
        },
        computed: {
            activitySource () {
                return this.$store.state.activitySource
            },
            pageData () {
                let data = this.$store.getters.activePageData;
                return data
            },
            bgImg () {
                return this.pageData.bg.img || {}
            }
        },
        mounted () {
            this.init()
            document.addEventListener("click", (e) => {
                if (this.showSketchState && e.target != this.$refs['colorCellImg']) {
                    this.showSketchState = 0
                }
            })
        },
        watch: {
            "pageData" () {
                this.init()
            }
        }
    }
</script>

<style type="text/less" lang="less">
    .color-wrapper {
        position: relative;
        margin: 15px -5px -5px;
        & > .color-cell {
            display: inline-block;
            margin: 5px 4px;
            width: 40px;
            height: 40px;
            line-height: 1;
            font-size: 0;
            border-radius: 50%;
            border: 1px solid #CCC;
            background: #fff;
            vertical-align: top;
            cursor: pointer;
            &.color-active {
                background: url("../assets/img/icon-bg-color.active.png") no-repeat center bottom;
                border-color: #8A7CCF;
                box-shadow: 0 0 0 1px #8A7CCF;
            }
        }
    }

    .color-sketch-fixed {
        position: absolute;
        top: 95px;
        right: 0;
        z-index: 2;
    }

    .texture-wrapper {
        margin: 0 -5px;
        white-space: nowrap;
        & > li {
            position: relative;
            display: inline-block;
            margin: 0 4px;
            width: 40px;
            height: 40px;
            border-radius: 4px;
            box-shadow: 0 0 0 1px rgba(221, 221, 221, 1) inset;
            cursor: pointer;
            &.texture--active {
                box-shadow: 0 0 0 2px #967ADD inset;
                .texture--active__checkimg {
                    display: block;
                }
            }
            .texture--active__bgimg {
                width: 40px;
                height: 40px;
            }
            .texture--active__checkimg {
                display: none;
                position: absolute;
                right: 2px;
                bottom: 2px;
                width: 22px;
                height: 18px;
            }
        }
    }

    .img-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 0;
        & > img {
            flex: 0 0 auto;
            max-width: 100%;
            max-height: 100%;
        }
    }

    .setting-footer {

    }

    .e-btn__setting-bg {
        margin: 105px 0 60px;
        width: 220px;
        height: 40px;
    }
</style>
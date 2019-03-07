<template>
    <div class="slider-container">
        <div class="slider-bar" ref="sliderBar" @click="onSliderBar">
            <!--<div class="slider-bar-active" :style="{width: left+'px'}"></div>-->
            <div class="slider-thumb" :style="{left: left+'px'}" @mousedown="onMousedown" @mouseup="omMouseup"
                 @click.stop></div>
        </div>

        <input type="text" ref="sliderInput" v-model="inputValue" class="slider-input" v-show="showInput"
               @blur="inputChange" @keyup.enter="inputChange">
        <span class="slider-input" @click="onShowInput(1)" v-show="!showInput">{{value}}%</span>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                active: false,
                showInput: false,

                left: 0,
                top: 0,

                width: 0,
                height: 2,

                minWidth: 0,
                minHeight: 0,

                maxWidth: 0,
                maxHeight: 0,

                inputValue: 0,

                $dom: ''
            }
        },
        props: {
            value: {
                type: Number,
                default: 0
            },

            // move, input, up, down
            occasion: {
                type: [String, Array],
                default () {
                    return ['move', 'up', 'input']
                }
            },

            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            }
        },
        computed: {
            computedOccasion () {
                return Array.isArray(this.occasion) ? this.occasion : [this.occasion]
            }
        },
        methods: {
            init () {
                this.left = this.value / 100 * this.width
                this.maxWidth = this.width * (this.max / 100)
                this.minWidth = this.width * (this.min / 100)
                this.inputValue = this.value
            },

            onShowInput (data = false) {
                this.showInput = data
                if (data) {
                    setTimeout(() => {
                        this.$refs["sliderInput"].focus()
                    })
                }
            },

            onSliderBar (e) {
                this.left = Math.min(Math.max(e.offsetX, this.minWidth), this.maxWidth);
                this.$input(Number((this.left / this.width).toFixed(2)) * 100, "input")
            },

            omMouseup () {
                this.active = false
                this.$dom.removeEventListener("mousemove", this.onMousemove)
                this.$dom.removeEventListener("mouseup", this.omMouseup)
                this.emit("up")
            },
            onMousedown () {
                this.active = true
                this.$dom.addEventListener("mousemove", this.onMousemove)
                this.$dom.addEventListener("mouseup", this.omMouseup)
                this.emit("down")
            },
            onMousemove (e) {
                if (this.active) {
                    this.left = Math.min(Math.max(this.left + e.movementX, this.minWidth), this.maxWidth);
                    this.$input(Number((this.left / this.width).toFixed(2)) * 100, 'move')
                }
            },
            inputChange () {
                let value = Number.parseInt(this.inputValue)
                this.onShowInput()
                if (!Number.isNaN(value) && value >= 0 && value <= 100) {
                    this.left = this.width * (value / 100)
                    this.$input(this.inputValue, "input")
                } else {
                    this.inputValue = this.value
                }
            },

            emit (occasion) {
                if (this.computedOccasion.includes(occasion)) {
                    this.$emit("change", occasion)
                }
            },
            $input (data, occasion) {
                this.$emit("input", Number.parseInt(data))
                this.emit(occasion)
            }
        },
        mounted () {
            let $sliderBar = this.$refs['sliderBar']
            this.$dom = document
            this.width = $sliderBar.clientWidth
            this.height = $sliderBar.clientHeight

            this.init()
        },
        watch: {
            "value" () {
                this.init()
            }
        }
    }
</script>

<style type="text/less" lang="less">

    .slider-container {
        position: relative;
        display: flex;
        align-items: center;
        max-width: 100%;
        /*overflow: hidden;*/
        & > .slider-bar {
            flex: 1 1 auto;
            position: relative;
            margin: 20px auto;
            height: 4px;
            border-radius: 10px;
            border: 1px solid rgba(221, 221, 221, 1);
            background: linear-gradient(270deg, rgba(148, 124, 246, 0) 0%, rgba(148, 124, 246, 1) 100%);
            cursor: pointer;
            & > .slider-bar-active {
                position: absolute;
                top: 0;
                left: 0;
                height: 2px;
                background: #9380F2;
            }
            & > .slider-thumb {
                position: absolute;
                top: -5px;
                margin-left: -5px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 1);
                box-shadow: 1px 1px 2px 0px rgba(109, 109, 109, 0.5);
                border: 1px solid rgba(150, 129, 233, 1);
            }
        }

        & > .slider-input {
            flex: 0 0 auto;
            margin-left: 6px;
            width: 50px;
            height: 30px;
            line-height: 30px;
            color: rgba(51, 51, 51, 1);
            text-align: center;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
            border: 1px solid rgba(221, 221, 221, 1);
        }
    }
</style>
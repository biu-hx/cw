<template>
    <draggable-resizable
            :active.sync="active"
            :w="currentStyle.width" :h="currentStyle.height"
            :x="currentStyle.left"
            :y="currentStyle.top"
            :minw="1" :minh="1"
            @activated="onActivate"
            @deactivated="onDeactivate"
            @resizing="onResize"
            @resizestop="onRresizestop"
            @dragging="onDrag"
            @dragstop="onDragstop"
            @dblclick.native="onDblclick" :style="{zIndex: active ? 100 : 'auto'}">
        <img :src="source.url" class="canvas-img" v-show="source.url"
             :style="{width: currentStyle.width+'px',height: currentStyle.height+'px', cursor: active ? 'move' : 'text'}"
             @mousemove.prevent/>
        <BaseUploadImg @change="inputChange" type="2" class="canvas-input-file" ref="input"/>
    </draggable-resizable>
</template>

<script>
    import BaseUploadImg from './BaseUploadImg'
    import draggableResizable from 'vue-draggable-resizable'

    export default {
        data () {
            return {
                active: false,

                croppa: true,
                myCroppa: {}
            }
        },
        props: ['source', "index", "alt"],
        methods: {
            onActivate () {
                this.$store.commit("activeCompData", this.source)
                this.$store.commit("settingCompBlockType", 2)
            },
            onDeactivate () {
                this.active = true
            },
            onResize (left, top, width, height) {
                let {left: _left, top: _top, width: _width, height: _height} = this.currentStyle
                if (left != _left || top != _top || width != _width || height != _height) {
                    this.currentStyle.top = top
                    this.currentStyle.left = left
                    this.currentStyle.width = width
                    this.currentStyle.height = height
                    this.currentStyle.state = 1
                }
            },
            onRresizestop (top, left, width, height) {
                if (this.currentStyle.state > 0) {
                    this.currentStyle.width = width
                    this.currentStyle.height = height
                    this.currentStyle.state = 0
                    this.emit({style: this.currentStyle})
                }
            },
            onDrag (left, top) {
                let {left: _left, top: _top} = this.currentStyle
                if (left != _left || top != _top) {
                    this.currentStyle.left = left
                    this.currentStyle.top = top
                    this.currentStyle.state = 1
                }
            },
            onDragstop (left, top) {
                if (this.currentStyle.state > 0) {
                    this.currentStyle.left = left
                    this.currentStyle.top = top
                    this.currentStyle.state = 0
                    this.emit({style: this.currentStyle})
                }
            },

            onDblclick () {
                this.$refs["input"].arouse()
            },
            inputChange ({url}) {
                this.emit({url})
            },
            emit (data) {
                data = Object.assign(this.source, data, {timestamp: window.createdTimeStamp()})
                this.activePageData.imgs[this.index] = data
                this.$store.commit("updateActivitySource", this.activePageData)
                this.$store.commit("activeCompData", data)
                this.$store.commit("settingCompBlockType", 2)
            }
        },
        components: {
            BaseUploadImg,
            draggableResizable
        },
        computed: {
            activePageData () {
                return this.$store.getters.activePageData
            },
            settingCompBlockType () {
                return this.$store.state.settingCompBlockType
            },
            timestamp () {
                return this.source.timestamp + Date.parse(new Date()) + Math.random()
            },
            currentStyle () {
                return this.source.style
            }
        },
        created () {
            if (this.settingCompBlockType) {
                this.active = true
            }
        }
    }
</script>

<style type="text/less" lang="less">
    .canvas-img {
        user-select: unset;
    }

    .canvas-input-file {
        position: fixed;
        top: -10px;
        left: -10px;
        width: 0;
        height: 0;
        opacity: 0;
        z-index: -1;
        user-select: unset;
    }

    .canvas-img-handel {
        position: absolute;
        right: 0;
        bottom: 20px;
        padding: 0 7px;
        height: 20px;
        background: red;
    }

    .croppa-container {
        border: 1px dashed blue;
        .icon-remove {
            position: absolute;
        }
    }


</style>
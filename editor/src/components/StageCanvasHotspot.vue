<template>
    <draggable-resizable
            :active.sync="active"
            :w="currentStyle.width"
            :h="currentStyle.height"
            :x="currentStyle.left"
            :y="currentStyle.top"
            :minw="1" :minh="1"
            :key="timestamp"
            @activated="onActivate"
            @deactivated="onDeactivate"
            @resizing="onResize"
            @resizestop="onRresizestop"
            @dragging="onDrag"
            @dragstop="onDragstop">
        <div class="canvas-hota"
             :style="{width: currentStyle.width+'px',height: currentStyle.height+'px', cursor: active ? 'move' : 'text'}"
             @mousemove="onMouseHandle"></div>
    </draggable-resizable>
</template>

<script>
    import draggableResizable from 'vue-draggable-resizable'

    export default {
        data () {
            return {
                active: false,
                // currentStyle: {},

                croppa: true,
                myCroppa: {}
            }
        },
        props: ['source', "index"],
        methods: {
            onActivate () {
                this.$store.commit("activeCompData", this.source)
                this.$store.commit("settingCompBlockType", 3)
            },
            onDeactivate () {
                this.active = true
            },
            onResize (left, top, width, height) {
                this.currentStyle.width = width || 0
                this.currentStyle.height = height || 0

                this.currentStyle.top = top
                this.currentStyle.left = left

                // this.currentStyle.width = width
                // this.currentStyle.height = height
            },
            onRresizestop (top, left, width, height) {
                this.currentStyle.width = width || 0
                this.currentStyle.height = height || 0
                this.emit({style: this.currentStyle})
            },
            onDrag (left, top) {
                this.currentStyle.left = left || 0
                this.currentStyle.top = top || 0
            },
            onDragstop (left, top) {
                this.currentStyle.left = left || 0
                this.currentStyle.top = top || 0
                this.emit({style: this.currentStyle})
            },
            onDelete () {
                document.onkeyup = (e) => {
                    if (e.key == 'Delete') {
                        this.$store.commit("deleteHotspot", {index: this.index})
                        document.onkeyup = ''
                    }
                }
            },

            emit (data) {
                data = Object.assign({}, this.source, data)
                this.activePageData.hotspot[this.index] = JSON.parse(JSON.stringify(data))
                this.$store.commit("updateActivitySource", Object.assign({}, this.activePageData))
                this.$store.commit("activeCompData", data)
                this.$store.commit("settingCompBlockType", 3)
            },
            onMouseHandle (e) {
                e.preventDefault()
            }
        },
        components: {
            draggableResizable
        },
        computed: {
            activePageData () {
                return this.$store.getters.activePageData
            },
            settingCompBlockType () {
                return this.$store.state.settingCompBlockType
            },
            currentStyle () {
                return this.source.style
            },
            timestamp () {
                return this.source.timestamp + Date.parse(new Date()) + Math.random()
            }
        },
        created () {
            if (this.settingCompBlockType === 3) {
                this.active = true
            }

        },
        destroyed () {
            document.onkeyup = ''
        }
    }
</script>

<style type="text/less" lang="less">
    .canvas-hota {
        user-select: unset;
        background: rgba(236, 76, 41, 0.6);
        border-radius: 2px;
        border: 1px solid #EC4C29;
    }
</style>
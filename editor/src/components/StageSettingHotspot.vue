<template>
    <div class="e-setting">
        <div class="e-setting-title">
            <span>热区</span>
            <div class="created-img" @click="onCreated">+</div>
        </div>
        <div class="e-setting-scroll">
            <div class="e-setting-content">
                <section class="setting-panel">
                    <div class="setting-head">
                        <span class="setting-title">{{activeCompData.name}}</span>
                        <div class="setting-content text-right">
                            <img src="@/assets/img/icon-delete.png" class="icon icon-delete hover-pointer"
                                 @click="onDelete">
                        </div>
                    </div>

                    <div class="hota-event-wrapper">
                        <div class="event-label">点击事件</div>

                        <div class="event-select e-select">
                            <div class="e-select-input" @click.stop="selectState=true">
                                <input type="text" readonly :value="eventModelList[actionsType-1].name">
                                <img src="@/assets/img/icon-arrow-bottom.png" class="icon-arrow-bottom">
                            </div>
                            <ol class="e-select-menu" v-show="selectState">
                                <li class="e-select-item" v-for="(item,index) in eventModelList" :key="index"
                                    @click="changeSelect(item)">
                                    {{item.name}}
                                </li>
                            </ol>
                        </div>

                        <template v-if="actionsType == 1">
                            <div class="event-label">第</div>
                            <input type="number" class="event-input"
                                   v-model.number="toNextPageIndex"
                                   @blur="inputBlurIndex">
                            <div class="event-label">屏</div>
                        </template>

                        <template v-if="actionsType == 2">
                            <!--<input type="text" class="event-input event-input-url" v-model="toNextPageUrl"-->
                            <!--@blur="inputBlurUrl">-->

                            <input type="text" class="event-input event-input-url" readonly
                                   v-model="toNextPageSceneText">
                        </template>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    let eventModelList = [{
        name: '本页跳转',
        value: 1
    }]

    //     , {
    //     name: '外部跳转',
    //     value: 2
    // }

    export default {
        data () {
            return {
                eventModelList: eventModelList,
                selectState: false,

                toNextPageIndex: 1,
                toNextPageScene: 1001,
                toNextPageSceneText: "详情",

                maxPage: 1,
                minPage: 1
            }
        },
        methods: {
            onCreated () {
                this.$store.commit("createdHotspot")
            },

            onDelete () {
                let index = this.pageData.hotspot.findIndex(item => this.activeCompData.index === item.index)
                this.$store.commit("deleteHotspot", {index})
            },

            inputBlurIndex () {
                if (this.toNextPageIndex < this.minPage || this.toNextPageIndex > this.maxPage) {
                    this.$toast("页码不正确！")
                    this.toNextPageIndex = 1
                } else {
                    this.setData({
                        action: {
                            type: 1,
                            index: this.toNextPageIndex
                        }
                    })
                }
            },

            inputBlurUrl () {
                this.setData({
                    action: {
                        type: 2,
                        scene: this.toNextPageScene
                    }
                })
            },

            changeSelect (data) {
                this.setData({
                    action: {
                        type: data.value,
                        index: this.toNextPageIndex,
                        // scene: this.toNextPageScene || 1001
                    }
                })
            },

            setData (data) {
                let index = this.pageData.hotspot.findIndex(item => this.activeCompData.index === item.index)
                let activeCompData = Object.assign({}, this.activeCompData, data)
                activeCompData["timestamp"] = window.createdTimeStamp()
                this.pageData.hotspot[index] = activeCompData;
                this.$store.commit("updateActivitySource", this.pageData)
                this.$store.commit("activeCompData", activeCompData)
            },

            init () {
                let action = this.activeCompData.action || {}
                this.toNextPageIndex = action.index
                this.toNextPageScene = action.scene
                this.maxPage = this.$store.state.activitySource.pages.length
            },

            deleteCompKeyEvent ({key}) {
                if (key == 'Delete') {
                    this.onDelete()
                }
            }
        },
        components: {},
        computed: {
            pageData () {
                return this.$store.getters.activePageData;
            },
            activeCompData () {
                return this.$store.state.activeCompData || {}
            },
            actionsType () {
                return (this.activeCompData.action || {}).type
            }
        },
        mounted () {
            document.addEventListener("click", () => {
                this.selectState = false
            })
            document.addEventListener("keyup", this.deleteCompKeyEvent)
            this.init()
        },

        destroyed(){
            document.removeEventListener("keyup", this.deleteCompKeyEvent)
        },

        watch: {
            "activeCompData" () {
                this.init()
            }
        }
    }
</script>

<style type="text/less" lang="less">
    .created-img {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: #9380F2;
        border-radius: 4px;
        border: 1px solid rgba(147, 128, 242, 1);
    }

    .hota-event-wrapper {
        display: flex;
        align-items: center;
        .event-label {
            flex: 0 0 auto;
        }
        .event-select {
            flex: 0 0 auto;
            margin-left: 10px;
            margin-right: 20px;
            width: 100px;
        }

        .event-input {
            margin-left: 5px;
            margin-right: 15px;
            height: 34px;
            width: 44px;
            text-align: center;
            border: 1px solid rgba(204, 204, 204, 1);
            &.event-input-url {
                margin: 0;
                width: 100px;
            }
        }

        .event-select,
        .event-input {
            border-radius: 2px;
        }

    }

</style>

<style lang="less" scoped>
    .icon-delete {
        width: 23px;
    }
</style>
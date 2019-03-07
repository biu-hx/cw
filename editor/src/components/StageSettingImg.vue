<template>
    <div class="e-setting">
        <div class="e-setting-title">
            <span>图片</span>
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
                    <div class="img-screen">
                        <img :src="activeCompData.url">
                    </div>

                    <div class="img-screen-handel">
                        <div class="cell">
                            <BaseUploadImg class="handel-btn" type="2" @change="inputChange">更换图片</BaseUploadImg>
                        </div>
                        <div class="cell">
                            <button class="handel-btn">裁切</button>
                        </div>
                    </div>

                    <!--<div class="img-input-group">-->
                    <!--<span class="name">图片链接</span>-->
                    <!--<input type="text" v-model="inputValue" class="input" @blur="blur">-->
                    <!--</div>-->
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import BaseUploadImg from './BaseUploadImg'

    export default {
        data () {
            return {
                inputValue: ''
            }
        },
        methods: {

            onCreated () {
                this.$store.commit("createdImg")
            },

            onDelete () {
                let index = this.pageData.imgs.findIndex(item => this.activeCompData.index == item.index)
                this.$store.commit("deleteImg", {index})
            },

            blur () {
                this.setImg({
                    action: [{
                        event: 'click',
                        actions: 'navigateTo',
                        value: this.inputValue
                    }]
                })
            },

            inputChange ({url}) {
                this.setImg({url})
            },

            setImg (data) {
                let index = this.pageData.imgs.findIndex(item => this.activeCompData.index === item.index)
                let activeCompData = Object.assign({}, this.activeCompData, data)

                activeCompData["timestamp"] = window.createdTimeStamp()
                this.pageData.imgs[index] = activeCompData
                this.$store.commit("updateActivitySource", this.pageData)
                this.$store.commit("activeCompData", activeCompData)
            },

            deleteCompKeyEvent ({key}) {
                if (key == 'Delete') {
                    this.onDelete()
                }
            }
        },
        components: {
            BaseUploadImg
        },
        computed: {
            pageData () {
                return this.$store.getters.activePageData;
            },
            activeCompData () {
                return this.$store.state.activeCompData || {}
            },
            action () {
                return this.activeCompData.action || []
            }
        },
        mounted () {
            document.addEventListener("keyup", this.deleteCompKeyEvent)
            this.inputValue = this.action.length > 0 ? this.action[0].value : ''
        },
        destroyed(){
            document.removeEventListener("keyup", this.deleteCompKeyEvent)
        },
        watch: {
            "action" () {
                this.inputValue = this.action.length > 0 ? this.action[0].value : ''
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
        cursor: pointer;
    }

    .img-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 280px;
        height: 180px;
        text-align: center;
        background: #DDD;
        & > img {
            max-width: 100%;
            max-height: 100%;
        }
    }

    .img-screen-handel {
        display: flex;
        align-items: center;
        margin: 20px -7.5px;
        & > .cell {
            flex: 0 0 auto;
            padding: 0 7.5px;
            width: 50%;
        }

        .handel-btn {
            display: block;
            width: 100%;
            height: 34px;
            line-height: 34px;
            text-align: center;
            color: rgba(102, 102, 102, 1);
            background: rgba(244, 244, 244, 1);
            border-radius: 2px;
            border: 1px solid rgba(204, 204, 204, 1);
            cursor: pointer;
        }
    }

    .img-input-group {
        display: flex;
        align-items: center;
        padding: 7px 0;
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        border: 1px solid rgba(221, 221, 221, 1);
        & > .name {
            flex: 0 0 auto;
            padding: 0 10px;
            line-height: 20px;
            color: rgba(102, 102, 102, 1);
            border-right: 1px solid #DDDDDD;
        }
        & > .input {
            flex: 1 1 auto;
            padding: 0 10px;
            color: rgba(51, 51, 51, 1);
            border: none;
        }
    }

</style>

<style lang="less" scoped>
    .icon-delete {
        width: 23px;
    }
</style>
<template>
    <div class="e-aside-template">
        <div class="e-template-header">
            <div class="title">选择使用模版</div>
            <img src="@/assets/img/icon-close.circle.active.png" class="icon-close" width="26px"
                 @click="closeAsideTemplate">
        </div>

        <div class="e-template-content">
            <div class="template-label-wrapper">
                <span :class="['template-label', categoryId ? '': 'active']" @click="getTemplateSource()">全部</span>
                <span :class="['template-label', categoryId === item.id ? 'active': '']"
                      v-for="(item,index) in categorySource" :key="index"
                      @click="getTemplateSource(item.id)">{{item.name}}</span>
            </div>
            <ol class="template-list">
                <li class="template-list-item" v-for="(item,index) in templateSource" :key="index"
                    @click="getTemplateDetail(item)">
                    <div class="template-material">
                        <div class="material-bd">
                            <img :src="item.logo">
                        </div>
                        <div class="material-ft">{{item.name}}</div>
                    </div>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                categorySource: [],
                templateSource: [],

                categoryId: ''
            }
        },
        methods: {
            closeAsideTemplate () {
                this.$store.commit("showAsideTemplate")
            },

            getCategorySource () {
                this.$http.post({
                    url: 'template/category'
                }).then(res => {
                    this.categorySource = res.items || []
                })
            },

            getTemplateSource (id) {
                this.categoryId = id || ''
                this.$http.post({
                    url: 'template/list',
                    data: {
                        parent_id: this.categoryId,
                        child_id: ''
                    }
                }).then(res => {
                    this.templateSource = res.items || []
                })
            },

            getTemplateDetail ({id}) {
                this.$store.dispatch("getTemplateDetail", {id})
            }
        },
        components: {},
        computed: {},
        mounted () {
            this.getCategorySource()
            this.getTemplateSource()
        },
    }
</script>

<style type="text/less" lang="less">
    .e-aside-template {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        overflow: auto;
        background: #FAFAFA;
        z-index: 11;
        & > .e-template-header {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            margin: 0 8px;
            line-height: 56px;
            border-bottom: 1px solid #ddd;
            & > .title {
                flex: 1 1 auto;
                padding-left: 12px;
                color: #333;
                font-size: 16px;
            }
            & > .icon-close {
                flex: 0 0 auto;
                cursor: pointer;
            }
        }

        & > .e-template-content {
            position: relative;
            padding: 20px 10px 0;
            width: 550px;
        }

        .template-label-wrapper {
            display: flex;
            flex-wrap: wrap;
            & > .template-label {
                flex: 0 0 auto;
            }
        }

        .template-label {
            margin-right: 20px;
            line-height: 30px;
            min-width: 70px;
            color: #333;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
            &.active {
                background: rgba(147, 128, 242, .3);
            }
        }
    }

    .template-list {
        display: flex;
        flex-wrap: wrap;
        margin: 10px -5px 0;
        & > .template-list-item {
            position: relative;
            flex: 0 0 auto;
            padding: 10px 15px;
        }

        .template-material {
            width: 150px;
            cursor: pointer;
            border-radius: 6px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 0 3px 0 #ddd;
            & > .material-bd {
                width: 150px;
                height: 214px;
                font-size: 0;
                overflow: hidden;
                img {
                    width: 100%;
                }
            }
            & > .material-ft {
                padding: 0 30px;
                line-height: 37px;
                text-align: center;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }

</style>
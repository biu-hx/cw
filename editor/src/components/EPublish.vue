<template>
    <e-dialog @close="dialogClose">
        <template slot="body">
            <div class="publish-before text-center" v-if="state === 1">
                <div class="publish-title">H5名称</div>

                <div class="publish-input-group">
                    <input type="text" v-model="name" class="publish-input" placeholder="输入名称" maxlength="32"
                           @input="inputBlur">
                </div>

                <div class="publish-btn">
                    <button class="e-btn e-btn-primary is-arc is-block" @click="submit">确定发布</button>
                </div>
            </div>

            <div class="publish-after text-center" v-else>
                <h5 class="publish-title">已生成H5页面</h5>

                <div class="publish-input-group">
                    <span class="publish-input-label publish-text">URL</span>
                    <span class="publish-input">{{url}}</span>
                    <span class="publish-input-label publish-text-link"
                          v-clipboard:copy="url"
                          v-clipboard:success="onClipboardCopy"
                          v-clipboard:error="onClipboardError">复制</span>
                </div>

                <ol class="publish-tips">
                    <li>1、该链接适用环境为小程序</li>
                    <li>2、该链接无法在普通浏览器运行</li>
                </ol>
            </div>

        </template>
    </e-dialog>
</template>

<script>
    let reg = /[^\u4E00-\u9FA5A-Za-z0-9]/g

    export default {
        data () {
            return {
                state: 1,

                name: '',
                url: ''
            }
        },
        methods: {
            inputBlur () {
                this.name = this.name.replace(reg, '')
            },
            submit () {
                if (!this.name) {
                    this.$toast("请输入名称！")
                } else {
                    this.$store.dispatch("publishTemplate", {
                        name: this.name,
                        is_draft: 0
                    }).then(res => {
                        this.url = res.editor.url
                        this.state = 2
                    })
                }
            },

            dialogClose () {
                window.onbeforeunload = ""
                this.$store.commit("updateStoreState", {publishActive: 0})
                if (this.state == 2) {
                    this.$store.dispatch("createActivitySource")
                    window.location.href = process.env.VUE_APP_WEB + '/#/workman'
                }
            },

            onClipboardCopy () {
                this.$toast("复制成功")
            },
            onClipboardError () {
                this.$toast("复制失败")
            }
        },
        computed: {},
        mounted () {
            this.name = this.$store.state.activitySource.name
        },
    }
</script>

<style type="text/less" lang="less">

    .publish-title {
        margin-top: 127px;
        color: #333;
        font-size: 16px;
    }

    .publish-input-group {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 60px;
        & > .publish-input {
            flex: 0 0 auto;
            padding: 0 10px;
            width: 340px;
            line-height: 30px;
            border-radius: 4px 0 0 4px;
        }
        & > .publish-input-label {
            padding: 0 10px;
            flex: 0 0 auto;
        }
    }

    .publish-btn {
        margin: 125px auto 0;
        width: 300px;
    }

    .publish-tips {
        margin: 30px auto 0;
        width: 176px;
        text-align: left;
        & > li {
            color: #333;
            font-size: 12px;
            line-height: 17px;
        }
    }

    .publish-text {
        color: #333;
    }

    .publish-text-link {
        color: #8A7CCF;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
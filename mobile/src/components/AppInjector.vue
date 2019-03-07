<script>
    export default {
        data () {
            return {
                appInjectorRatio: 1
            }
        },

        methods: {
            convertToRem (value) {
                return `${value / 16}rem`
            },

            registerWxJSD (options) {
                // 0 未注册，1 注册成功 2 注册失败  3 正在注册
                this.$store.commit("updateState", {name: "sdkHasLoaded", value: 3})
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: '', // 必填，公众号的唯一标识
                    timestamp: '', // 必填，生成签名的时间戳
                    nonceStr: '', // 必填，生成签名的随机串
                    signature: '',// 必填，签名
                    jsApiList: [] // 必填，需要使用的JS接口列表
                });

                wx.ready(() => {
                    this.$store.commit("updateState", {name: "sdkHasLoaded", value: 1})
                })

                wx.error(function (res) {
                    this.$store.commit("updateState", {name: "sdkHasLoaded", value: 2})
                });
            },

            triggerEvent (scene, params, mode = "navigateTo") {

                let {redirectUrl, unique} = this.appInjectorRoute;
                redirectUrl = redirectUrl || "/pages/cwwebrespview/main"
                params = typeof params === "object" && !Array.isArray(params) ? params : {params}

                params = Object.assign({}, {cwunique: unique, cwscene: scene}, params)

                wx.miniProgram[mode]({
                    url: `${redirectUrl}?${window.ObjectJoin(params)}`
                })
            }
        },
        components: {},
        computed: {
            appInjectorRoute () {
                return this.$route
            }
        },
        mounted () {
        }
    }
</script>

<style type="text/less" lang="less">

</style>
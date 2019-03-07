<template>
    <router-view v-if="runningEnvState"/>
    <div class="tips--error" v-else>
        该地址不能通过该形式打开！
    </div>
</template>

<script>
    export default {
        data () {
            return {
                runningEnv: ''
            }
        },
        props: ["type"],
        computed: {
            env () {
                return this.$store.state.env
            },

            runningEnvState () {
                return this.$route.params.type === "worker" && this.env === "wxminiprogram" || this.$route.params.type !== "worker"
            }
        },
        watch: {
            "runningEnvState" () {
                return this.$store.commit("updateState", {name: "runningEnvState", value: this.runningEnvState})
            }
        },
        mounted () {}
    }
</script>

<style>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html,
    body {
        padding: 0;
        margin: 0 auto;
        height: 100%;
    }

    #app {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    ol,
    ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    #app {
        overflow: hidden;
    }

    .text-left {
        text-align: left;
    }

    .text-center {
        text-align: center;
    }

    .text-right {
        text-align: right;
    }

    button {
        outline: none;
        border: 1px solid;
    }

    .tips--error{
        padding: 50px;
        text-align: center;
    }
</style>

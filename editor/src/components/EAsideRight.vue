<template>
    <div class="e-aside-right">
        <StageSettingBg v-if="settingCompBlockType === 1"/>
        <StageSettingImg v-else-if="settingCompBlockType === 2"/>
        <StageSettingHotspot v-else-if="settingCompBlockType === 3"/>
        <setting-plug @creatActive="creatActive" :isCreated="isCreated" v-if="settingCompBlockType === 4"/>
    </div>
</template>

<script>
    import StageSettingBg from './StageSettingBg'
    import StageSettingImg from './StageSettingImg'
    import StageSettingHotspot from './StageSettingHotspot'

    import settingPlug from './bargainPlug/settingPlug'
    export default {
        data () {
            return {}
        },
        props:['isCreated'],
        methods: {
            creatActive(){
                this.$emit('creatActive')
            }
        },
        components: {
            StageSettingBg,
            StageSettingImg,
            StageSettingHotspot,
            settingPlug
        },
        computed: {
            settingCompBlockType () {
                return this.$store.state.settingCompBlockType
            }
        },
        mounted () {
        },
    }
</script>

<style type="text/less" lang="less">
    .e-aside-right {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background: #F0F0F0;
        z-index: 2;
    }

    .e-setting {
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
        background: #F0F0F0;
        user-select: none;
        & > .e-setting-title {
            position: relative;
            flex: 0 0 auto;
            line-height: 60px;
            text-align: center;
            background: #E5E7E8;
        }

        & > .e-setting-scroll {
            flex: 1 1 auto;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .e-setting-content {
            width: 320px;
        }
    }

    .setting-panel {
        padding: 30px 20px;
        border-bottom: 1px solid #DDD;
        & > .setting-head {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            line-height: 1;
            & > .setting-title {
                flex: 0 0 auto;
                color: #333;
                font-size: 16px;
            }
            & > .setting-content {
                flex: 1 1 auto;
                line-height: 1;
            }
        }
    }

    .hover-pointer {
        cursor: pointer;
    }

</style>
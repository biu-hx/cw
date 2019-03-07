<template>
    <div class="upload-img-container">
        <slot>
            <div class="upload-img-input">
                <div class="input-button">
                    <img src="@/assets/img/icon-add.active.png" class="icon"> <span>上传图片</span>
                </div>
                <div class="input-tips">最佳尺寸:750x1206</div>
            </div>
        </slot>
        <BaseUploadImg class="input-label" accept="image/jpeg,image/png" type="1"
                    @change="inputChange" @progress="inputProgress"/>
    </div>
</template>

<script>
    import BaseUploadImg from './BaseUploadImg'

    export default {
        data () {
            return {}
        },
        methods: {
            inputChange ({url}) {
                this.$emit("change", url)
            },
            inputProgress ({state}) {
                // let stageLoading = state === 1
                // this.$store.commit("updateState", {name: 'stageLoading', value: stageLoading})
            }
        },
        components: {
            BaseUploadImg
        },
        computed: {},
        mounted () {
        }
    }
</script>

<style type="text/less" lang="less">
    .upload-img-container {
        position: relative;
        height: 170px;
        border: 1px dashed #979797;
        & > .input-label {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 1;
            & > input[type=file] {
                display: none;
            }
        }
        & > .upload-img-input {
            position: relative;
            height: 100%;
            text-align: center;

            & > .input-button {
                position: relative;
                margin: 65px auto 8px;
                width: 120px;
                height: 40px;
                line-height: 40px;
                color: #9380F2;
                font-size: 14px;
                text-align: center;
                border-radius: 50px;
                border: 1px solid #CCC;
                & > .icon {
                    margin-right: 5px;
                    width: 16px;
                    height: 16px;
                    vertical-align: -3px;
                }
            }

            .input-tips {
                color: #999;
            }
        }
    }
</style>
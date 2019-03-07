<template>
    <div class="e-dialog" :style="{zIndex}">
        <slot>
            <div class="e-dialog-contianer">
                <img src="@/assets/img/icon-close.png" class="e-dialog-close" @click="onClose">
                <slot name="body"></slot>
            </div>
        </slot>
    </div>
</template>

<script>
    import popupManager from '../utils/PopupManager'

    export default {
        data () {
            return {
                zIndex: 2999
            }
        },
        props: ["close"],
        methods: {
            onClose () {
                this.$emit("close")
            }
        },
        components: {},
        computed: {},
        mounted () {
            this.zIndex = popupManager.nextZIndex()
        },
    }
</script>

<style type="text/less" lang="less">
    .e-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
        z-index: 2999;
    }

    .e-dialog-contianer {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 800px;
        height: 450px;
        background: #fff;
        border-radius: 4px;
        transform: translate(-50%, -50%);
        & > .e-dialog-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 16px;
            cursor: pointer;
        }
    }
</style>
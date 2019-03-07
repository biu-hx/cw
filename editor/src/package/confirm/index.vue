<template>
    <transition name="bey-fade">
        <div class="bey-confirm" v-show="visible">
            <div class="bey-confirm-content">
                <span>{{message}}</span>
            </div>
            <div class="bey-confirm-footer">
                <button class="bey-confirm-button bey-confirm-no" @click.self="close('cancel')" v-if="showCancelButton">取消</button>
                <button class="bey-confirm-button bey-confirm-yes" @click.self="close('confirm')">确认</button>
            </div>

            <img src="@/assets/img/icon-close.png" class="bey-confirm-close" @click="close('close')" width="12px"
                 v-if="showClose">
        </div>
    </transition>
</template>

<script>
    export default {
        data () {
            return {
                visible: false,
                message: '',
                showCancelButton: true,
                showClose: true,

                closed: false,
            }
        },
        methods: {
            close (type) {
                this.closed = true;
                if (typeof this.onClose === 'function') {
                    this.onClose(this, type);
                }
            },
            destroyElement () {
                this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$el.parentNode.removeChild(this.$el);
            }
        },

        watch: {
            closed (newVal) {
                if (newVal) {
                    this.visible = false;
                    this.$el.addEventListener('transitionend', this.destroyElement);
                }
            }
        },
    }
</script>

<style type="text/less" lang="less" scoped>
    .bey-confirm {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 20px 25px;
        width: 300px;
        text-align: center;
        border-radius: 4px;
        transform: translate(-50%, -50%);
        background: #fff;

        & > .bey-confirm-close {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 2;
            cursor: pointer;
        }

        & > .bey-confirm-content {
            display: flex;
            padding: 20px 0;
            align-items: center;
            justify-content: center;
            color: #333;
            font-size: 14px;
            min-height: 124px;
        }

        & > .bey-confirm-footer {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            & > .bey-confirm-button {
                flex: 1 1 auto;
                margin: 0 5px;
                max-width: 190px;
                height: 34px;
                border-radius: 4px;
                &.bey-confirm-no {
                    color: #333;
                    background: rgba(255, 255, 255, 1);
                    border: 1px solid rgba(221, 221, 221, 1);
                }
                &.bey-confirm-yes {
                    color: #fff;
                    background: rgba(147, 128, 242, 1);
                }
            }
        }
    }

    .bey-fade-enter-active, .bey-fade-leave-active {
        margin-top: 0;
        transition: margin-top .3s;
    }

    .bey-fade-enter, .bey-fade-leave-to {
        margin-top: -30px;
    }
</style>
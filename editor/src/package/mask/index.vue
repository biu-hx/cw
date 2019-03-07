<template>
    <transition name="bey-mask">
        <div class="bey-mask" v-show="visible"></div>
    </transition>
</template>

<script>
    export default {
        data () {
            return {
                visible: false,
                message: '',
                duration: 30000,

                timer: null,
                closed: false,

                onCloseCB: ''
            }
        },
        methods: {
            close () {
                this.closed = true;
                if (typeof this.onClose === 'function') {
                    this.onClose(this);
                }
            },
            destroyElement () {
                this.$el.removeEventListener('transitionend', this.destroyElement);
                this.$el.parentNode.removeChild(this.$el);
            },
        },
        mounted () {
            this.visible = true
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
    .bey-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
    }

    .bey-mask-enter-active, .bey-mask-leave-active {
        transition: opacity .3s;
    }

    .bey-mask-enter, .bey-mask-leave-to {
        opacity: 0
    }
</style>
<template>
    <transition name="bey-fade">
        <div class="bey-toast" v-show="visible">
            <span>{{message}}</span>
        </div>
    </transition>
</template>

<script>
    export default {
        data () {
            return {
                visible: false,
                message: '',
                duration: 3000,

                timer: null,
                closed: false
            }
        },
        methods: {
            startTimer () {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close();
                        }
                    }, this.duration);
                }
            },
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
            this.startTimer();
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
    .bey-toast {
        position: fixed;
        top: 20px;
        left: 50%;
        padding: 14px;
        min-width: 600px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        border-radius: 4px;
        transform: translate(-50%);
        background: #333;
        opacity:0.5;
    }

    .bey-fade-enter-active, .bey-fade-leave-active {
        top: 20px;
        transition: top .2s;
    }

    .bey-fade-enter, .bey-fade-leave-to {
        top: -10px;
    }
</style>
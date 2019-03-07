<template>
    <label class="e-upload-img-wrapper">
        <slot></slot>
        <input type="file" :accept="accept" @change="inputChange" ref="input" style="display: none">
    </label>
</template>

<script>
    let cancelToken = ''
    export default {
        data () {
            cancelToken = this.$http.cancelToken.source()
            return {}
        },
        props: {
            accept: {
                type: String,
                default: "image/jpeg,image/png"
            },
            size: {
                type: Number,
                default: 2
            },
            type: {
                type: [String, Number],
                default: 0
            },
            base64: {
                type: Boolean,
                default: false
            },

            abort: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            _accept () {
                return this.accept ? this.accept.split(",") : []
            }
        },
        methods: {
            arouse () {
                this.$refs["input"].click()
            },

            inputChange (e) {
                let file = e.target.files[0]
                if (file) {
                    this.validate(file)
                    this.$refs["input"].value = "";
                }
            },

            validate (file) {
                if (this._accept.length > 0 && !this._accept.includes(file.type)) {
                    this.$toast("仅支持jpg，png")
                } else if (file.size > this.size * 1024000) {
                    this.$toast("图片大小不能超过2M")
                } else {
                    if (this.base64) {
                        this.readImg(file)
                    } else {
                        this.uploadFile(file)
                    }
                }
            },

            uploadFile (file) {
                this.progress(1)

                let fd = new FormData
                fd.append("type", this.type)
                fd.append("file", file)

                this.$store.commit("updateStoreState", {stageLoading: 1})
                this.$http.post({
                    url: 'file/upload',
                    data: fd
                }).then((res) => {
                    this.progress(2)
                    this.emit(res.file.url, file, res)
                    this.$store.commit("updateStoreState", {stageLoading: 0})
                }).catch(({next}) => {
                    next()
                    this.progress(3)
                    this.$store.commit("updateStoreState", {stageLoading: 0})
                })
            },

            readImg (file) {
                let reader = new FileReader()
                this.progress(1)
                reader.readAsDataURL(file)
                reader.onload = (event) => {
                    this.progress(2)
                    this.emit(event.target.result, file)
                }
                reader.onerror = () => {
                    this.progress(3)
                }
            },
            emit (url, file, data) {
                if (this.$refs["input"]) this.$refs["input"].value = ""
                this.$emit("change", {url, file, data})
            },
            progress (state, value = 0) {
                this.$emit("progress", {
                    state: state,
                    value: value
                })
            }
        },
        destroyed () {
            if (this.abort) {
                cancelToken.cancel('Operation canceled by the user.')
            }
        }
    }
</script>
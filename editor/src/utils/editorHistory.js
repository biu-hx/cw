class EditorHistory {
    constructor () {
        let ctrl = 0;

        this.index = -1;
        this.size = 10;
        this.historyList = [];
        this.callbackFn = null;
        this.isProcessing = false;
        this.callbackFn = arguments[1]

        if (typeof arguments[0] == 'function') {
            this.callbackFn = arguments[0]
        }

        if (typeof arguments[0] != 'function' && !Number.isNaN(arguments[0]) && Number(arguments[0]) > 0) {
            this.size = Math.floor(Number(arguments[0]))
        }

        window.document.addEventListener("keydown", (e) => {
            if (e.keyCode == 17) {
                ctrl = 1
            }
        })

        window.document.addEventListener("keyup", (e) => {
            if (e.keyCode == 17) {
                ctrl = 0
            } else if (ctrl > 0 && e.keyCode == 90) {
                this.toReturn()
            } else if (ctrl > 0 && e.keyCode == 89) {
                this.toNext()
            }
        })
    }

    toReturn (step = 1) {
        if (this.isProcessing) return
        this.isProcessing = true
        step = Number.isNaN(Number(step)) ? 0 : Math.floor(Number(step))
        this.index = this.index - step < 0 ? 0 : this.index - step

        if (this.callbackFn && typeof this.callbackFn == 'function') {
            this.callbackFn(JSON.parse(this.historyList[this.index]))
        }
        this.isProcessing = false;
    }

    toNext (step = 1) {
        if (this.isProcessing) return
        this.isProcessing = true
        step = Number.isNaN(Number(step)) ? 0 : Math.floor(Number(step))
        this.index = this.index + step > this.historyList.length - 1 ? this.historyList.length - 1 : this.index + step

        if (this.callbackFn && typeof this.callbackFn == 'function') {
            this.callbackFn(JSON.parse(this.historyList[this.index]))
        }
        this.isProcessing = false
    }

    toSave (data) {
        if (this.historyList.length == this.size && (this.index + 1) === this.historyList.length) {
            this.index--;
            this.historyList.shift()
        }
        this.index++;
        this.historyList.splice(this.index, this.historyList.length - this.index, JSON.stringify(data))
    }

    clear () {
        this.index = -1
        this.historyList = []
    }

}

export default EditorHistory
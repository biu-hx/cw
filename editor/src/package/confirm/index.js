import Vue from 'vue'
import index from './index.vue'
import PopupManager from '../utils/PopupManager'

import Mask from '../mask/index.js'

let comfirmContructor = Vue.extend(index)

let seed = 1
let instance = ''

const Comfirm = function (options) {
    return new Promise((resolve, reject) => {
        options = options || {}
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }

        let id = 'comfirm_' + seed++;
        instance = new comfirmContructor({
            data: options
        });

        let mask = Mask()
        instance.id = id
        instance.vm = instance.$mount();

        instance.onClose = function (self, type) {
            if (type == 'confirm') resolve()
            else reject(type)
            setTimeout(() => {
                mask.visible = false
            }, 200)
        }

        document.body.appendChild(instance.vm.$el);
        instance.vm.visible = true;
        instance.dom = instance.vm.$el;
        instance.dom.style.zIndex = PopupManager.nextZIndex();


    })
}

export default Comfirm
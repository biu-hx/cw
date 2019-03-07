import Vue from 'vue'
import index from './index.vue'
import PopupManager from '../utils/PopupManager'

let toastContructor = Vue.extend(index)
let seed = 1
let instance = ''

const Toast = function (options) {
    options = options || {}
    if (typeof options === 'string') {
        options = {
            message: options
        }
    }
    let id = 'toast_' + seed++;

    instance = new toastContructor({
        data: options
    });

    instance.id = id
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instance.dom.style.zIndex = PopupManager.nextZIndex();

    return instance.vm;
}

export default Toast
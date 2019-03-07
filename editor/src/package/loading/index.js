import Vue from 'vue'
import loading from "./index.vue"
import PopupManager from '../utils/PopupManager'

let contructor = Vue.extend(loading)

let seek = 1
Vue.directive('loading', {
    // 当被绑定的元素插入到 DOM 中时……
    bind (el, {modifiers: {body}}) {
        let instance = new contructor()
        instance.id = 'loading_' + seek++
        instance.vm = instance.$mount();

        if (body) {
            document.body.appendChild(instance.vm.$el);
        } else {
            el.appendChild(instance.vm.$el)
        }

        instance.dom = instance.vm.$el;
        instance.dom.style.zIndex = PopupManager.nextZIndex();
        el.$loading = instance
    },

    inserted (el, {value}) {
        el.$loading.visible = value;
    },
    update (el, {value}) {
        el.$loading.visible = value;
    }
})
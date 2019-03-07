import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/index'
import AppInjector from './components/AppInjector'

import './package/utils/index'
import './utils/common'

import appEnv from './utils/appEnv'

Vue.prototype.$http = axios
Vue.config.productionTip = false

new appEnv().getEnvironment((env) => {
    store.commit("updateState", {name: "env", value: env})
})

Vue.mixin(AppInjector)
new Vue({
    router,
    store,
    render (h) {
        return h(App)
    }
}).$mount('#app')


window.domain = process.env.NODE_ENV === 'development' ? "localhost" : "modelwiser.com";
document.domain = process.env.NODE_ENV === 'development' ? "localhost" : "modelwiser.com";
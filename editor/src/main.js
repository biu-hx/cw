import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import store from './store/store'
import './package/utils/index'

import axios from './axios/index'


window.domain = process.env.NODE_ENV === 'development' ? "localhost" : "modelwiser.com";
document.domain = process.env.NODE_ENV === 'development' ? "localhost" : "modelwiser.com";

Vue.config.productionTip = false
Vue.prototype.$http = axios
import './assets/style/common.less'

Vue.use(VueClipboard)

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')

window.onbeforeunload = function (e) {
    e = window.event || e;
    return e.returnValue = ("确定离开当前页面吗？");
    // return "1212"
}

window.createdTimeStamp = function () {
    return (Date.parse(new Date()) + Math.random() * 10000).toString(16)
}
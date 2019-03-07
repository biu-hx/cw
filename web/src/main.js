import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
//import axios from './axios'
//import VueAxios from 'vue-axios'
import axios from './static/js/http'
import VueClipboard from 'vue-clipboard2'
 


document.domain = process.env.NODE_ENV === 'development' ? "localhost" : "modelwiser.com";

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueClipboard);

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    },
    created () {
        if (localStorage.getItem("isLogin") === null) {
            localStorage.setItem("isLogin", '');
        }
        this.$store.state.isLogin = localStorage.getItem('isLogin');
    }
}).$mount('#app')


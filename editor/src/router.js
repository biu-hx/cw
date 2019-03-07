import Vue from 'vue'
import Router from 'vue-router'
import layout from './views/layout.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: layout,
            children: [
                {
                    path: '/',
                    name: 'main',
                    component: function () {
                        return import(/* webpackChunkName: "main" */ './views/main.vue')
                    }
                },
                {path: '/', redirect: '/'}
            ]
        }
    ]
})

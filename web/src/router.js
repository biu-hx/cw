import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './component/login.vue'
import activity from './component/activity.vue'
import addprizeman from './component/addprizeman.vue'
import moneysave from './component/moneysave.vue'
import prizeman from './component/prizeman.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:path?',
      name: 'home',
      props:true,
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/activity',
      name: 'activity',
      component: activity
    },
    {
      path: '/addprizeman',
      name: 'addprizeman',
      component: addprizeman
    },
    {
      path: '/moneysave',
      name: 'moneysave',
      component: moneysave
    },
    {
      path: '/prizeman',
      name: 'prizeman',
      component: prizeman
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: function () {
    //     return import(/* webpackChunkName: "about" */ './views/About.vue')
    //   }
    // }
  ]
})

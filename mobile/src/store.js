import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        source: '',

        env: '',
        runningEnvState: true
    },
    mutations: {
        updateState (state, {name, value}) {
            state[name] = value
        }
    },
    actions: {}
})

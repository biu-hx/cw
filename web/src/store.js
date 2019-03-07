import Vue from 'vue'
import Vuex from 'vuex'
import {setAccessToken} from './static/js/auth'

Vue.use(Vuex)
	
export default new Vuex.Store({
	state: {
		author: "limengshu",
		isLogin: "",
		userInfo: JSON.parse(localStorage.getItem("userInfo")),
	},
	mutations: {
		newAuthor(state, msg) {
			state.author = msg;
		},
		isLogin(state, msg) {
			state.isLogin = msg;
			localStorage.setItem("isLogin", msg);
		},

		userinfo(state, data) {
			state.userInfo = data;
			localStorage.setItem("userinfo", JSON.stringify(data));
//			localStorage.setItem(token, data.token);
            setAccessToken(data.token)
		}
	},
	actions: {
		userInfo({state, commit}, data) {
			commit("userInfo")
		}
	}
});
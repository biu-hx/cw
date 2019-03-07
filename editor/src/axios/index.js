import Vue from 'vue'
import axios from 'axios'
import {getAccessToken} from '../utils/auth'

const vm = new Vue()
const version = process.env.VUE_APP_VERSION

let token;
let errorCode = ['Error0201', 'Error1000']

// 全局配置
axios.defaults.baseURL = process.env.VUE_APP_HOST

axios.interceptors.request.use(function (config) {
    token = getAccessToken()
    config.headers['version'] = version
    if (token) {
        config.headers['token'] = token
    } else {
        window.location.href = process.env.VUE_APP_WEB
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
    let {data} = response
    if (data.code) {
        if (errorCode.includes(data.code)) {
            vm.$toast(data.msg)
            window.location.href = process.env.VUE_APP_WEB
            return Promise.reject({
                network: 'success',
                data: data,
                next () {
                }
            })
        } else {
            return Promise.reject({
                network: 'success',
                    data: data,
                    next (msg) {
                    vm.$toast((msg || data.code ? data.msg : '系统异常'))
                }
            })
        }
    } else {
        return data.data
    }
}, function (err) {
    return Promise.reject({
        network: 'fail',
        data: err,
        next (msg) {
            vm.$toast((msg || "网络异常"))
        }
    })
})

class http {
    constructor () {
        this.cancelToken = axios.CancelToken
    }

    post (options) {
        return axios(Object.assign({}, options, {method: 'post'}))
    }

    get (options) {
        return axios(Object.assign({}, options, {method: 'get'}))
    }
}

export default new http()
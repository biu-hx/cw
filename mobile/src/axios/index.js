import Vue from 'vue'
import axios from 'axios'

const vm = new Vue()
const version = process.env.VUE_APP_VERSION

let token;
let errorCode = ['Error0201', 'Error1000', 'Error1001']

axios.defaults.baseURL = process.env.VUE_APP_HOST

axios.interceptors.request.use(function (config) {
    config.headers['version'] = version
    if (token) config.headers['token'] = token
    return config;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
    let {data} = response
    if (data.code) {
        if (errorCode.includes(data.code)) {
            vm.$toast(data.msg)
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
// 全局配置
// axios.defaults.baseURL = window.location.origin
import axios from 'axios'
import QS from 'qs';
import {getAccessToken} from './auth'
//import MD5 from './md5'

// H5 api
const testOffice = {
    // 测试
    testing: 'https://cw-api.modelwiser.com'
    //// 正式
    //production: 'https://zyj.modelwiser.com/',
    //// 预发布
    //stage: 'https://stage-bigbapi.modelwiser.com/'
}

// 后台 api
const urlType = {
    // 测试
    testing: 'https://cw-api.modelwiser.com'
    //// 正式
    //production: 'https://zyjbe.modelwiser.com/',
    //// 预发布
    //stage: 'https://stage-bigbadmin.modelwiser.com/'
}

//const envName = process.env.ADDRESS

const env = process.env.NODE_ENV

let token;
axios.defaults.baseURL = process.env.VUE_APP_HOST

const service = axios.create({
    //baseURL: testOffice[testing],
    timeout: 30000 // 请求超时时间
})

service.interceptors.request.use(function (config) {
    config.headers['version'] = "1.0.0"
    token = getAccessToken()
    if (token) {
        config.headers["token"] = token
    }
    return config
}, function (err) {
    return Promise.reject(err)
})

service.interceptors.response.use(function (response) {
    const returnValue = response.data
    if (returnValue.code == "") {
        return returnValue.data
    } else {
        return Promise.reject(returnValue)
    }
}, function (err) {
    return Promise.reject(err)
})

class http {
    ajax (methods, options) {
//		let URL = `${testOffice.testing}${options.url}`
//		console.log(URL + ',' + methods + ',' + options)
        //  options.url = URL
        //  if (options.data) {
        //    if (options.data.urlTypeAss === 1) {
        //      URL = `${urlType.testing}${options.url}`
        //      options.url = URL
        //      console.log(options.url)
        //    }
        //  }
        return service[methods](options.url, options.data, options.header)
    }

    post (options) {
        return this.ajax('post', options)
    }

    get (options) {
        return this.ajax('get', options)
    }
}

console.log()
export default new http()
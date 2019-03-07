function getEnvironment (callback) {
    let userAgent = window.navigator.userAgent.toLowerCase();

    function ready () {
        if (window.__wxjs_environment === 'miniprogram' || userAgent.includes("miniprogram") && userAgent.includes("micromessenger")) {
            callback("wxminiprogram")
        } else {
            callback("ordinary")
        }
    }

    if (window.WeixinJSBridge && window.WeixinJSBridge.invoke) {
        document.addEventListener('WeixinJSBridgeReady', ready, false)
    } else {
        ready()
    }
}


class appEnv {
    constructor () {
    }

    getEnvironment (callback) {

        if (typeof callback === "function") {
            getEnvironment(callback)
        }
    }
}

export default appEnv
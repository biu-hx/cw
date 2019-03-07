const token = process.env.VUE_APP_TOKEN || "accessToken"

class Cookie {
    constructor () {
    }

    init (name, value, expires) {
        document.cookie = `${name}=${value};expires=${expires};domain=${process.env.NODE_ENV === 'development' ? "localhost" : "modelwiser.com"};path=/`
    }

    setCookie (name, value, days) {
        this.init(name, value, this.expiresDate(days))
    }

    getCookie (name) {
        let data = document.cookie.split(";").filter(item => {
            return item.trim().indexOf(name + "=") == 0
        })[0]
        return data ? data.trim().substring((name + "=").length, data.length) : undefined
    }

    expiresDate (days = 100) {
        return new Date((new Date().getTime() + days * 24 * 3600000))
    }
}

const cookie = new Cookie()

export const setAccessToken = function (data) {
    cookie.setCookie(token, data)
}

export const getAccessToken = function () {
    return cookie.getCookie(token)
}

export const clearAccessToken = function () {
    cookie.init(token, "", "Thu, 01 Jan 1970 00:00:00 GMT")
}

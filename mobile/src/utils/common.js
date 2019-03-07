window.ObjectJoin = function (data, arg1 = "&", arg2 = "=") {
    let list = []
    Object.entries(data).forEach((item) => {
        list.push(item.join(arg2))
    })
    return list.join(arg1)
}

export default {}
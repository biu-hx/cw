import Vue from 'vue'
import Vuex from 'vuex'
import http from '../axios/index'
import EditorHistory from '../utils/editorHistory'
import {getAccessToken, clearAccessToken} from '../utils/auth'

Vue.use(Vuex)

function getTimeStamp (type) {
    return Date.parse(new Date()) + type + Math.floor(Math.random() * 100000)
}

const editorHistory = new EditorHistory(function (data) {
    store.commit("updateStoreState", data)
})

const store = new Vuex.Store({
    state: {
        userInfo: '',
        accessToken: getAccessToken(),
        publishStatus: 0,


        activeCompData: {},
        settingCompBlockType: 0, // 1：背景，2：图片，3：热区，4：插件

        pageActiveIndex: 0, // 当前活动页面索引值
        activitySource: {},

        showAsideTemplate: 0,

        previewActive: false,   // 预览弹窗状态
        previewEditorData: '',

        publishActive: false,   // 发布弹窗状态

        stageLoading: false,     // loading状态

        editorHistory
    },
    getters: {
        activePageData (state) {
            return state.activitySource.pages && state.activitySource.pages.length > 0 ? state.activitySource.pages[state.pageActiveIndex] : ''
        },
        random (state) {
            return state.pageActiveIndex + state.activitySource.pages.length + Math.floor(Math.random() * 100000).toString(16)
        }
    },
    mutations: {
        // 公用更新state方法，键值对形式
        updateStoreState (state, data) {
            if (typeof data === 'object' && data instanceof Object) {
                Object.entries(data).forEach(item => {
                    state[item[0]] = item[1]
                })
            } else {
                console.error("格式错误")
            }
        },

        insetHistory (state, type) {
            if (type === "clear") {
                editorHistory.clear()
            }
            editorHistory.toSave({
                settingCompBlockType: state.settingCompBlockType,
                pageActiveIndex: state.pageActiveIndex,
                activitySource: state.activitySource,
                activeCompData: state.activeCompData
            })
        },

        //
        activitySource (state, {data, activitySource, pageActiveIndex, activeCompData, settingCompBlockType}) {
            if (data || activitySource) {
                state.activitySource = data || activitySource
            }

            if (pageActiveIndex !== undefined) {
                state.pageActiveIndex = pageActiveIndex
            }

            if (activeCompData !== undefined) {
                state.activeCompData = activeCompData
            }

            if (settingCompBlockType !== undefined) {
                state.settingCompBlockType = settingCompBlockType
            }
        },

        // 更新具体某页
        updateActivitySource (state, data) {
            let isArray = Array.isArray(data);
            let type = isArray && data[1] ? data[1] : 'inset';
            Vue.set(state.activitySource.pages, state.pageActiveIndex, JSON.parse(JSON.stringify(isArray ? data[0] : data)))

            if (type == "inset")
                store.commit("insetHistory")
        },

        // 创建图片元素
        createdImg () {
            let data = store.getters.activePageData
            let imgs = data.imgs || []
            let index = imgs && imgs.length > 0 ? imgs[imgs.length - 1].index : 0
            let timestamp = getTimeStamp('IMG')
            index++;
            let img = {
                index: index,
                timestamp,
                name: '图片' + (index < 100 ? `00${index}` : index),
                url: '',
                style: {
                    width: 375,
                    height: 375,
                    top: 0,
                    left: 0,
                    borderColor: '',
                    borderStyle: 'none',
                    borderWidth: 0,
                    borderRadius: 0
                },
                action: []
            }
            imgs.push(img)
            store.commit("settingCompBlockType", 2)
            store.commit("updateActivitySource", data)
            store.commit("activeCompData", img)
        },

        deleteImg (state, {index}) {
            store.getters.activePageData.imgs.splice(index, 1)
            store.commit("activeCompData")
            store.commit("settingCompBlockType", 0)
            store.commit("updateActivitySource", store.getters.activePageData)
        },

        // 创建热区
        createdHotspot () {
            let data = store.getters.activePageData
            let hotspot = data.hotspot || []
            let index = hotspot && hotspot.length > 0 ? hotspot[hotspot.length - 1].index : 0
            let timestamp = getTimeStamp('HOTSPOT')
            index++;
            let hot = {
                index: index,
                timestamp,
                name: '热区' + (index < 100 ? `00${index}` : index),
                style: {
                    width: 70,
                    height: 70,
                    top: 50,
                    left: 152
                },
                action: {
                    type: 1,
                    value: 1
                }
            }
            hotspot.push(hot)
            store.commit("settingCompBlockType", 3)
            store.commit("updateActivitySource", data)
            store.commit("activeCompData", hot)
        },

        deleteHotspot (state, {index}) {
            store.getters.activePageData.hotspot.splice(index, 1)
            store.commit("activeCompData")
            store.commit("settingCompBlockType", 0)
            store.commit("updateActivitySource", store.getters.activePageData)
        },

        // 创建小插件
        createdPlug (state, {plugType}) {
            let data = store.getters.activePageData;
            let plug = data.plug = {
                status: true,
                isShow: false,
                curStep: 0,
                initData: {
                    curActiveIndex: 0,
                    curJraIndex: 0,
                    curNavigateIndex: 0,
                    selectedIndex: 0,//选中的容器
                    leftSetting: [
                        {
                            name: '文字',
                            keyName: 'color',
                            color: '#333333',
                        },
                        {
                            name: '边框',
                            keyName: 'borderColor',
                            color: '#CCCCCC',
                        },
                        {
                            name: '底色',
                            keyName: 'backgroundColor',
                            color: '#FFFFFF',
                        },
                    ],
                    rightSetting: [
                        {
                            name: '文字',
                            keyName: 'color',
                            color: '#FFFFFF',
                        },
                        {
                            name: '边框',
                            keyName: 'borderColor',
                            color: '#8A7CCF',
                        },
                        {
                            name: '底色',
                            keyName: 'backgroundColor',
                            color: '#8A7CCF',
                        },
                    ],

                },
                runJra: 'wechatApplet',//运行环境
                setBgImg: {
                    backgroundImage: "url(http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/pic_1.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% auto",
                },
                isBargain: false,//是否已发起砍价
                formatType: 1,//悬浮条样式
                isShowBtn: true,
                linkUrl: '',
                leftText: '查看楼盘详情',
                rightText: '我要发起砍价',
                inviteText:'召唤好友帮我砍价',
                leftBtnColor: {
                    color: '#333333',
                    borderColor: '#CCCCCC',
                    backgroundColor: '#FFFFFF',
                },
                rightBtnColor: {
                    color: '#FFFFFF',
                    borderColor: '#8A7CCF',
                    backgroundColor: '#8A7CCF',
                },
                step_1: {
                    isShow: false,
                    isShowHeadBg: true,
                    formatType: 1,
                    confirmText: '确定',
                    initData: {
                        selectedIndex: 1,//选中的容器
                        //头图
                        headImg: {
                            index: 0,
                        },
                        //弹窗底图
                        toastImg: {
                            index: 0,
                        },
                        setColor: [
                            {
                                name: '项目名称',
                                keyName: 'name',
                                color: '#FFFFFF',
                            },
                            {
                                name: '已经砍了',
                                keyName: 'desc',
                                color: '#8A7CCF',
                            },
                            {
                                name: '砍价金额',
                                keyName: 'price',
                                color: '#8A7CCF',
                            },
                        ],
                        setBtn: [
                            {
                                name: '文字',
                                keyName: 'color',
                                color: '#FFFFFF',
                            },
                            {
                                name: '边框',
                                keyName: 'borderColor',
                                color: '#8A7CCF',
                            },
                            {
                                name: '底色',
                                keyName: 'backgroundColor',
                                color: '#8A7CCF',
                            },
                        ]
                    },
                    setBgImg: {
                        backgroundImage: "url(http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/confirm_bg_1.jpg)",
                        backgroundSize: "100% auto",
                        backgroundRepeat: "no-repeat"
                    },
                    setHeadImg: {
                        backgroundImage: "url(http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/confirm_pic_1.jpg)",
                        backgroundSize: "100% auto",
                        backgroundRepeat: "no-repeat"
                    },
                    setName: {
                        name: '#FFFFFF',
                        desc: '#8A7CCF',
                        price: '#8A7CCF',
                    },
                    setBtn: {
                        color: '#FFFFFF',
                        borderColor: '#8A7CCF',
                        backgroundColor: '#8A7CCF',
                    }
                },
                step_2: {
                    isShow: false,
                    formatType: 1,
                    setBtn: {
                        color: '#FFFFFF',
                        borderColor: '#8A7CCF',
                        backgroundColor: '#8A7CCF',
                    }
                },
                step_3: {
                    isShow: false,
                    setBgImg: {
                        backgroundImage: "url(http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/call_bg_1.jpg)",
                        backgroundSize: "100% auto",
                        backgroundRepeat: "no-repeat"
                    },
                    title: {
                        isShow: false,
                        style: {
                            color: '#333333',
                            fontWeight: 'bold',
                            fontSize: '30px',
                        }
                    },
                    name: {
                        isShow: false,
                        style: {
                            color: '#333333',
                            fontWeight: 'normal',
                            fontSize: '14px',
                        }
                    },
                    hintText: {
                        style: {
                            color: '#666666',
                        },
                    }
                },
                step_4: {
                    isShow: false,
                    cardStyleType: 1,
                    initData: {
                        nameListIndex: 0,
                        isNameBold: true,//是否加粗
                        selectBgIndex: 0,//选中的容器
                        selectCardBgIndex: 0,//选中的容器
                        // 设置项目名称颜色
                        setNameColor: [
                            {
                                name: '文字',
                                keyName: 'color',
                                color: '#333333',
                            },

                        ],
                        // 设置倒计时颜色
                        setCountColor: [
                            {
                                name: '文字',
                                keyName: 'color',
                                color: '#FF4C25',
                            },

                        ],
                        // 设置进度条
                        setBar: [
                            {
                                name: '进度条颜色',
                                keyName: 'backgroundColor',
                                color: '#FFCF34'
                            }, {
                                name: '文字颜色',
                                keyName: 'color',
                                color: '#333333'
                            }
                        ],
                        // 设置按钮颜色
                        setBtnColor: [
                            {
                                name: '文字',
                                keyName: 'color',
                                color: '#FFFFFF',
                            },
                            {
                                name: '边框',
                                keyName: 'borderColor',
                                color: '#8A7CCF',
                            },
                            {
                                name: '底色',
                                keyName: 'backgroundColor',
                                color: '#8A7CCF',
                            },

                        ],
                    },
                    setBgImg: {
                        backgroundImage: "url(http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/detail_bg_1.jpg)",
                        backgroundSize: "100% auto",
                        backgroundRepeat: "no-repeat"
                    },
                    setCardBg: {
                        backgroundImage: "url(http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/coupon_bg_1.jpg)",
                        backgroundSize: "100% auto",
                        backgroundRepeat: "no-repeat"
                    },
                    name: {
                        style: {
                            color: '#333333',
                            fontSize: '24px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }
                    },
                    countTime: {
                        sizeIndex: 0,
                        sizeType: 'big',
                        style: {
                            color: '#FF4C25'
                        }
                    },
                    progress: {
                        bar: {
                            backgroundColor: '#FFCF34',
                        },
                        textColor: {
                            color: '#333333',
                        }

                    },
                    setBtn: {
                        style: {
                            color: '#FFFFFF',
                            borderColor: '#8A7CCF',
                            backgroundColor: '#8A7CCF',
                        }

                    }


                },
                step_5: {
                    isShow: false,
                    isShowHeadBg: false,
                    initData: {
                        selectedIndex: 1,//选中的容器
                        //头图
                        headImg: {
                            index: 0,
                        },
                        //弹窗底图
                        toastImg: {
                            index: 0,
                        },
                        setIntBorder: [
                            {
                                name: '文字',
                                keyName: 'color',
                                color: '#333333',
                            },
                            {
                                name: '边框',
                                keyName: 'borderColor',
                                color: '#DDDDDD',
                            },
                            {
                                name: '底色',
                                keyName: 'backgroundColor',
                                color: '#ffffff',
                            },
                        ],
                        setBtn: [
                            {
                                name: '文字',
                                keyName: 'color',
                                color: '#FFFFFF',
                            },
                            {
                                name: '边框',
                                keyName: 'borderColor',
                                color: '#7364B9',
                            },
                            {
                                name: '底色',
                                keyName: 'backgroundColor',
                                color: '#8A7CCF',
                            },
                        ]
                    },
                    setBgImg: {
                        backgroundImage: "url(http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/confirm_bg_1.jpg)",
                        backgroundSize: "100% auto",
                        backgroundRepeat: "no-repeat"
                    },
                    setHeadImg: {
                        backgroundImage: "url(http://cewan-1256356146.piccd.myqcloud.com//pro/editor/plugin/1/tpl/confirm_pic_1.jpg)",
                        backgroundSize: "100% auto",
                        backgroundRepeat: "no-repeat"
                    },
                    setInput: {
                        color: '#333333',
                        borderColor: '#DDDDDD',
                        backgroundColor: '#ffffff',
                    },
                    setBtn: {
                        color: '#FFFFFF',
                        borderColor: '#8A7CCF',
                        backgroundColor: '#8A7CCF',
                    }
                },
            };
            state.activitySource.plugType = plugType
            store.commit("settingCompBlockType", 4);
            store.commit("updateActivitySource", data);
            store.commit("activeCompData", plug);
            store.commit("activitySource", {activitySource: state.activitySource})
        },

        // 切换或者更新了页面
        pageActiveIndex (state, index) {
            state.pageActiveIndex = index
        },

        // 正被编辑项-非背景
        activeCompData (state, data) {
            state.activeCompData = data || {}
        },

        // settingType
        settingCompBlockType (state, data) {
            state.settingCompBlockType = data
        },

        showAsideTemplate (state, data = 0) {
            state.showAsideTemplate = data
        }
    },
    actions: {
        createActivitySource ({commit, dispatch}, data) {
            let config = {
                pageActiveIndex: 0,
                settingCompBlockType: 0,
                activeCompData: {},
                activitySource: data || {
                    name: "",
                    style: {width: 375, height: 603},
                    plugType: 0,
                    bg: {
                        type: 0,
                        img: {style: {backgroundSize: "cover", backgroundPosition: "center center"}},
                        texture: {},
                        style: {
                            width: 375,
                            height: 603,
                            backgroundColor: "#FFFFFF"
                        }
                    },
                    pages: []
                }
            }

            if (data) {
                commit("activitySource", config)
                commit("insetHistory", "clear");
            } else {
                dispatch("createdPage", {activitySource: config.activitySource})
                    .then(({page}) => {
                        config.activitySource.pages.push(page)
                        commit("activitySource", config)
                        commit("insetHistory", "clear");
                    })
            }
        },

        createdPage ({state}, {plugType = 0, from, activitySource} = {}) {
            if (from == "PLUGIN") {
                state.activitySource.plugType = plugType
            }

            activitySource = activitySource || state.activitySource
            return new Promise((resolve) => {
                resolve({
                    page: {
                        plugType,
                        title: '',
                        style: {
                            width: activitySource.style.width,
                            height: activitySource.style.height
                        },
                        bg: JSON.parse(JSON.stringify(activitySource.bg)),
                        imgs: [],
                        plug: {status: false},
                        hotspot: []
                    },
                    pageActiveIndex: activitySource.pages.length,
                    settingCompBlockType: state.settingCompBlockType === 1 ? 1 : 0,
                    activeCompData: {}
                })
            });
        },

        getTemplateDetail ({state, commit, dispatch}, {type = 'temp', id}) {
            let url = type === 'prod' ? 'editor/detail' : 'template/detail'
            let data = {id}

            if (type === 'prod') {
                data["need_opt"] = 2
            } else if (type === 'preview') {
                data["need_opt"] = 4
            } else {
                data["need_content"] = 1
            }

            return http.post({
                url,
                data
            }).then(res => {
                let result = type === 'prod' || type === 'preview' ? res.editor : res.template;
                let content = JSON.parse(type === 'prod' ? result.edit_content : type === 'preview' ? result.temporary_content : result.content)
                let initContent = {
                    name: result.name || '',
                    id: type === 'prod' || type === 'preview' ? result.id : state.activitySource.id,
                    plugType: type === 'prod' || type === 'preview' ? result.type : result.template_type || 0,
                    activeId: type === 'prod' || type === 'preview' ? result.activity_id : undefined
                };
                commit("updateStoreState", {publishStatus: type === 'prod' ? result.status : 0});
                dispatch("createActivitySource", Object.assign(content, initContent));
            }).catch(({next}) => next())
        },

        getUserInfo ({commit}) {
            http.post({
                url: 'user/info'
            }).then(res => {
                commit("updateStoreState", {userInfo: res.user})
            }).catch(({next}) => next())
        },

        publishTemplate ({state, commit}, data) {
            commit("activitySource", Object.assign(state.activitySource, {name: data.name || state.activitySource.name}))
            return new Promise((resolve, reject) => {

                let obj = {
                    content: JSON.stringify(state.activitySource),
                    id: state.activitySource.id,
                }

                if (state.publishStatus !== 3) {
                    obj["type"] = state.activitySource.plugType || 0
                    obj["activity_id"] = state.activitySource.activeId
                }

                http.post({
                    url: 'editor/add',
                    data: Object.assign({}, obj, data)
                }).then(res => {
                    commit("updateStoreState", {
                        name: '', value: Object.assign(state.activitySource, {
                            id: res.editor.id,
                            name: data.name || state.activitySource.name
                        })
                    })
                    resolve(res)
                }).catch(({next}) => {
                    commit("updateStoreState", {stageLoading: 0})
                    next()
                    reject()
                })
            })

        },

        layout ({commit}) {
            clearAccessToken()
            commit("updateStoreState", {userInfo: ""})
        }
    },
})

export default store
//index.js
//获取应用实例
const app = getApp()
var ajax = require("../../utils/ajax.js")
Page({
    data: {
        motto: '申请使用您的微信号登录安规神器',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        logo:"../../images/logo.png",
        visitNum:""
    },
    //   缓存userid
    setStorage(key, value) {
        wx.setStorage({
            key: key,
            data: value
        })
        try {
            wx.setStorageSync(key, value)
        } catch (e) {
            wx.setStorage({
                key: key,
                data: value
            })
        }
    },
    onLoad: function () {
        console.log(app.globalData.userId)
        var that = this;
        var item = {
            'user_id': app.globalData.userId
        }
        ajax.wxRequest('POST', 'app/init', item,
            (res) => {
                console.log(res)
                that.setData({
                    logo: res.data.xcx_logo,
                    visitNum: res.data.login_total
                })

            },
            (err) => {
                wx.showToast({
                    title: '数据加载失败' + err,
                    icon: "none"
                })
            })



        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
            wx.reLaunch({
                url: '../home/home',
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                wx.reLaunch({
                    url: '../home/home',
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                    wx.reLaunch({
                        url: '../home/home',
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        var that = this;
        if (e.detail.errMsg == "getUserInfo:fail auth deny") {
            wx.showToast({
                title: '拒绝授权',
                icon: 'none'
            })
        } else {
            // 登录
            wx.login({
                success: res => {
                    var item = {
                        code: res.code
                    }
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    ajax.wxRequest('POST', 'login/wx_xcx', item,
                        (res) => {
                            console.log(res)
                            app.globalData.userId = res.data.id;
                            app.globalData.openId = res.data.openid;
                            app.globalData.userInfo = e.detail.userInfo
                            that.setData({
                                userInfo: e.detail.userInfo,
                                hasUserInfo: true
                            })
                            that.setStorage('userId', res.data.id)
                            var item = {
                                'user_id': res.data.id,
                                'wx_xcx_data': e.detail.rawData
                            }
                            ajax.wxRequest('POST', 'user/updateInfo', item,
                                (res) => {
                                    wx.reLaunch({
                                        url: '../home/home',
                                    })
                                },
                                (err) => {
                                })
                        },
                        (err) => {
                            wx.showToast({
                                title: err,
                                icon: "none"
                            })
                        })
                }
            })
        }
    }
})
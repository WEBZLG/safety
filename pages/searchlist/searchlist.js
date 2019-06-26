// pages/searchlist/searchlist.js
const app = getApp()
var ajax = require("../../utils/ajax.js")
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList:"",
        iptVal:""
    },
    iptVal: function (e) {
        this.setData({
            iptVal: e.detail.value
        })
    },
    search: function () {
        var that = this;
        if (that.data.iptVal == "") {
            wx.showToast({
                title: '请输入关键字',
                icon: "none"
            })
        } else {
            wx.showLoading();
            var item = {
                'keyword': that.data.iptVal,
                'user_id': app.globalData.userId
            }
            ajax.wxRequest('POST', 'article/lists', item,
                (res) => {
                    console.log(res)
                    that.setData({
                        dataList: res.data.list
                    })
                    for (let i = 0; i < res.data.list.length; i++) {
                        WxParse.wxParse('topic' + i, 'html', res.data.list[i].content, that);
                        if (i === res.data.list.length - 1) {
                            WxParse.wxParseTemArray("dataList", 'topic', res.data.list.length, that)
                        }
                    }
                    let dataList = this.data.dataList;
                    dataList.map((item, index, arr) => {
                        arr[index][0].title = res.data.list[index].title;           //对应的时使用WxParse后的结构
                        arr[index][0].word_url = res.data.list[index].word_url;
                    });
                    console.log(dataList)
                    that.setData({
                        dataList: dataList
                    })
                    wx.hideLoading();
                },
                (err) => {
                    wx.showToast({
                        title: '数据加载失败' + err,
                        icon: "none"
                    })
                    wx.hideLoading();
                })
        }
    },
    viewFile:function(e){
        var filePath = e.currentTarget.dataset.url
        wx.downloadFile({
            url: e.currentTarget.dataset.url,
            success(res) {
                const filePath = res.tempFilePath;
                console.log(filePath)
                wx.openDocument({
                    filePath: filePath,
                    success(res) {
                        console.log('打开文档成功')
                    }
                })
                //保存
                // wx.saveFile({
                //     tempFilePath: filePath,
                //     success(res) {
                //         const savedFilePath = res.savedFilePath;
                //         console.log(res)
                //     }
                // })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.showLoading();
        var item = {
            'keyword':options.keyword,
            'user_id': app.globalData.userId
        }
        ajax.wxRequest('POST', 'article/lists', item,
            (res) => {
                console.log(res)
                that.setData({
                    dataList:res.data.list
                })
                for (let i = 0; i < res.data.list.length; i++) {
                    WxParse.wxParse('topic' + i, 'html', res.data.list[i].content, that);
                    if (i === res.data.list.length - 1) {
                        WxParse.wxParseTemArray("dataList", 'topic', res.data.list.length, that)
                    }
                }
                let dataList = this.data.dataList;
                dataList.map((item, index, arr) => {
                    arr[index][0].title = res.data.list[index].title;           //对应的时使用WxParse后的结构
                    arr[index][0].word_url = res.data.list[index].word_url;
                });
                console.log(dataList)
                that.setData({
                    dataList: dataList
                })
                wx.hideLoading();
            },
            (err) => {
                wx.showToast({
                    title: '数据加载失败' + err,
                    icon: "none"
                })
                wx.hideLoading();
            })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
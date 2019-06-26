// pages/home/home.js
const app = getApp()
var ajax = require("../../utils/ajax.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logo: "../../images/logo.png",
        iptVal:""
    },
    iptVal:function(e){
        this.setData({
            iptVal:e.detail.value
        })
    },
    search:function(){
        var that = this;
        if(that.data.iptVal==""){
            wx.showToast({
                title: '请输入关键字',
                icon:"none"
            })
        }else{
            wx.navigateTo({
                url: '../searchlist/searchlist?keyword=' + that.data.iptVal,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            logo: options.logo
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
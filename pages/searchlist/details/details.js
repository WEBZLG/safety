// pages/searchlist/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content:"",
        title:"",
        url:""
    },
    viewFile: function (e) {
        var filePath = this.data.url;
        wx.downloadFile({
            url: filePath,
            success(res) {
                const filePath = res.tempFilePath;
                wx.openDocument({
                    filePath: filePath,
                    success(res) {
                    }
                })
                //保存
                // wx.saveFile({
                //     tempFilePath: filePath,
                //     success(res) {
                //         const savedFilePath = res.savedFilePath;
                //     }
                // })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            content:options.text,
            url:options.url,
            title:options.title
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
    // onShareAppMessage: function () {

    // }
})
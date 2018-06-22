// pages/home/articleInfo/articleInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOK: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://route.showapi.com/96-36',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        "id": options.id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var str = res.data.showapi_res_body.item.content
        var reg = /<STRONG>/g
        var reg1 = /<\/STRONG>/g
        str = str.replace(reg, "");
        str = str.replace(reg1, "");
        that.setData({
          title: res.data.showapi_res_body.item.title,
          media: res.data.showapi_res_body.item.author,
          img: res.data.showapi_res_body.item.img,
          content: str,
          isOK: true
        })
      }
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
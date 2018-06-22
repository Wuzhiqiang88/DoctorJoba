const app = getApp()
Page({
  data: {
    remind: '加载中',
    angle: 5,
    year: 2018,
    userInfo: {}
  },

  goToIndex: function () {
    wx.redirectTo({
      url: '/pages/start/editInfo/editInfo',
    })
  },
  onLoad: function () {
    if (wx.getStorageSync('userInfo')) {
      console.log('login success');
      app.globalData.userInfo = wx.getStorageSync('userInfo')
      wx.switchTab({
        url: '/pages/home/index/index',
      })
    }
    this.setData({
      year: new Date().getFullYear(),
      userInfo: app.globalData.userInfo
    });
  },
  onShow: function () {

  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
  },
});
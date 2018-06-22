// pages/ask/askDr/askDr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    tabs: ["妇科",
      "儿科",
      "皮肤性病科",
      "内科",
      "男科",
      "产科",
      "外科",
      "中医科",
      "骨伤科",
      "精神心理科",
      "口腔颌面科",
      "眼科",
      "耳鼻咽喉科",
      "肿瘤及防治科",
      "整形美容科",
      "报告解读科",
      "营养科"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tabClick: function (e) {
    var that = this
    that.setData({
      activeIndex: e.currentTarget.id
    });
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
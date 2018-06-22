// pages/home/searchDisease/searchDisease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    depActiveIndex:0,
    tabs: [
      { "img": "/images/disease1.png", "title": "常见疾病" },
      { "img": "/images/disease2.png", "title": "妇科" },
      { "img": "/images/disease3.png", "title": "儿科" },
      { "img": "/images/disease4.png", "title": "皮肤性病科" },
      { "img": "/images/disease5.png", "title": "内科" },
      { "img": "/images/disease6.png", "title": "男科" },
      { "img": "/images/disease7.png", "title": "产科" },
      { "img": "/images/disease8.png", "title": "外科" },
      { "img": "/images/disease9.png", "title": "中医科" },
      { "img": "/images/disease10.png", "title": "骨伤科" },
      { "img": "/images/disease11.png", "title": "精神心理科" },
      { "img": "/images/disease12.png", "title": "口腔颌面科" },
      { "img": "/images/disease13.png", "title": "眼科" },
      { "img": "/images/disease14.png", "title": "耳鼻咽喉科" },
      { "img": "/images/disease15.png", "title": "肿瘤及防治科" },
      { "img": "/images/disease16.png", "title": "整形美容科" },
      { "img": "/images/disease17.png", "title": "报告解读科" },
      { "img": "/images/disease18.png", "title": "营养科" },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  tabClick: function (e) {
    var that = this
    that.setData({
      depActiveIndex: 0,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id!=0){
      wx.request({
        url: 'http://127.0.0.1:8080/wxjoba/departments/allByDepartment',
        data: {
          "department": e.currentTarget.dataset.department
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {

          that.setData({
            departments: res.data,
          })
          wx.request({
            url: 'http://127.0.0.1:8080/wxjoba/symptoms/allByDepartments',
            data: {
              "departments": res.data[0].department2Name
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              that.setData({
                symptoms: res.data,

              })
            }
          })
        }
      })
    }
  },
  depTabClick: function (e) {
    var that = this
    that.setData({
      depActiveIndex: e.currentTarget.id
    });
    wx.request({
      url: 'http://127.0.0.1:8080/wxjoba/symptoms/allByDepartments',
      data: {
        "departments": e.currentTarget.dataset.departments
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          symptoms: res.data,

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
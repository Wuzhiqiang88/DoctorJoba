// pages/home/index/index.js
var sliderWidth = 50; // 需要设置slider的宽度，用于计算中间位置
var pagenum=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    scrollHeight: 0,
    hidden:true,
    tabs: ["养生", "保健", "心理", "两性", "疾病", "用药"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    imgUrls: [
      {
        url: 'https://media2.chunyuyisheng.com/@/media/images/2018/06/04/854c/f51878eac559_w1242_h350_.jpg'
      }, {
        url: 'https://media2.chunyuyisheng.com/@/media/images/2018/06/04/ef1d/8148ec8e8e04_w1242_h350_.jpg'
      }, {
        url: 'https://media2.chunyuyisheng.com/@/media/images/2018/06/04/29de/04cb87db6331_w1242_h350_.jpg'
      }
    ],  
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          scrollHeight: res.windowHeight
        });
      }
    })
    wx.request({
      url: 'http://route.showapi.com/90-87',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        "tid": "569",
        "page": 1
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          hidden: false,
          healthlist_1: res.data.showapi_res_body.pagebean.contentlist
        })
      }
    })
    setTimeout(function () {
      wx.request({
        url: 'http://route.showapi.com/90-87',
        data: {
          "showapi_appid": '66900',
          "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
          "tid": "570"
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            healthlist_2: res.data.showapi_res_body.pagebean.contentlist
          })
        }
      })
    }, 1000) 
    
    setTimeout(function () {
      wx.request({
        url: 'http://route.showapi.com/90-87',
        data: {
          "showapi_appid": '66900',
          "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
          "tid": "568"
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            healthlist_3: res.data.showapi_res_body.pagebean.contentlist
          })
        }
      })
    }, 2000) 
    setTimeout(function () {
      wx.request({
        url: 'http://route.showapi.com/90-87',
        data: {
          "showapi_appid": '66900',
          "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
          "tid": "663"
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            healthlist_4: res.data.showapi_res_body.pagebean.contentlist
          })
        }
      })
    }, 2000) 
    setTimeout(function () {
      wx.request({
        url: 'http://route.showapi.com/90-87',
        data: {
          "showapi_appid": '66900',
          "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
          "tid": "578"
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            healthlist_5: res.data.showapi_res_body.pagebean.contentlist
          })
        }
      })
    }, 3000) 
    setTimeout(function () {
      wx.request({
        url: 'http://route.showapi.com/90-87',
        data: {
          "showapi_appid": '66900',
          "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
          "tid": "580"
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            healthlist_6: res.data.showapi_res_body.pagebean.contentlist
          })
        }
      })
    }, 3000) 
  },
   tabClick: function (e) {
    var that=this
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
   toSearch:function(){
     wx.navigateTo({
       url: '/pages/home/search/search'
     })
   },
   bindDownLoad: function () {
     var that=this
     pagenum=pagenum+1
     setTimeout(function () {
       wx.request({
         url: 'http://route.showapi.com/90-87',
         data: {
           "showapi_appid": '66900',
           "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
           "tid": "569",
           "page":pagenum
         },
         header: {
           'Content-Type': 'application/json'
         },
         success: function (res) {
           var healthlist=[]
           healthlist = that.data.healthlist_1
           for (var i=0;i<res.data.showapi_res_body.pagebean.contentlist.length;i++){
             healthlist.push(res.data.showapi_res_body.pagebean.contentlist[i])
           }
           that.setData({
             healthlist_1: healthlist
           })
         }
       })
     }, 1000) 
   },
})
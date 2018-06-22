// pages/start/editInfo/editInfo.js
const app = getApp()
Page({
  data: {
    end: null,
    userInfo: { avatarUrl: "/images/head.jpg" },
    hasUserInfo: false,
    gender: ["未知", "男", "女"],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.setData({
      end: new Date()
    })
    // 查看是否授权
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
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
        }
      })

    }
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo != undefined) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  showTopTips: function (e) {
    // 登录
    var that=this
    wx.login({
      success: function (loginRes) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        if (loginRes) {
          wx.getUserInfo({
            withCredentials: true,
            success: function (infoRes) {
              wx.request({
                url: 'http://127.0.0.1:8080/wxjoba/user/login',
                data: {
                  code: loginRes.code,
                  rawData: infoRes.rawData,
                  signature: infoRes.signature,
                  encryteData: infoRes.encryptedData,
                  iv: infoRes.iv
                },
                success: function (res) {
                  console.log('login success');
                  res = res.data;
                  console.log(res)
                  app.globalData.userInfo = res;
                  wx.setStorageSync('userInfo', res);
              
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000,
                    success: function () {
                      setTimeout(function () {
                        //要延时执行的代码
                        wx.switchTab({
                          url: '/pages/home/index/index',
                        })
                      }, 1000) //延迟时间 

                    }
                  })
                },
                fail: function (error) {
                  console.log("error")
                }
              });
            }
          });
        } else {

        }
      }
    })

  }


})
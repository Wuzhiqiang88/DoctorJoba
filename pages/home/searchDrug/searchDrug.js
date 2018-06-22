// pages/home/searchDrug/searchDrug.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOK: false,
    showtype:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://route.showapi.com/93-96',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
          that.setData({
            list: res.data.showapi_res_body.data,
            isOK: true
          })
      }
    })
    var temData = {};
    that.setData({
      wxSearchData: temData,
    })
  },
  searchbytype:function(e){
    var that = this
    wx.request({
      url: 'http://route.showapi.com/93-97',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        "keyword":"药",
        "type":e.currentTarget.dataset.type
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          druglist: res.data.showapi_res_body.drugList,
          ret_code: res.data.showapi_res_body.ret_code,
          drugtype: e.currentTarget.dataset.type,
          isOK: true,
          showtype: false
        })
      }
    })
  },
  wxSearchInput: function (e) {
 
    var that = this;
    var inputValue = e.detail.value;
    // 页面数据
    var temData = that.data.wxSearchData;
    // 寻找提示值 
  
    // 更新数据
    temData.value = inputValue;
    // 更新视图
    that.setData({
      wxSearchData: temData
    });
  },
  // 清空输入
  wxSearchClear: function () {
    var that = this;
    // 页面数据
    var temData = that.data.wxSearchData;
    // 更新数据
    temData.value = "";
    temData.tipKeys = [];
    // 更新视图
    that.setData({
      wxSearchData: temData
    });
  },
  // 点击提示或者关键字、历史记录时的操作
  wxSearchKeyTap: function (e) {
    this.search(e.target.dataset.key);
  },
  // 确任或者回车
  wxSearchConfirm: function (e) {
    var that = this;
    var key = e.target.dataset.key;
    if (key == 'back') {
      that.myGobackFunction();
    } else {
      that.search(that.data.wxSearchData.value);
    }
  },
  search: function (inputValue) {
    var that = this;
    if (inputValue && inputValue.length > 0) {

      // 更新
      var temData = that.data.wxSearchData;
      temData.value = inputValue;
      that.setData({
        wxSearchData: temData
      });
      // 回调搜索
      that.mySearchFunction(inputValue);
    }
  },

  // 搜索回调函数  
  mySearchFunction: function (value) {
    var that = this
    list = []
    hpage = 1
    that.setData({
      hospitallist: list,
      hidden: true,
      value: value,
      isOK: true
    })


  },

  // 返回回调函数
  myGobackFunction: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  back:function(){
    this.setData({
      showtype: true
    })
  }
})
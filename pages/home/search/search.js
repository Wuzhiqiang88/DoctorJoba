// pages/home/search/search.js
var sliderWidth = 52;
var hotKeys = ['头痛', '精神病', "头晕","便秘","感冒","中毒","抽筋","骨折"];// 热点搜索推荐，[]表示不使用
var __tipKeys = ['头痛',"难受","头皮发麻","头大",'脚痛', "手痛", "咽喉痛", '肚子痛', '精神病', "头晕", "便秘", "感冒", "中毒", "抽筋", "骨折"];// 搜索匹配，[]表示不使用
var diseasepage=1;
var drugpage = 1;
var diseaselist = [];
var druglist=[];
Page({
  data: {
    tabs: ["推荐", "医生", "疾病", "药品"],
    sliderOffset: 0,
    sliderLeft: 0,
    isOK: false,
    scrollTop: 0,
    scrollHeight: 0,
    activeIndex: 0,
    hospitallist:""
  },
  // 搜索栏
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          scrollHeight: res.windowHeight
        });
      }
    })
 
    // 提示集合
    var temData = {};
    temData.hotKeys = hotKeys;
    that.setData({
      wxSearchData: temData
    })
    that.getHisKeys();
  },
  tabClick: function (e) {
    var that = this
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  getHisKeys: function () {
    var that = this;
    var value = [];
    try {
      value = wx.getStorageSync('wxSearchHisKeys')
      if (value) {
        // Do something with return value
        var temData = that.data.wxSearchData;
        temData.his = value;
        that.setData({
          wxSearchData: temData
        });
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  wxSearchInput: function (e) {
    this.setData({
      hidden:false
    })
    var that = this;
    var inputValue = e.detail.value;
    // 页面数据
    var temData = that.data.wxSearchData;
    // 寻找提示值 
    var tipKeys = [];
    if (inputValue && inputValue.length > 0) {
      for (var i = 0; i < __tipKeys.length; i++) {
        var mindKey = __tipKeys[i];
        // 包含字符串
        if (mindKey.indexOf(inputValue) != -1) {
          tipKeys.push(mindKey);
        }
      }
    }
    // 更新数据
    temData.value = inputValue;
    temData.tipKeys = tipKeys;
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
      // 添加历史记录
      that.wxSearchAddHisKey(inputValue);
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
  // 添加缓存
  wxSearchAddHisKey: function (inputValue) {
    var that = this;
    if (!inputValue || inputValue.length == 0) {
      return;
    }
    var value = wx.getStorageSync('wxSearchHisKeys');
    if (value) {
      if (value.indexOf(inputValue) < 0) {
        value.unshift(inputValue);
      }
      wx.setStorage({
        key: "wxSearchHisKeys",
        data: value,
        success: function () {
          that.getHisKeys();
        }
      })
    } else {
      value = [];
      value.push(inputValue);
      wx.setStorage({
        key: "wxSearchHisKeys",
        data: value,
        success: function () {
          that.getHisKeys();
        }
      })
    }
  },
  // 删除缓存
  wxSearchDeleteAll:function() {
    var that = this;
    wx.removeStorage({
      key: 'wxSearchHisKeys',
      success: function (res) {
        var value = [];
        var temData = that.data.wxSearchData;
        temData.his = value;
        that.setData({
          wxSearchData: temData
        });
      }
    })
  },

  // 搜索回调函数  
  mySearchFunction: function (value) {
    var that=this
    that.setData({
      isOK: false,
    })
    // do your job here
    // 跳转
    wx.request({
      url: 'http://route.showapi.com/96-109',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        "keyword":value,
        "page":1
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          article: res.data.showapi_res_body.pagebean.contentlist,
          articleNum: res.data.showapi_res_body.pagebean.allNum,
          
        })
      }
    })
    diseasepage=1
    drugpage=1
    diseaselist = []
    druglist=[]
    
    that.getDisease(diseasepage,value)
    that.getDrug(drugpage,value)
    that.setData({
      hidden:true,
      value:value
    })
  },

  // 返回回调函数
  myGobackFunction: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  getDisease: function (page, value) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8080/wxjoba/disease/allByKeyWord',
      data: {
        "keyWord":value,
        "pageNum":page,
        "pageSize":15
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          for (var i = 0; i < res.data.length; i++) {
            diseaselist.push(res.data[i])
          }
          that.setData({
            disease: diseaselist,
            isOK:true
          })
        }
      }
    })
  },
  getDrug: function (page, value) {
    var that = this
    wx.request({
      url: 'http://route.showapi.com/93-97',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        "limit": 10,
        "keyword": value,
        "page": page
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.showapi_res_body.drugList){
          for (var i = 0; i < res.data.showapi_res_body.drugList.length; i++) {
            druglist.push(res.data.showapi_res_body.drugList[i])
          }
          that.setData({
            drugNum: res.data.showapi_res_body.allResults,
            druglist: druglist,
          })
        }
      
      }
    })
  },
  bindDownLoad:function(){
    var that = this
    diseasepage = diseasepage + 1
    that.getDisease(diseasepage, that.data.value)
  },
  bindDownLoadDrug:function(){
    var that = this
    drugpage = drugpage + 1
    setTimeout(function () {
      that.getDrug(drugpage, that.data.value)
    }, 1000)
  }
})

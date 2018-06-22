// pages/home/searchHospital/searchHospital.js

var __tipKeys = ['江西省军区医院', "南昌市第三医院", "南昌大学第二附属医院", "南昌市青云谱区迎宾大道808号", '江西省胸科医院', "南昌市第九医院", "江西省精神病院", '南昌市洪都中医院', '江西省皮肤病专科医院', "中国人民解放军第九四医院", "江西省肿瘤医院", "南昌大学附属口腔医院", "江西省妇幼保健院", "南昌市第二医院", "江西省儿童医院"];// 搜索匹配，[]表示不使用
var hpage=1;
var list=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    scrollHeight: 0,
    isOK:true,
    value:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    })
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;//纬度
        var longitude = res.longitude;//经度
        that.getCity(latitude, longitude);//调用自己写的函数获得城市
      },
    })
    
    // 提示集合
    var temData = {};
    that.setData({
      wxSearchData: temData,
      num:0
    })
  },
  getCity: function (lat, lng) {
    var that = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=YLEbc9li9voReYASHn7XoT0bjrvSeGRD&location=' + lat + ',' + lng + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success  
        var city = res.data.result.addressComponent.city;
        that.getHospital(hpage,city, "南昌")
        that.setData({
          city: city,
        });
      }
    })
  },
  wxSearchInput: function (e) {
    this.setData({
      hidden: false
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
    list=[]
    hpage=1
    that.setData({
      hospitallist:list,
      hidden: true,
      value:value,
      isOK:true
    })
    that.getHospital(hpage,that.data.city,value)
   
  },

  // 返回回调函数
  myGobackFunction: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  getHospital: function (page, city,value) {
    var that = this
    wx.request({
      url: 'http://route.showapi.com/87-60',
      data: {
        "showapi_appid": '66900',
        "showapi_sign": 'fd57d66ce7ac4ecb98fc4e8e06fe7a03',
        "limit": 20,
        "cityName": city,
        "hosName": value,
        "page": page
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.showapi_res_body.hospitalList) {
        for (var i = 0; i < res.data.showapi_res_body.hospitalList.length; i++) {
          list.push(res.data.showapi_res_body.hospitalList[i])
        }
        }
        that.setData({
          num: res.data.showapi_res_body.ret_code,
          hospitallist: list,
          isOK:false
        })
      }
    })
  },
  bindDownLoad: function () {
    var that = this
    hpage = hpage + 1
    that.setData({
      isOK: true
    })
    setTimeout(function () {
      that.getHospital(hpage, that.data.city,that.data.value)
    }, 1000)
  },
})
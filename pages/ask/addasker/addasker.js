// pages/ask/addasker/addasker.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: "",
    noteMaxLen: 50, //备注最多字数
    items: [
      { name: '女', value: '女' },
      { name: '男', value: '男', checked: 'true' },
    ],
    items_2: [
      { name: '无', value: '无' ,checked: 'true'},
      { name: '有', value: '有'},
    ]
  },
  //字数限制  
  bindWordLimit: function (e) {
    var value = e.detail.value, len = parseInt(value.length);
    if (len > this.data.noteMaxLen) return;

    this.setData({
      currentNoteLen: len //当前字数  
      //limitNoteLen: this.data.noteMaxLen - len //剩余字数  
    });
  },
  bindDateChange: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  toDo:function(e){
   
    app.globalData.askerInfo.push(e.detail.value)
    wx.navigateBack({
      delta: 1,
    })
  }  
})
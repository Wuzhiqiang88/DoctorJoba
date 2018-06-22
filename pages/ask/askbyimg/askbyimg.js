// pages/ask/askbyimg/askbyimg.js
var list = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgalist: [],
    noteMaxLen: 500, //备注最多字数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    list.splice(0, list.length);
  },
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          if (list.length < 9) {
            list.push(res.tempFilePaths[i])
          }
        }
        that.setData({
          imgalist: list,
        })
      }
    })
  },
  delimage: function (e) {
    var that = this;
    list.splice(e.currentTarget.dataset.id, 1)
    that.setData({
      imgalist: list,
    })
  },
  preview: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
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
  toDo:function(){
    wx.navigateTo({
      url: '/pages/ask/askerInfo/askerInfo',
    
    })
  }
})
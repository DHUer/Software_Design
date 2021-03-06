// pages/words/sss.js
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    starList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    util.getCollection().then(function (value) {
      console.log(value)
      var a=[];
      for (var i = 0; i < value.length; i++) {
        var l = value[i].fields.title.length;
        if (l < 40) value[i].fields.btype = "gaozhong";
        else if (l < 50) value[i].fields.btype = "cet4";
        else if (l < 70) value[i].fields.btype = "cet6";
        else if (l < 80) value[i].fields.btype = "kaoyan";
        else if (l < 90) value[i].fields.btype = "ielts";
        else if (l < 100) value[i].fields.btype = "toelf";
        else value[i].fields.btype = "gre";
        var obj = value[i];
        a.push(obj)
      }
      that.setData({
        starList:a
      })
    })
  
    //that.getAllInfo(that.data.wordList, new Array())
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      console.log(this.data.starList)
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

  },
  /**
   * 跳转到具体文章界面
   */
  bindItemTap: function (e) {
    var pk = e.currentTarget.dataset['idx'];
    var btype = e.currentTarget.dataset['type'];
    // console.log("now"+e.currentTarget.dataset['idx'])
    console.log(btype)
    wx.navigateTo({
      //希望在这里返回给我本片文章的PK值
      url: '../article/article?pk=' + pk + '&btype=' + btype


    })
  },
})
// pages/words/sss.js
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wordList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    util.updateWordInfo().then(function(value){
      console.log(value)
    })
    //that.getAllInfo(that.data.wordList, new Array())
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
    util.updateWordInfo().then(function(value){
      that.setData({
        wordList: value
      })
    })
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
   * 跳转到对应的单词列表界面
   */
  toWordList: function () {
    wx.navigateTo({
      url: "./wordList/wordList"
    })
  },
})
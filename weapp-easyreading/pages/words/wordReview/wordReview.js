// pages/words/wordReview/wordReview.js
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载数据',
      icon: 'loading',
      duration: 2000
    })
    this.renderData()
    if(wx.getStorageSync('familiar') == undefined){
      wx.setStorageSync('familiar', 0)
    }
    if(wx.getStorageSync('unfamiliar') == undefined){
      wx.setStorageSync('unfamiliar', 0)
    }
    if(wx.getStorageSync('signInDay') == undefined){
      wx.setStorageSync('signInDay', 0)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.renderData()
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
  renderData: function(){
    var len = wx.getStorageSync('vocabulary').length
    var temp = wx.getStorageSync('vocabulary')
    var i = Math.floor(Math.random()*len)
    var that = this
    this.setData({
      audio: temp[i].audio,
      wordId: temp[i].wordId,
      paraphrase: temp[i].paraphrase,
      phonetic: temp[i].phonetic
    })
  },
  familiar: function(){
    var that = this
    var familiarCount = wx.getStorageSync('familiar')
    wx.setStorageSync('familiar', familiarCount + 1)
    console.log(wx.getStorageSync('familiar'))
    this.renderData()
    if(familiarCount > 10){
      wx.setStorageSync('signInDay', wx.getStorageSync('signInDay') +1)
      wx.showToast({
        title: '完成复习',
        icon: 'loading',
        duration: 1000
      })
      that.onUnload()
    }
  },
  unfamiliar: function(){
    var unfamiliarCount = wx.getStorageSync('unfamiliar')
    wx.setStorageSync('unfamiliar', unfamiliarCount + 1)
    console.log(wx.getStorageSync('unfamiliar'))
    this.renderData()
  },
  audioPlay: function(e){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = e.target.id
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  deleteWord: function(e){
    var that = this
    var word = e.currentTarget.id
    console.log(word)
    util.deleteWord(word)
    that.onLoad()
  },
  wordDetail: function(e){
    var word = e.currentTarget.id
    console.log(word)
    wx.navigateTo({
      url: '../../article/wordDetails/wordDetails?wordBasic=' + word,
    })
  }
})
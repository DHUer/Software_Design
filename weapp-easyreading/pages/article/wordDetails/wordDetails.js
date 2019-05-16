// pages/index/wordDetails/wordDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:null,
    usPhonetic: null,
    ukPhonetic: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var queryWord = options.wordBasic;
    //console.log(options.wordBasic);
    this.search(queryWord);
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
    //通过扇贝提供的api搜索该函数
  search: function(word) {
    this.setData({
      content: word
    })
    var that = this;
    wx.request({
      url: 'https://api.shanbay.com/bdc/search/?word=' + word,
      data: {},
      method: 'GET',
      success: function(res) {

        that.setData({
          pron: res.data.data.pronunciations,
          pron_audio: res.data.data.audio_addresses,
          definition: res.data.data.definition,
        })
        
        var id = res.data.data.conent_id
        that.liju(id)
      },
      fail: function() {},
      complete: function() {}
    })
    wx.setStorage({
      key: 'first_login',
      data: false,
    })

  },

  //单词发音触发函数
  read: function(e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = e.target.id
    innerAudioContext.onPlay(() => {})
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  //更多例句触发函数
  moredefen: function() {

    this.setData({
      more: !(this.data.more)
    })
  },
  //触发例句函数
  liju(id) {
    var that = this
    wx.request({
      url: 'https://api.shanbay.com/bdc/example/?vocabulary_id=' + id,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          defen: [res.data.data[0], res.data.data[1], res.data.data[3], res.data.data[4]]
        })
        that.setData({
          bottomline: res.data.data[0].translation
        })
      },
      fail: function () { },
      complete: function () { }
    })

  }
})
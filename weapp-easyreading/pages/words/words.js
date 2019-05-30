// pages/words/sss.js
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
    //此处应该返回json文件格式如下：
    /*
    "wordList":["danci1","danci2"]
    */
    var that = this
    that.setData({
      wordList: ["word", "how", "this", "new", "we", "like", "you"]
    })
    //console.log(this.data.wordList)
    var wordInfo = new Array()
    that.getAllInfo(that.data.wordList, wordInfo)
    //console.log(wx.getStorageSync('vocabulary'))
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
  /**
   * 跳转到对应的单词列表界面
   */
  toWordList: function () {
    wx.navigateTo({
      url: "./wordList/wordList"
    })
  },
  getWords: function(word){
    return new Promise(function(resolve, reject){
      wx.request({
        url:'https://api.shanbay.com/bdc/search/?word=' + word,
        method: 'GET',
        success: function(res) {
          resolve(res)
        },
        fail: function(){reject()}
      })
    })
  },
  getAllInfo: function(queryWordsList,wordInfo){
    //对所有单词信息进行请求来保证同步
    var that = this
    for(var i=0, len=queryWordsList.length; i<len; i++){
      that.getWords(queryWordsList[i]).then(function (value){
        console.log(value.data.data)
        var temp = value.data.data
        wordInfo.push(
          {
            phonetic: temp.pronunciation,
            paraphrase: temp.definition,
            wordId: temp.content,
            audio: temp.audio
          }
        )
        wx.setStorageSync('vocabulary', wordInfo)
      }, function (error){
      })
    }
  }
})
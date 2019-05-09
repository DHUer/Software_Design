//index.js
//获取应用实例
const app = getApp()
const sha = require('sha256.js')
Page({
  data: {
    showModal: false,
    result: null,
    detail_result: null,
    usPhonetic: null,
    ukPhonetic: null,
    txtArray: ["the", "classics", "identity", "the", "stars", "of", "their", "generation", "and", "provide", "the", "yearly", "narrative", "around", "which", "racing", "revolves.", "the", "2,000", "guineas,", "the", "1,000", "guineas,", "the", "oaks,", "the", "derby", "and", "the", "st.", "leger", "are", "the", "races", "that", "really", "matter,", "like", "majors", "in", "golf", "or", "grand", "slams", "in", "tennis.", "and", "they", "have", "serious", "history.", "the", "st.", "leger", "began", "in", "1776.", "they", "became", "collectively","\n\n", "known", "as", "the", "classics", "in", "1815,", "and", "ever", "since", "have", "crowned", "the", "best", "three-year-olds", "in", "training.", "with", "the", "guineas", "taking", "place", "at", "newmarket", "this", "weekend,", "cnn", "sport", "takes", "a", "closer", "look", "at", "the", "classics.", "the", "2019", "classic", "season", "kicks", "off", "saturday", "with", "the", "2,000", "guineas", "over", "the", "turf", "of", "the", "rowley", "mile", "racecourse", "in", "newmarket,", "suffolk,", "traditionally", "known", "as", "the", "home", "of", "english", "flat", "racing."]
  },
  onReady(e){
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  audioPlay() {
    this.audioCtx.play()
  },
  closeWindow: function(){
    var that = this;
    that.setData({
      showModal: false,
    })
  },

  //查询单词
  popUp: function lookUp(event) {
    var that = this;
    var words = event.currentTarget.dataset.text;
    words.trim();
    words = words.replace(",", "");
    words = words.replace(".", "");
    function getInput(input) {
      if (input.length == 0) {
        return null;
      }
      var result;
      var len = input.length;
      if (len <= 20) {
        result = input;
      } else {
        var startStr = input.substring(0, 10);
        var endStr = input.substring(len - 10, len);
        result = startStr + len + endStr;
      }
      return result;
  
    };
    var appKey = "4b4fc6a27d8efcd1";
    var key = "HAoKg2mH8PlbrOKOWkZMKxKthOxmHAky";
    var salt = new Date().getTime();
    var curtime = Math.round(new Date().getTime() / 1000);
    var from = 'auto';
    var to = 'zh-CHS';
    var str1 = appKey + getInput(words) + salt + curtime + key;
    var sign = sha.SHA256(str1);
    wx.request({
      url: 'https://openapi.youdao.com/api',
      data:{
        q: words,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        curtime: curtime,
        sign: sign,
        signType: "v3"
      },
      success: function (response) {
        that.setData({
          showModal: true,
          result: response.data
        });
        console.log(that.data.result);
        //这里有可能因为查询结果为词组所以没有音标
        if("basic" in response.data){
          if("uk-phonetic" in response.data.basic) {
            that.setData({
              ukPhonetic: response.data.basic["uk-phonetic"]
            })
          }
          if ("us-phonetic" in response.data.basic) {
            that.setData({
              usPhonetic: response.data.basic["us-phonetic"]
            })
          }
        }
      }
    })
  },
  detailListener: function () {
    var wordBasic =this.data.result.query
    console.log(wordBasic);
    wx.navigateTo({
      url: './wordDetails/wordDetails?wordBasic=' + wordBasic,
    })
  }
})
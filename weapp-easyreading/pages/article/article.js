//answer.js
var util = require('../../utils/util.js')
const sha = require('sha256.js') //此为签名加密算法
var app = getApp()
Page({
  data: {
    showModal: false,
    result: null,
    detail_result: null,
    usPhonetic: null,
    ukPhonetic: null,
  },

  onLoad: function (options) {
    console.log("当前文章id:" + options.pk)
    var that = this;
    util.getArticleWordList(options.pk).then(function (value) {
      that.setData({
        passageTitle: value.passageTitle,
        passageArray: value.passageArray,
        publishTime: value.publishTime,
        passageLevel: value.passageLevel,
        passageLable: value.passageLable,
        wordCounts: value.wordCounts
      })
    })
  },
  tapName: function (event) {
    console.log(event)
  },
  onReady(e) {
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  audioPlay() {
    this.audioCtx.play()
  },
  closeWindow: function () {
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
      data: {
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
        console.log(response);
        //这里有可能因为查询结果为词组所以没有音标
        if ("basic" in response.data) {
          if ("uk-phonetic" in response.data.basic) {
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
    var wordBasic = this.data.result.query
    console.log(wordBasic);
    wx.navigateTo({
      url: './wordDetails/wordDetails?wordBasic=' + wordBasic,
    })
  },
  addToDict: function () {
    var wordBasic = this.data.result.query
    util.addToDict(wordBasic)
  }
})

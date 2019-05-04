//index.js
//获取应用实例
const app = getApp()
const sha = require('sha256.js')
Page({
  data: {
    showModal: false,
    result: null,
    usPhonetic: null,
    ukPhonetic: null,
    txtArray:[{
      id:1,
      text:'dsss ddd'
    },{
      id:2,
      text:'as a result',
      }, {
        id: 2,
        text: 'results',
    }],
  },
  onReady(e){
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  audioPlay() {
    this.audioCtx.play()
  },

  //查询单词, 这里巧遇js中浅拷贝和深拷贝问题, 解决方案是:JSON.parse(JSON.stringify(source))
  popUp: function lookUp(event) {
    var that = this;
    var words = event.currentTarget.dataset.text;
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
          result: response.data,
          ukPhonetic: response.data.basic["uk-phonetic"],
          usPhonetic: response.data.basic["us-phonetic"],
        });
        console.log(that.data.result);
      }
    });
  }
})
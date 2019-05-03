const sha = require('sha256.js')
function lookUp(event) {
  var words = event.currentTarget.dataset.text;
  console.log(words);
  wx.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  });
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

    success: function (data) {
      console.log(data);
    }
  })

}





module.exports.lookUp = lookUp 
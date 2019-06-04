//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //这一步用来保存用户的openID，再发送请求之前要先判断本地是否已经缓存了UID，如果
    //已经缓存那么不需要重复的发送请求,卸载小程序将清除用户所有数据
    
    var temp = wx.getStorageSync('uid')
    if(temp.length == 0){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 unionId
          wx.setStorageSync('code', res.code)
          wx.request({
            url:'http://localhost:8000/news/createUser',
            data:{
              code: wx.getStorageSync('code')
            },
            success: function(respd){
              wx.setStorageSync('uid', respd.data)
            }
          })
        }
    })
    }
    //util.getUserInfo("start")
  },
  
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      }
      )
    }
  },
  globalData:{
    userInfo:null,
    categoryChanged:true,
    testList:[]
  }
})

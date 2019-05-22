//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //这一步用来保存用户的openID和sessionID
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url:'192.168.1.103',
          data:{
            code: res.code
          },
          sucess: function(res){
            //保存用户的信息到本地缓存之后每次都携带该openID和sessionID
            setStorage({
              openID: res.openID,
              sessionID: res.sessionID
            })
          }
        })
      }
    })
    console.log(getStorage('openID'))
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
      categoryChanged:true
  }
})

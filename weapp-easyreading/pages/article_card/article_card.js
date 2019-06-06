//index.js
//获取应用实例
var util = require('../../utils/util')
var app = getApp()

Page({
  data: {
    feed: [],
    articles:[],
    art_length: 0,
    thepk:0,
    curcontent:''
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {
    var that=this
    this.getData().then(function(res){
      console.log(res)
      that.setData(
        {articles:res}
      )
    util.getUserDict("start")
    })
  },
  handleSwipeOut(...args) {
    console.log(args)
  },
  handleClickCard(...args) {
    console.log(args)
  },
  getUserInfo: function(e) {

  },
  /**
   * 根据pk获取一篇文章内容
   */
  getOneArticle:function(currentpk){
    var that=this
    var promise = new Promise((resolve, reject) => {
      //console.log(currentpk)
      wx.request({
        url: 'http://localhost:8000/news/get_article_by_id/'+currentpk,
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var temp = res.data.content
          var tempList = new Array()
          for (var sentence in temp) {
            //console.log(temp[sentence])
            tempList = tempList.concat(temp[sentence])
            tempList.push(523)
          }
          resolve(tempList)
        },
        fail: function (res) {
          console.log("获取后端" + currentpk + "文章失败！")
          reject(res.data)
        }
      })
    });
  
    return promise;
  },

  getData: function () {
    var promise = new Promise((resolve, reject) => {
    var that=this
    util.getArticles().then(function(res){
      console.log("loaddata");
      var feed = res.data
      var articles_data = feed;
     // console.log(articles_data)
     var a=[];

      that.setData({
        feed: articles_data,

      });

    for(let i=0;i<feed.length;i++){
      that.getOneArticle(that.data.feed[i].pk).then(function(r){
          that.data.feed[i].fields.content = r;

         
        })

    }

      a = that.data.feed;
      resolve(a)
    });
    });
    return promise;
  }

})

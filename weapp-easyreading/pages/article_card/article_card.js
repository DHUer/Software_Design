//index.js
//获取应用实例
var util = require('../../utils/util')
var app = getApp()

Page({
  data: {
    feed: [],
    articles:[],
    art_length: 0
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    that.getData();
    util.getUserDict("start")
  },
  handleSwipeOut(...args) {
    console.log(args)
  },
  handleClickCard(...args) {
    console.log(args)
  },
  getUserInfo: function(e) {

  },
  getData: function () {
    var that=this
    util.getArticles().then(function(res){
      console.log("loaddata");
      var feed = res.data
      var articles_data = feed;
      console.log(articles_data)
     var a=[];
      for(var i=0;i<feed.length;i++){
        var obj=feed[i].fields
        a.push(obj)
      }
      that.setData({
        feed: articles_data,
        articles:a,
        art_length: articles_data.length
      });

    });
  },
    bindItemTap: function() {
        wx.navigateTo({
            url: '../article/article'
        })
    },
})

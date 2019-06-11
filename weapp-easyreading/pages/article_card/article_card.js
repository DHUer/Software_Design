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
    curcontent:'',
    lshow:true
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {
    var that=this
    this.getData().then(function(res){
      that.getContent().then(function(rrr){
      console.log(rrr)
      that.setData(
        {articles:rrr}
      )
    util.getUserDict("start")
    })
    })
  },
  onReady: function (){
      this.setData({lshow:false})
  },
  handleSwipeOut(...args) {
    console.log(args)
  },
  /*
  handleClickCard(...args) {
    console.log(">>>>>>>>>>>>>>>>>>>")
    console.log(args)
    console.log(">>>>>>>>>>>>>>>>>>>")
  },*/
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
    
    util.gettopArticles().then(function(res){
      console.log("loaddata");
      var feed = res.data.article
      that.setData({feed:feed });

   /* for(let i=0;i<feed.length;i++){
      util.getArticleWordList(feed[i].id).then(function(r){
        //that.data.feed[i].content = r.passageArray;
        console.log(r)
        templist.push(r)
      })
    }
      console.log(templist)
      resolve(templist)*/
      resolve(feed)
    });
      
    });
    return promise;
  },

  getContent:function(){
    var that=this;
    var promise = new Promise((resolve, reject) => {
      var templist = [];
      var feed=that.data.feed;
      for (let i = 0; i < feed.length; i++) {
        util.getArticleWordList(feed[i].id).then(function (r) {
          //that.data.feed[i].content = r.passageArray;
          templist.push(r);
          if (i === feed.length-1) resolve(templist)
        })
      }
    });
    return promise;
  }

})

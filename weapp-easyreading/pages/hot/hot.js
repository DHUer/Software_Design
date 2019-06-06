//discovery.js
const $vm = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    articles:[],
    art_length:0,
    feed_length: 0,
      categoryTabs:[],
      currentTab:0
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  bindItemTap: function(e) {
    var pk = e.currentTarget.dataset['idx'];
    var btype = e.currentTarget.dataset['type'];
  // console.log("now"+e.currentTarget.dataset['idx'])
  console.log(btype)
    wx.navigateTo({
      //希望在这里返回给我本片文章的PK值
       url: '../article/article?pk=' + pk+'&btype='+btype

    })
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
    manageTabs:function(){
        wx.navigateTo({
            url: 'manage/manage'
        })
    },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现刷新
  refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          //this.setData({
          //
          //});
          console.log(data);
        });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function(){
      var that = this
      util.getArticles().then(function (res) {
        console.log("loaddata");
        var feed = res.data
        var articles_data = feed;
        console.log(articles_data)
        var a = [];
        for (var i = 0; i < feed.length; i++) {
          var l=feed[i].fields.title.length;
          if(l<40)feed[i].fields.btype = "gaozhong";
          else if (l < 50) feed[i].fields.btype = "cet4";
          else if (l < 70) feed[i].fields.btype = "cet6";
          else if (l < 80) feed[i].fields.btype = "kaoyan";
          else if (l < 90) feed[i].fields.btype = "ielts";
          else if (l < 100) feed[i].fields.btype = "toelf";
          else feed[i].fields.btype = "gre";
          var obj = feed[i].fields;
          a.push(obj)
        }
        that.setData({
          feed: articles_data,
          articles: a,
          art_length: articles_data.length
        });

      });
    },


  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    var next = util.discoveryNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  },
    onShow(){
        if($vm.globalData.categoryChanged){
            util.getCategorys().then(res => this.setData({
                categoryTabs:res
            }))
            $vm.globalData.categoryChanged = false
        }
    }
});

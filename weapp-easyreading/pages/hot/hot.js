//discovery.js
const $vm = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["推荐", "圆桌", "热门", "收藏"],
    currentNavtab: "0",
    imgUrls: [
      '../../images/24213.jpg',
      '../../images/24280.jpg',
      '../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    articles: [],
    art_length: 0,
    feed_length: 0,
    categoryTabs: [],
    currentTab: 0
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  bindItemTap: function () {
    //这个地方也把pk值传给article
    wx.navigateTo({
      //希望在这里返回给我本片文章的PK值
      url: '../article/article?pk=' + pk
    })
  },
  bindQueTap: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  manageTabs: function () {
    wx.navigateTo({
      url: 'manage/manage'
    })
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现刷新
  refresh0: function () {
    var index_api = '';
    util.getData(index_api)
      .then(function (data) {
        //this.setData({
        //
        //});
        console.log(data);
      });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function () {
    var that = this
    util.getArticles().then(function (res) {
      console.log("loaddata");
      var feed = res.data
      var articles_data = feed;
      console.log(articles_data)
      var a = [];
      for (var i = 0; i < feed.length; i++) {
        var obj = feed[i].fields
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
  nextLoad: function () {
    var next = util.discoveryNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  },
  onShow() {
    if ($vm.globalData.categoryChanged) {
      util.getCategorys().then(res => this.setData({
        categoryTabs: res
      }))
      $vm.globalData.categoryChanged = false
    }
  }
});

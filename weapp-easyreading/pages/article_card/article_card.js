//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()

const nameList = ['杀生丸殿下', '犬夜叉', '巫女桔梗', '日暮戈薇'];

const generateItem = () => {
  return {
    id: Math.floor(Math.random() * 1000),
    name: nameList[Math.floor(Math.random() * 3.99)],
  }
}
Page({
  data: {
    pushList: [
      generateItem(),
      generateItem(),
      generateItem(),
      generateItem()
    ],
    feed: [],
    feed_length: 0
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    this.getData();
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
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    console.log(feed_data)
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },
})

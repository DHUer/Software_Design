// pages/test/test.js


var list = require('../../data/vocabulary.js')
//var qcloud = require('../../vendor/wafer2-client-sdk/index')
//var config = require('../../config')
var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
var columnChart = null;


var chartData = {
  main: {
    title: '总成交量',
    data: [15, 20, 45, 37],
    categories: ['2012', '2013', '2014', '2015']
  },
  sub: [{
    title: '2012年度成交量',
    data: [70, 40, 65, 100, 34, 18],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2013年度成交量',
    data: [55, 30, 45, 36, 56, 13],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2014年度成交量',
    data: [76, 45, 32, 74, 54, 35],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2015年度成交量',
    data: [76, 54, 23, 12, 45, 65],
    categories: ['1', '2', '3', '4', '5', '6']
  }]
};



Page({

  /**
   * 页面的初始数据
   */
  data: {
    da1: "",
    da2: "",
    da3: "",
    da4: "",
    daan: false,
    showDaan: false,
    complete: false,
    true_num: 0,
    score: 0,
    currentTab: 0,
    friendsData: [],
    globalData: [],
    loadNumber: 0,  //全球排名数据加载次数
    history: 0,

    chartTitle: '总成交量',
    isMainChartDisplay: true,
    yes:false,
    ans:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.search()
    this.showPie()
    this.showChart()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    return {
      title: "我在小鸡单词测试，答对了" + this.data.true_num + "道题，你也快来测一测吧！",
    }

  },
  choice(e) {
    console.log(e)
    if (e.currentTarget.id === this.data.true_word) {
      this.setData({ daan: true, true_num: this.data.true_num + 1 })
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = 'http://media-audio1.qiniu.baydn.com/us/n/ni/nice_v3.mp3'
      innerAudioContext.onPlay(() => {
      })
      this.setData({ans:true})
      this.setData({ yes: true })
      var that=this
      setTimeout(function(){
        that.next();
      },1000)
    //  this.next();

    } else {
      //this.set_score(this.data.true_num)
      this.setData({ ans: false })
      this.setData({ yes: true })
      var that=this
      setTimeout(function(){
        that.setData({ complete: true })
      },1000)
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = 'https://media-audio1.baydn.com/us%2Fs%2Fsa%2Fsad_v4.mp3'
      innerAudioContext.onPlay(() => {
      })
      if (this.data.true_num > this.data.score) {
       // this.set_score(this.data.true_num)
        this.setData({ history: this.data.true_num })
      } else {
        this.setData({ history: this.data.score })
      }
    
     // this.getRankGlobalData();

    }
   // this.setData({ showDaan: true })
  },
  search() {
    console.log("okkkkkkkkkkkkk");
    var idx = Math.floor(Math.random() * 12345) + 1
    var word = list.wordList[idx]
    console.log(word)
    var that = this
    wx.request({
      url: 'https://api.shanbay.com/bdc/search/?word=' + word,
      data: {},
      method: 'GET',
      success: function (res) {
        that.setData({
          title: res.data.data.definition.split(",")[0].split("\n")[0],
          true_word: word
        })
        console.log(that.data.title)
        var num = Math.floor(Math.random() * 400) + 1
        if (num < 100) {
          that.setData({
            da1: res.data.data.content,
            da2: list.wordList[Math.floor(Math.random() * 12345) + 1],
            da3: list.wordList[Math.floor(Math.random() * 12345) + 1],
            da4: list.wordList[Math.floor(Math.random() * 12345) + 1],
          })
        }
        if (100 < num && num < 200) {
          that.setData({
            da2: res.data.data.content,
            da1: list.wordList[Math.floor(Math.random() * 12345) + 1],
            da3: list.wordList[Math.floor(Math.random() * 12345) + 1],
            da4: list.wordList[Math.floor(Math.random() * 12345) + 1],
          })
        }
        if (num < 300 && num > 200) {
          that.setData({
            da3: res.data.data.content,
            da2: list.wordList[Math.floor(Math.random() * 12345) + 1],
            da1: list.wordList[Math.floor(Math.random() * 12345) + 1],
            da4: list.wordList[Math.floor(Math.random() * 12345) + 1],
          })
        }
        if (num > 300) {
          that.setData({
            da4: res.data.data.content,
            da2: list.wordList[Math.floor(Math.random() * 12345) + 1],
            da3: list.wordList[Math.floor(Math.random() * 12345) + 1],
            da1: list.wordList[Math.floor(Math.random() * 12345) + 1],
          })
        }
      }
    })
  },
  next() {
    this.setData({ ans: false })
    this.setData({ yes: false })
    this.setData({ showDaan: false })

    this.search()
  },
  complete() {

  },
  again() {
    this.setData({
      showDaan: false,
      complete: false,
      num: 1,
      true_num: 0
    })
    this.search()
  },
  showPie(){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    ringChart = new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: '70%',
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '收益率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '成交量1',
        data: 15,
        stroke: false
      }, {
        name: '成交量2',
        data: 35,
        stroke: false
      }, {
        name: '成交量3',
        data: 78,
        stroke: false
      }, {
        name: '成交量4',
        data: 63,
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 200,
      dataLabel: true,
      legend: false,
      background: '#f5f5f5',
      padding: 0
    });
    ringChart.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 500);
  },

  backToMainChart: function () {
    this.setData({
      chartTitle: chartData.main.title,
      isMainChartDisplay: true
    });
    columnChart.updateData({
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }]
    });
  },

  touchHandler: function (e) {
    var index = columnChart.getCurrentDataIndex(e);
    if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
      this.setData({
        chartTitle: chartData.sub[index].title,
        isMainChartDisplay: false
      });
      columnChart.updateData({
        categories: chartData.sub[index].categories,
        series: [{
          name: '成交量',
          data: chartData.sub[index].data,
          format: function (val, name) {
            return val.toFixed(2) + '万';
          }
        }]
      });

    }
  },
  showChart(){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        },
        title: 'hello',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  }
  /*,
  set_score(score) {

    if (!wx.getStorageSync("diary_id")) {
      const query = Bmob.Query('diary');
      query.set("score", score)
      query.set("head_url", wx.getStorageSync('userInfo').avatarUrl)
      query.set("title", wx.getStorageSync('userInfo').nickName)
      query.save().then(res => {
        console.log(res)

      }).catch(err => {
        console.log(err)
        wx.setStorage({
          key: 'diary_id',
          data: res.objectId,
        })
      })
    }
    else {
      const query = Bmob.Query('tableName');
      query.get(wx.getStorageSync("diary_id")).then(res => {
        console.log(res)
        res.set("score", score)
        res.set("head_url", wx.getStorageSync('userInfo').avatarUrl)
        res.set("title", wx.getStorageSync('userInfo').nickName)
        res.save()
      }).catch(err => {
        console.log(err)
      })
    }

    /*
    var openId = this.data.openId
    if (openId) {
      qcloud.request({
        login: false,
        url: `${app.appData.baseUrl}set_score`,
        data: {
          openId,
          score,
        },
        success: (res) => {
          console.log(res)

        },
        fail(error) {
          util.showModel('请求失败', error);
        },
      });
    }
    *//*
},
  getScore(openId) {
    /*
    if (openId) {
      qcloud.request({
        login: false,
        url: `${app.appData.baseUrl}get_score`,
        data: {
          openId
        },
        success: (res) => {
          let score = res.data.data;
          this.setData({
            score
          })
        },
        fail(error) {
          util.showModel('请求失败', error);
        },
      });
      
    }
    */
 /* },
  onReachBottom: function () {//下拉加载

  },
  getRankGlobalData() {//加载全球排名的数据
    const query = Bmob.Query('diary');
    //query.limit(10);
    query.order("score");
    query.find().then(res => {
      console.log(res);
      var len = res.length;
      for (var i = 0; i < 5; i++) {
        for (var j = i + 1; j < len; j++) {
          if (res[i] < res[j]) {
            var temp = res[i];
            res[i] = res[j];
            res[j] = temp;
          }
        }
      }
      this.setData({ globalData: res })


    });


    /*
      const that = this
      qcloud.request({
        login: false,
        url: app.appData.baseUrl + 'getRankGlobalData',
        data: {
          loadNumber: that.data.loadNumber
        },
        success: (res) => {
          that.setData({
            globalData: that.data.globalData.concat(res.data.data),//数据叠加
            loadNumber: that.data.loadNumber + 1
          })
        },
        fail(error) {
          util.showModel('请求失败', error);
          console.log('request fail', error);
        },
      })
      */
//},

})


// pages/test/test.js


var list = require('../../data/vocabulary.js')

var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
var columnChart = null;


var chartData = {
  main: {
    title: '',
    data: [15, 20, 45, 37,85,0],
    categories: ['高中', 'CET-4', 'CET-6', '考研','雅思','托福','GRE']
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
    history: 0,

    chartTitle: '总成交量',
    isMainChartDisplay: true,

    yes:false,
    ans:false,
    lshow:false,

    wordsNum:0,

    unknownNum:0,
    correctNum:0,
    wrongNum:0,

      allList:{},
    cet4List:[],
    cet6List:[],
    gaozhongList:[],
    greList:[],
    ieltsList:[],
    kaoyanList:[],
    toeflList:[],

    onecorrectnum:0,
      correctList:[],

    testList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this
      util.getWords().then(function(res){
          console.log("loading words")
          const feed=res.data;

          that.setData({
              /* cet4List:feed.cet4,
               cet6List:feed.cet6,
               gaozhongList:feed.gaozhong,
               greList:feed.gre,
               ieltsList:feed.ielts,
               kaoyanList:feed.kaoyan,
               toeflList:feed.toefl*/
              allList:feed
          });
          that.search()
          // this.showPie()
          //that.showChart()
      });

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

  unknown(){
    var x = this.data.unknownNum + 1
    this.setData({ unknownNum: x })
    this.setData({ ans: false })
    this.setData({ yes: true })

      let num=this.data.wordsNum-1
      var obj = {}
      obj.word = this.data.true_word
      obj.flag = 0
      var l;
      if(num<10) l=this.data.cet4List;
      else if(num<20)l=this.data.kaoyanList;
      /*else if(num<30)l=this.data.ieltsList;
      else if(num<40)l=this.data.greList;
      else if(num<50) l=this.data.cet6List;
      else if(num<60)l=this.data.gaozhongList;
      else  l=this.data.toeflList;*/
      l.push(obj)
      this.setData({l})
      console.log(this.data.cet4List)

    if ((num + 1) % 10 === 0) {
      let temp = this.data.onecorrectnum;
      let ll = this.data.correctList;
      ll.push(temp * 10)
      this.setData({
        onecorrectnum:0,
        correctList:ll
      })
    }

    var that = this
    setTimeout(function () {
      that.next()
    }, 600)
  },

  choice(e) {
    console.log(e)
    if (e.currentTarget.id === this.data.true_word) {
      var x = this.data.correctNum + 1
      this.setData({ correctNum: x })
      var y = this.data.onecorrectnum + 1
      this.setData({ onecorrectnum: y })
    /*  const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = 'http://media-audio1.qiniu.baydn.com/us/n/ni/nice_v3.mp3'
      innerAudioContext.onPlay(() => {
      })*/

      this.setData({ans:true})
      this.setData({ yes: true })

        let num=this.data.wordsNum-1
        var obj = {}
        obj.word = this.data.true_word
        obj.flag = 1
        var l;
        if(num<10) l=this.data.cet4List;
        else if(num<20)l=this.data.kaoyanList;
      /*  else if(num<30)l=this.data.ieltsList;
        else if(num<40)l=this.data.greList;
        else if(num<50) l=this.data.cet6List;
        else if(num<60)l=this.data.ieltsList;
        else  l=this.data.toeflList;*/
      l.push(obj)
      this.setData({l})

      if ((num + 1) % 10 === 0) {
        let temp = this.data.onecorrectnum;
        let ll = this.data.correctList;
        ll.push(temp * 10)
        this.setData({
          onecorrectnum: 0,
          correctList: ll
        })
      }

      var that=this
      setTimeout(function(){
        that.next();
      },500)
    //  this.next();

    } else {
      //this.set_score(this.data.true_num)
      var x = this.data.wrongNum+ 1
      this.setData({ wrongNum: x })

      this.setData({ ans: false })
      this.setData({ yes: true })

        let num=this.data.wordsNum-1
        var obj = {}
        obj.word = this.data.true_word
        obj.flag = -1
        var l;
        if(num<10) l=this.data.cet4List;
        else if(num<20)l=this.data.kaoyanList;
        /*else if(num<30)l=this.data.ieltsList;
        else if(num<40)l=this.data.greList;
        else if(num<50) l=this.data.cet6List;
        else if(num<60)l=this.data.ieltsList;
        else  l=this.data.toeflList;*/
        l.push(obj)
        this.setData({l})

      if ((num + 1) % 10 === 0) {
        let temp = this.data.onecorrectnum;
        let ll = this.data.correctList;
        ll.push(temp * 10)
        this.setData({
          onecorrectnum: 0,
          correctList: ll
        })
      }

      var that=this
      setTimeout(function(){
         that.next()
      },500)

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
    searchOneType(num){
    var that=this
        const promise = new Promise((resolve, reject) => {


        });
    },
  search() {
    var that=this
      let num=that.data.wordsNum
      if(num<20){

   /* var idx = Math.floor(Math.random() * 12345) + 1
    var word = list.wordList[idx]*/
          var word;
          if(num<10) word = that.data.allList.cet4[num]
          else if(num<20)word = that.data.allList.kaoyan[num-10]
          else if(num<30)word = that.data.allList.ielts[num-20]
          else if(num<40)word = that.data.allList.gre[num-30]
          else if(num<50)word = that.data.allList.cet6[num-40]
          else if(num<60)word = that.data.allList.ielts[num-50]
          else word = that.data.allList.toelf[num-60]

          console.log(num)
          console.log(word)

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
          const x = num + 1;
          that.setData({wordsNum:x})
    }
else{
    this.setData({lshow: true});
    this.complete()
}
  },
  next() {
    this.setData({ ans: false })
    this.setData({ yes: false })
    this.search()
  },
  complete() {
    console.log(this.data.unknownNum)
    console.log(this.data.wrongNum)
    console.log(this.data.correctNum)
    console.log(this.data.correctList)
    this.showPie()
    this.showChart()
    var that=this
    setTimeout(function(){
      that.setData({ lshow: false })
      that.setData({complete:true})
    },2500)

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
    var windowWidth = 400;
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
        ringWidth: 15,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name:'',
        color: '#38c938',
        fontSize: 25
      },
      subtitle: {
        name: '认识率',
        color: '#666666',
        fontSize: 10
      },
      series: [
        {
          name: '认识',
          data: this.data.correctNum,
          stroke: false
        },
        {
        name: '不认识',
        data: this.data.unknownNum,
        stroke: false
      }, {
        name: '选错',
        data: this.data.wrongNum,
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth,
      height: 250,
      dataLabel: true,
      legend: true,
      background: '#f5f5f5',
      padding: 0
    });
    ringChart.addEventListener('renderComplete', () => {
      console.log('renderComplete');
    });
    setTimeout(() => {
      ringChart.stopAnimation();
    }, 600);
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
          return val.toFixed(2) + '%';
        }
      }]
    });
  },
  toDetailwords:function(e){
    var index = columnChart.getCurrentDataIndex(e);
    console.log(index)
    if (index > -1) {
      console.log(index)
      if (index === 0) app.testList = this.data.cet4List;
      else if (index === 1) app.testList = this.data.kaoyanList;
      else if (index === 2) app.testList = this.data.ieltsList;
      else if (index === 3) app.testList = this.data.greList;
      else if (index === 4) app.testList = this.data.cet6List;
      else if (index === 5) app.testList = this.data.gaozhongList;
      else if (index === 6) app.testList = this.data.toeflList;
      
      wx.navigateTo({
        url: "./res/res"
      })
    }
  },
  touchHandler: function (e) {
    var index = columnChart.getCurrentDataIndex(e);
    console.log(index)
    if (index > -1 ) {
      console.log("ok")
      wx.navigateTo({
        url: "./res/res"
      })
    }
   /* var index = columnChart.getCurrentDataIndex(e);
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
            return val.toFixed(2) + '%';
          }
        }]
      });

    }*/

  },
    handleData(){
       var num1=0
        let l=this.data.correctList
      for(var i=0;i<this.data.cet4List;i++){
        if(this.data.cet4List[i].flag===1)num1++
        }
        console.log(num1)
        l.push(num1*10)

        var num2=0;
        for(var i=0;i<this.data.kaoyanList;i++){
            if(this.data.kaoyanList[i].flag===1)num2++
        }
        l.push(num2*10);
        this.setData({l})
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
        data: this.data.correctList,
        format: function (val, name) {
          return val.toFixed(2) + '%';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '%';
        },
        title: '',
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


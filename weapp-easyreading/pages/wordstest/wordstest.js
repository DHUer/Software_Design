// pages/test/test.js


var list = require('../../data/vocabulary.js')

var util = require('../../utils/util.js')
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
var columnChart = null;


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

    chartTitle: '词汇覆盖表',
    isMainChartDisplay: true,

    yes:false,
    ans:false,
    lshow:false,

    wordsNum:0,

    unknownNum:0,
    correctNum:0,
    wrongNum:0,

    title:"",

      allList:{},
    cet4List:[],
    cet6List:[],
    gaozhongList:[],
    greList:[],
    ieltsList:[],
    kaoyanList:[],
    toeflList:[],

    onecorrectnum:0,
      correctList:[0,0,0,0,0,0,0],

    testList:[],
    testres:{
      'gaozhong':0,
      'cet4':0,
      'cet6':0,
      'kaoyan':0,
      'ielts':0,
      'toefl':0,
      'gre':0
    }
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
              allList:feed
          });
          that.search()
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
/**
 * 选择不认识
 */
  unknown(){
    var x = this.data.unknownNum + 1
    this.setData({ unknownNum: x })
    this.setData({ ans: false })
    this.setData({ yes: true })

      let num=this.data.wordsNum-1
      var obj = {}
      obj.word = this.data.true_word
      obj.flag = 0
      obj.mean=this.data.title
      var l;
    if (num % 7 === 0) l = this.data.gaozhongList;
    else if (num % 7 === 1) l = this.data.cet4List;
    else if (num % 7 === 2) l = this.data.cet6List;
    else if (num % 7 === 3) l = this.data.kaoyanList;
    else if (num % 7 === 4) l = this.data.ieltsList;
    else if (num % 7 === 5) l = this.data.toeflList;
    else l = this.data.greList;
      l.push(obj)
      this.setData({l})
      console.log(this.data.cet4List)


    var that = this
    setTimeout(function () {
      that.next()
    }, 600)
  },
/**
 * 选择答案
 */
  choice(e) {
    console.log(e)
    if (e.currentTarget.id === this.data.true_word) {//正确
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
      obj.mean = this.data.title
        var l,correctnum,cl;
        cl=this.data.correctList;
      if (num % 7 === 0) { 
        l = this.data.gaozhongList;
        cl[0]=cl[0]+1;
        }
      else if (num % 7 === 1) { 
        l = this.data.cet4List;
        cl[1]=cl[1]+1;
        }
      else if (num % 7 === 2) {
        l = this.data.cet6List;
        cl[2]=cl[2]+1;
      }
      else if (num % 7 === 3) {
         l = this.data.kaoyanList;
          cl[3]=cl[3]+1; 
          }
      else if (num % 7 === 4) {
         l = this.data.ieltsList;
          cl[4]+=1;
           }
      else if (num % 7 === 5) { 
        l = this.data.toeflList;
        cl[5]+=1; 
        }
      else {
         l = this.data.greList;
         cl[6]+=1;
          }
      l.push(obj)
      this.setData({l})
      this.setData({cl})


      var that=this
      setTimeout(function(){
        that.next();
      },500)
    //  this.next();

    } else {//选错
      //this.set_score(this.data.true_num)
      var x = this.data.wrongNum+ 1
      this.setData({ wrongNum: x })

      this.setData({ ans: false })
      this.setData({ yes: true })

        let num=this.data.wordsNum-1
        var obj = {}
        obj.word = this.data.true_word
        obj.flag = 0
      obj.mean = this.data.title
        var l;
      if (num % 7 === 0) l = this.data.gaozhongList;
      else if (num % 7 === 1) l = this.data.cet4List;
      else if (num % 7 === 2) l = this.data.cet6List;
      else if (num % 7 === 3) l = this.data.kaoyanList;
      else if (num % 7 === 4) l = this.data.ieltsList;
      else if (num % 7 === 5) l = this.data.toeflList;
      else l = this.data.greList;
        l.push(obj)
        this.setData({l})

      var that=this
      setTimeout(function(){
         that.next()//抽取下一个词
      },500)
    }
  },
  /**
   * 查找测试词汇
   */
  search() {
    var that=this
      let num=that.data.wordsNum
      if(num<70){

   /* var idx = Math.floor(Math.random() * 12345) + 1
    var word = list.wordList[idx]*/
          var word;
          if(num%7===0) word = that.data.allList.gaozhong[parseInt(num/7)]
          else if (num % 7 === 1) word = that.data.allList.cet4[parseInt(num/7)]
          else if (num % 7 === 2) word = that.data.allList.cet6[parseInt(num/7)]
          else if (num % 7 === 3) word = that.data.allList.kaoyan[parseInt(num/7)]
          else if (num % 7 === 4) word = that.data.allList.ielts[parseInt(num/7)]
          else if (num % 7 === 5) word = that.data.allList.toefl[parseInt(num/7)]
          else word = that.data.allList.gre[parseInt(num/7)]

          console.log(parseInt(num/7))
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
                  //随机放置正确答案
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
          //已测试次数+1
          const x = num + 1;
          that.setData({wordsNum:x})
    }
else{
  var that=this
    that.setData({lshow: true});
    this.complete()
}
  },
  //获取下一个测试词汇
  next() {
    this.setData({ ans: false })
    this.setData({ yes: false })
    this.search()
  },
  //完成测试，显示测试数据图表
  complete() {
    console.log(this.data.unknownNum)
    console.log(this.data.wrongNum)
    console.log(this.data.correctNum)
    console.log(this.data.correctList)
    console.log(this.data.wordsNum)
    this.coList();
    this.showPie()
    this.showChart()
    //util.setTest()
    var that=this
    setTimeout(function(){
      that.setData({ lshow: false })
      that.setData({complete:true})
    },2000)

  },
  //完成测试后，处理CorrectList
 coList(){
   var that = this
    return new Promise(function(resolve,reject){
      var testNum=that.data.wordsNum-1;
      var cl=that.data.correctList;
      var tr = that.data.testres;
      var flag1=parseInt(testNum/7);
      var flag2=testNum%7;
      for(var i=0;i<7;i++){
        if(i<=flag2){
          cl[i]=(cl[i]/(flag1+1))*100;
        }
        else if(flag1!=0)cl[i]=cl[i]*100/flag1;
      }

      that.setData({cl})
      console.log(cl)
    })
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
  toDetailwords:function(e){
    var index = columnChart.getCurrentDataIndex(e);
    console.log(index)
    if (index > -1) {
      console.log(index)
      if (index === 0) app.testList = this.data.gaozhongList;
      else if (index === 1) app.testList = this.data.cet4List;
      else if (index === 2) app.testList = this.data.cet6List;
      else if (index === 3) app.testList = this.data.kaoyanList;
      else if (index === 4) app.testList = this.data.ieltsList;
      else if (index === 5) app.testList = this.data.toeflList;
      else if (index === 6) app.testList = this.data.greList;
      
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
      categories: ['高中', 'CET-4', 'CET-6', '考研', '雅思', '托福', 'GRE'],
      series: [{
        name: '',
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
  },
  /**
   * 中途退出测试
   */
  quit(){
    var that = this
    that.setData({ lshow: true });
    this.complete()
  }

})


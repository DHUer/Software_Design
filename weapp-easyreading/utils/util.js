const Promise = require('./Promise.js')
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
};

var index = require('../data/data_index.js')
//var index = require('../data/data_test.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')

function getData(url){
  return new Promise(function(resolve, reject){
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}
//192.168.43.240
function getArticles(){
  var promise=new Promise((resolve,reject)=>{
  wx.request({
    url: 'http://localhost:8000/news/get_brief/',
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      console.log("获取后端文章")
      resolve(res)
    },
    fail: function (res) {
      console.log("获取后端数据失败！")
      reject(res.data)
    }
  })
  });

  return promise;
}

//得到测试的单词
function getWords(){
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: 'http://localhost:8000/news/get_test_words/',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log("获取测试单词")
                resolve(res)
            },
            fail: function (res) {
                console.log("获取测试单词失败！")
                reject(res.data)
            }
        })
    });
    return promise;
}

function getData2(){
  wx.request({
    url: 'http://192.168.43.240:8000/news/get_brief/',
    success: function(res){
      console.log("获取后端数据")
      console.log(res)
    },
    fail: function (res) {

    }
  });
  console.log(index.index);
  return index.index;
}

//用户返回测试单词数据
function setTest(test) {
  wx.request({
    url: 'http://localhost:8000/news/get_test_history/' + wx.getStorageSync('uid') + '/' + test + '/',
    success: function (resp) {
      wx.showToast({
        title: "success",
        icon: 'success',
        duration: 1000,
        mask: true
      })
      console.log(resp)
    }
  })
}

function getNext(){
  return index_next.next;
}

function getDiscovery(){
  return discovery.discovery;
}

function discoveryNext(){
  return discovery_next.next;
}

const categorysJson = require('./category')
function getCategorys(){
    return new Promise((resolve,reject) => {
        // [{id:1,order:2...}]
        var liked = wx.getStorageSync('USER_COLLECT') || [];
        var categorys = categorysJson.data

        categorys.forEach(category => {
            if(!liked.length){
                category.selected = true
            }else{
                category.selected = false
                liked.forEach(like =>
                    category.lanmu_id === like.id && (category.selected = true)
                )
            }
        })

        resolve(categorys)
    })
}

//用户添加单词到服务器中的单词本
function addToDict(word){
  wx.request({
    url:'http://localhost:8000/news/voca_book/' + 0 + '/' + wx.getStorageSync('uid') + '/' + word +'/',
    success: function(resp){
      wx.showToast({
        title:"success",
        icon:'success',
        duration:1000,
        mask:true
      })
      console.log(resp)
    }
  })
}

//返回用户的生词列表
function getUserDict(){
  return new Promise(function(resolve, reject){
    wx.request({
      url:'http://localhost:8000/news/voca_book/' + 2 + '/' + wx.getStorageSync('uid') + '/' + "word" +'/',
      success: function(resp){
        //console.log(resp)
        var tempList = new Array()
        for(let temp in resp.data){
          tempList.push(temp)
        }
        wx.setStorageSync('wordList', tempList)
        resolve(tempList)
        
      },
      fail: function(resp){
        reject(resp)
      }
    })
  })
}

//删除单词
function deleteWord(word){
  wx.request({
    url: 'http://localhost:8000/news/voca_book/' + 1 + '/' + wx.getStorageSync('uid') + '/' + word + '/',
    success: function(resp){
      wx.showToast({
        title:"success",
        icon:'success',
        duration:1000,
        mask:true
      })
    },
    fail: function(resp){
      wx.showToast({
        title:"failed",
        image:'../images/ring.png',
        duration:1000
      })
    }
  })
}

//查询单词的细节
function getWords_detail(word){
  return new Promise(function(resolve, reject){
    wx.request({
      url:'https://api.shanbay.com/bdc/search/?word=' + word,
      method: 'GET',
      success: function(res) {
        resolve(res)
      },
      fail: function(){reject()}
    })
  })
}

//更新用户的单词信息，方便本地的显示
function updateWordInfo(){
  return new Promise(function(resolve, reject){
    getUserDict().then(function(value){
      //console.log(wordList)
      var wordInfo = new Array()
      //console.log(value.length)
      for(var i=0, len=value.length; i<len; i++){
        getWords_detail(value[i]).then(function (value){
          var temp = value.data.data
          wordInfo.push(
            {
              phonetic: temp.pronunciation,
              paraphrase: temp.definition,
              wordId: temp.content,
              audio: temp.audio,
            }
          )
          wx.setStorageSync('vocabulary', wordInfo)
          wx.setStorageSync('wordLength', wordInfo.length)
        }, function (error){
        })
      }
      resolve(wx.getStorageSync('vocabulary'))
    })
  })
}

//获取文章的列表的单词信息，方便进行渲染
function getArticleWordList(pk){
  return new Promise(function(resolve, reject){
    wx.request({
      url: 'http://localhost:8000/news/get_article_by_id/' + pk + '/',
      success: function(resp){
        var temp = resp.data.content
        var tempList = new Array()
        console.log(resp.data.content)
        for(var sentence in temp){
          
          tempList = tempList.concat(temp[sentence])
          tempList.push(523)
          
        }
        
        var result = new Object()
        result.passageTitle = resp.data.title
        result.passageArray = tempList
        result.publishTime = resp.data.date
        result.passageLevel = "CET-4"
        result.passageLable = resp.data.type
        result.wordCounts = resp.data.num
        console.log(result)
        resolve(result)
      },
      fail: function(resp){
        console.log(resp)
      }
    })
  })
}

//收藏文章
function addToFavorite(pk){
  wx.request({
    url: 'http://localhost:8000/news/collect_article/' + pk + '/' + wx.getStorageSync('uid')
  })
}
module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
module.exports.getCategorys=getCategorys;

module.exports.getArticles = getArticles;
module.exports.getWords=getWords;
module.exports.addToDict = addToDict;
module.exports.getUserDict = getUserDict;
module.exports.deleteWord = deleteWord;
module.exports.updateWordInfo = updateWordInfo;
module.exports.getArticleWordList = getArticleWordList;
module.exports.addToFavorite = addToFavorite;
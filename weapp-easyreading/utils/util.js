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

module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;
module.exports.getCategorys=getCategorys;

module.exports.getArticles = getArticles;
module.exports.getWords=getWords;



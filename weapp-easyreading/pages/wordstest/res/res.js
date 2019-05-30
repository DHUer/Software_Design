var app = getApp();
Page({
  data: {
    list:[]
  },

//获取对应分类单词表
    onLoad: function () {
      this.setData({
      
        //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList

        list: app.testList

      }); 
      console.log(this.data.list)
  }


});
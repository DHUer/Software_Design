var app = getApp();


Page({
  data: {
    list: [
     /* { word: "administration", flag: 1, mean: " n. 行政" },
      { word: "pale", flag: 1, mean: " n. 尖木桩" },
      { word: "crime", flag: 1, mean: " n. 犯罪" },
      { word: "illustrate", flag: 1, mean: " vt. 举例说明" },
      { word: "attitude", flag: 1, mean: " n. 态度" },
      { word: "palm", flag: -1, mean: " n. 手掌" },
      { word: "criticism", flag: 0, mean: " n. 批评" }*/
    ],

    btns: [
      {
        text: '添加到单词本',
        color: '#ffffff',
        background: '#35b59c',
        disabled: false,
        size: '14px',
        type: 'added',
      }
    ],
  },

//获取对应分类单词表
    onLoad: function () {
      this.setData({
      
        //jsonData.dataList获取json.js里定义的json数据，并赋值给dataList

         list: app.testList

      }); 
      console.log(this.data.list)
      var l=this.data.btns;
      for(var i=0;i<this.data.list.length;i++){
          var obj={}
          obj.text=this.data.list[i].mean
          l.push(obj)
      }
      this.setData({l})
  },

added() {
    wx.showModal({
      title: '提示',
      content: '成功添加',
      showCancel: false,
    });
  },
  toaWord(){

  }
});
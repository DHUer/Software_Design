Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  onLoad: function () {
    console.log("card onload")
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap() {
      console.log('tap')
    },
    bindItemTap: function () {
      console.log(this.data.itemData)
      var pk = this.data.itemData.pk;
      var btype=this.data.itemData.fields.btype;
      wx.navigateTo({
        //希望在这里返回给我本片文章的PK值
        url: '../article/article?pk=' + pk + "&btype="+btype

      })
    }
  }
})

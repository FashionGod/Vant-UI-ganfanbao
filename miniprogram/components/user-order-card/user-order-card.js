
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderItem:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: 3,
    payTime: '',
    statusText: [
      '已下单',
      '备餐完成',
      '骑手送餐',
      '餐已送达'
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onChange(event) {
      this.setData({
        value: event.detail,
      });
    },
    
    navigateToViews(e){
      wx.showToast({
        title: '点击查看评价',
        icon: 'none'
      })
    }
  }
})

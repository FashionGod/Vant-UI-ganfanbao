// components/merchant-order-card/merchant-order-card.js
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
    activeNames: ['1'],// 控制面板收缩
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.setData({
        activeNames: event.detail,
      });
    },
    finished() {
      this.triggerEvent("finishedPrepare", {})
    }
  }
})

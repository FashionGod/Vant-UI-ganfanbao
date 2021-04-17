// pages/riderPages/order/components/riderMissionCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderItem: {
      type: Object,
      value: {}
    },
    tabsActive: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    grab() {
      this.triggerEvent("grabOrder", {})
    }
  }
})

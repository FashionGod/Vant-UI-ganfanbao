// components/shopCard/shopCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    value: 3,
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
  }
})

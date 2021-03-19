// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 动画animation
    animation_class: null
  },

  onLoad() {
    console.log(app.globalData)
  },
  // 联系我们
  contactOfficial() {
    wx.makePhoneCall({
      phoneNumber: '15541155173',
      success:(res)=> {
      },
      fail:(res)=> {
      },
    })
  },
  // 收货地址
  shippingAddress() {
    wx.chooseAddress({
      success: (res) => {
        console.log(res)
      },
      fail:(res) => {
        console.log(res)
      }
    })
  },
  onReady: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "linear",
      delay: 0,
    })
    animation.opacity(1).step();
    this.setData({
      animation_class: animation.export(),
    })
  }
})
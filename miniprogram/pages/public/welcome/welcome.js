// miniprogram/pages/public/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  // 跳转至用户页
  JumpToUser(){
    wx.switchTab({
      url: '../../home/home',
    })
  },
  // 跳转至商家登录页
  JumpToMerchant(){
    wx.navigateTo({
      url: '../../public/merchant-sign-in-or-up/sign-in/sign-in',
    })
  },
  // 跳转至骑手登录页
  JumpToRider(){
    wx.navigateTo({
      url: '../../public/rider-sign-in-or-up/sign-in/sign-in',
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '干饭饱',
      path: 'pages/public/welcome/welcome'
    }
  }
})
// miniprogram/pages/riderPages/sign-in/sign-in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null,
    password: null,
    password_state_icon:'closed-eye',
    password_state_type:'password'
  },
  // 密码的显隐
  onClickIcon() {
    this.setData({
      password_state_icon: this.data.password_state_icon=='closed-eye'? 'eye':'closed-eye',
      password_state_type: this.data.password_state_type ? false:true,
    })
  },
  login() {
    wx.reLaunch({
      url: '../../../../riderPackage/pages/riderPages/order/order',
    })
  },
  register() {
    wx.navigateTo({
      url: '../../../public/rider-sign-in-or-up/sign-up/sign-up',
    })
  },
})
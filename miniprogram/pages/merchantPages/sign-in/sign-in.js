// miniprogram/pages/merchantPages/sign-in/sign-in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    phoneNumber: null,
    password: null,
    password_state_icon:'closed-eye',
    password_state_type: true
  },
  onClickIcon() {
    this.setData({
      password_state_icon: this.data.password_state_icon=='closed-eye'? 'eye':'closed-eye',
      password_state_type: this.data.password_state_type ? false:true,
    })
  },
  login() {
    wx.navigateTo({
      url: '../../merchantPages/order/order',
    })
  },
  register() {
    wx.navigateTo({
      url: '../../merchantPages/sign-up/sign-up',
    })
  },
})
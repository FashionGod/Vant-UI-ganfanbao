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
    wx.reLaunch({
      url: '../../../../merchantPackage/pages/merchantPages/order/order',
    })
  },
  register() {
    wx.navigateTo({
      url: '../../../public/merchant-sign-in-or-up/sign-up/sign-up',
    })
  },
})
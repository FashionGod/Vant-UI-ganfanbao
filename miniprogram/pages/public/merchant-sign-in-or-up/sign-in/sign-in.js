// miniprogram/pages/merchantPages/sign-in/sign-in.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password_state_icon:'closed-eye',
    password_state_type: true,
    phoneNumberEmptyFlag: false,
    passwordEmptyFlag: false
  },
  // 密码的显隐
  onClickIcon() {
    this.setData({
      password_state_icon: this.data.password_state_icon === 'closed-eye'? 'eye':'closed-eye',
      password_state_type: this.data.password_state_type ? false:true,
    })
  },
  focusphoneNumber() {
    this.setData({
      phoneNumberEmptyFlag: false
    })
  },
  focusPassword() {
    this.setData({
      passwordEmptyFlag: false
    })
  },
  // 手机号判空
  checkphoneNumberEmpty(e) {
    if (e.detail.value.trim() === '') {
      this.setData({
        phoneNumberEmptyFlag: true
      })
    }
    else {
      this.setData({
        phoneNumberEmptyFlag: false
      })
    }
  },
  // 密码判空
  checkPasswordEmpty(e) {
    if (e.detail.value.trim() === '') {
      this.setData({
        passwordEmptyFlag: true
      })
    }
    else {
      this.setData({
        passwordEmptyFlag: false
      })
    }
  },
  // 点击登录
  formSubmit(e) {
    let formValue = e.detail.value
    // 判空
    for(let item in formValue) {
      if (formValue[item].trim() === '') {
        wx.showModal({
          title: '',
          content: '手机号或密码不能为空',
          showCancel: false,
        })
        return
      }
    }
    wx.showLoading({
      title: '登陆中...',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {
        role: 1,
        phoneNumber: formValue.phoneNumber,
        password: formValue.password,
      },
      success: res => {
        let {mess} = res.result
        if (mess.code === 1) {
          app.globalData.loginInfo = {
            id: mess.data.data._id
          }
          wx.reLaunch({
            url: '../../../../merchantPackage/pages/merchantPages/order/order',
          })
        }
        else if (mess.code === 2) {
          wx.showModal({
            title: '',
            content: '密码错误',
            showCancel: false,
          })
        }
        else if (mess.code === 3) {
          wx.showModal({
            title: '',
            content: '手机号不存在',
            showCancel: false,
          })
        }
        wx.hideLoading({})
      },
      fail: res => {
        wx.hideLoading({})
      },
    })
  },
  register() {
    wx.navigateTo({
      url: '../../../public/merchant-sign-in-or-up/sign-up/sign-up',
    })
  },
})
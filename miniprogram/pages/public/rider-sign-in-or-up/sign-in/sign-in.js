// miniprogram/pages/riderPages/sign-in/sign-in.js
const app = getApp()
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
    if (e.detail.value.trim() == '') {
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
    if (e.detail.value.trim() == '') {
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
      if (formValue[item].trim() == '') {
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
        role: 2,// 1商家 2骑手
        phoneNumber: formValue.phoneNumber,
        password: formValue.password,
      },
      success: res => {
        console.log(res)
        let {mess} = res.result
        app.globalData.loginInfo = {
          id: mess.data.data._id,
          riderName: mess.data.data.riderSignUpInfo.name,
          riderPhone: mess.data.data.riderSignUpInfo.phoneNumber
        }
        if (mess.code == 1) {
          wx.reLaunch({
            url: '../../../../riderPackage/pages/riderPages/order/order',
          })
        }
        else if (mess.code == 2) {
          wx.showModal({
            title: '',
            content: '密码错误',
            showCancel: false,
          })
        }
        else if (mess.code == 3) {
          wx.showModal({
            title: '',
            content: '手机号不存在',
            showCancel: false,
          })
        }
        wx.hideLoading({})
      },
      fail: res => {
        console.log(res)
        wx.hideLoading({})
      },
    })
  },
  register() {
    wx.navigateTo({
      url: '../../../public/rider-sign-in-or-up/sign-up/sign-up',
    })
  },
})
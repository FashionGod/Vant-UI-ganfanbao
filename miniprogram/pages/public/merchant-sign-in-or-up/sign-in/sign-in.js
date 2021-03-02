// miniprogram/pages/merchantPages/sign-in/sign-in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    userName: '',
    password: '',
    password_state_icon:'closed-eye',
    password_state_type: true,
    userNameEmptyFlag: false,
    passwordEmptyFlag: false
  },
  onClickIcon() {
    this.setData({
      password_state_icon: this.data.password_state_icon=='closed-eye'? 'eye':'closed-eye',
      password_state_type: this.data.password_state_type ? false:true,
    })
  },
  focusUserName() {
    this.setData({
      userNameEmptyFlag: false
    })
  },
  focusPassword() {
    this.setData({
      passwordEmptyFlag: false
    })
  },
  // 用户名判空
  checkUserNameEmpty(e) {
    if (e.detail.value.trim() == '') {
      this.setData({
        userNameEmptyFlag: true
      })
    }
    else {
      this.setData({
        userNameEmptyFlag: false
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
          content: '用户名或密码不能为空',
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
        userName: formValue.userName,
        password: formValue.password,
      },
      success: res => {
        console.log(res)
        let {mess} = res.result
        if (mess.code == 1) {
          wx.reLaunch({
            url: '../../../../merchantPackage/pages/merchantPages/order/order',
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
            content: '用户名不存在',
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
      url: '../../../public/merchant-sign-in-or-up/sign-up/sign-up',
    })
  },
})
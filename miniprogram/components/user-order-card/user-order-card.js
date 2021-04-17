import {UserModel}
from '../../models/user/user.js'
const userModel = new UserModel()
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderItem: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: 3,
    payTime: '',
    statusText: [
      '已下单',
      '备餐完成',
      '骑手送餐',
      '餐已送达'
    ],
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

    navigateToViews(e) {
      let that = this
      wx.getStorage({
        key: 'userInfo',
        success:(res)=> {
          wx.navigateTo({
            url: '../../pages/userPages/evaluate/evaluate',
          })
        },
        fail:(res)=> {
          wx.getUserProfile({
            desc: '评价功能的信息展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              wx.showLoading({
                title: '加载中',
              })
              userModel.updateUserInfo(res.userInfo)
              .then(res => {
                wx.hideLoading({})
                if (res.success) {
                  wx.setStorage({
                    data: res.data,
                    key: 'userInfo',
                  })
                  app.globalData.canIUseGetUserProfile = true
                  wx.navigateTo({
                    url: '../../pages/userPages/evaluate/evaluate',
                    events: {
      
                    },
                    success: function(res) {
                      // 通过eventChannel向被打开页面传送数据
                      res.eventChannel.emit('dataToEvaluate', { orderItem: that.data.orderItem })
                      }
                  })
                }
                else {
                  wx.showToast({
                    title: '用户信息获取失败',
                    icon: 'none'
                  })
                }
              })
            }
          })
        }
      })
      // if () {
      // } else {
      // }
    }
  }
})
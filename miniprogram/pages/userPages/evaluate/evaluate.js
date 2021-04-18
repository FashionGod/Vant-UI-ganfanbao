// miniprogram/pages/userPages/evaluate/evaluate.js
import { EvaluateModel }
  from '../../../models/user/evaluate.js'
let orderItem = {}
const evaluateModel = new EvaluateModel()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    starCount: 0,
    textArea: '',
    readOnly: false
  },
  // 获取焦点
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  onChange(event) {
    this.setData({
      starCount: event.detail,
    });
  },
  submitEvaluate() {
    if (this.data.starCount == 0) {
      wx.showToast({
        title: '给出星级评分之后再提交',
        icon: 'none'
      })
    }
    else if (this.data.textArea.trim() == '') {
      wx.showToast({
        title: '评价文字不能为空',
        icon: 'none'
      })
    }
    else {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      evaluateModel.addEvaluate({
        orderId: orderItem._id,
        merchantId: orderItem.orderInfo.merchantId,
        starCount: this.data.starCount,
        content: this.data.textArea,
      })
        .then(res => {
          wx.hideLoading({})
          setTimeout(() => {
            if (res.code == 1) {
              wx.showToast({
                title: '评价成功',
              })
            }
            else {
              wx.showToast({
                title: res.err,
                icon: 'none'
              })
            }
          })
        }, 50)
    }
  },
  onLoad: function () {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('dataToEvaluate', function (data) {
      orderItem = data.orderItem
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      evaluateModel.getEvaluate({ orderId: data.orderItem._id, operateType: 0 })
        .then(res => {
          wx.hideLoading({})
          if (res.result.data.code === 2) { // 有评价
            that.setData({
              starCount: res.result.data.data[0].starCount,
              textArea: res.result.data.data[0].content,
              readOnly: true
            })
          }
          else if (res.result.data.code === 1) { // 未评价
            wx.showToast({
              title: '请给出诚恳评价哦亲',
              icon: 'none'
            })
          }
          else if (res.result.data.code === 0) { // 查询失败
            wx.showToast({
              title: '查询失败',
              icon: 'none'
            })
            wx.navigateBack({
              delta: 1,
            })
          }
        })
    })
  }
})
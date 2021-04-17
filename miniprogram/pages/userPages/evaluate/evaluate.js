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
    textArea: ''
  },
  // 获取焦点
  bindButtonTap: function() {
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
        setTimeout(()=>{
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
  onLoad: function() {
   const eventChannel = this.getOpenerEventChannel()
   eventChannel.on('dataToEvaluate', function(data) {
      orderItem = data.orderItem
   })
  }
})
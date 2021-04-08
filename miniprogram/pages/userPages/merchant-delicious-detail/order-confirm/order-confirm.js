// miniprogram/pages/userPages/merchant-delicious-detail/order-confirm/order-confirm.js
let app = getApp()
let foodPickList = []
let totalPrice = 0
let BySelf = {}
let ByRider = {}
let freight = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodPickList: [],
    totalPrice: 0,
    freight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('foodPickListEvent', function(data) {
      foodPickList = data.foodPickList
      totalPrice = data.totalPrice
    })
    this.setData({
      foodPickList: foodPickList,
      totalPrice: totalPrice,
    })
  },
  pickByRider() {
    let params = {}
    params.foodPickList = this.foodPickList
    params.freight = this.freight
    params.merchantId = app.globalData.merchantInfo._id
    params.payTime = Date.now()
    params.merchantTitle = app.globalData.merchantInfo.cardInfo.shopName
    params.merchantPhone = app.globalData.merchantInfo.merchantSignUpInfo.phoneNumber
    params.deliveryWay = 0
    console.log(params)
    setTimeout(()=>{ // 为了保证button提交完表单数据
      wx.showModal({
        content: '待支付',
        confirmColor: '#7ccd7d',
        cancelColor: '#ee0a24',
        confirmText: '支付',
        success (res) {
          console.log(app.globalData)
          console.log(app.globalData.merchantInfo._id)
          if (res.confirm) {
          console.log('用户点击确定')
          wx.reLaunch({
            url: '../../../order/order',
          })
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
          }
      })
    }, 50)
  },
  pickBySelf() {
    setTimeout(()=>{ // 为了保证button提交完表单数据
      console.log(BySelf)
      wx.showModal({
        content: '待支付',
        confirmColor: '#7ccd7d',
        cancelColor: '#ee0a24',
        confirmText: '支付',
        success (res) {
          if (res.confirm) {
          console.log('用户点击确定')
          wx.reLaunch({
            url: '../../../order/order',
          })
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
          }
      })
    }, 50)
  },
  submitFormBySelf(e) { // button提交表单数据
    BySelf = e.detail.value
    console.log(BySelf)
  },
  submitFormByRider(e) { // button提交表单数据
    ByRider = e.detail.value
    console.log(ByRider)
  },
})
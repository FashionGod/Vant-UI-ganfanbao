// miniprogram/pages/userPages/merchant-delicious-detail/order-confirm/order-confirm.js
import {
  UserOrderModel
} from '../../../../models/user/order'
const orderModel = new UserOrderModel()
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
    addressInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('foodPickListEvent', function(data) {
      console.log(data)
      foodPickList = data.foodPickList
      totalPrice = data.totalPrice
      that.setData({
        foodPickList: data.foodPickList,
        totalPrice: data.totalPrice,
      })
    })
  },
  pickAddress() {
    wx.chooseAddress({
      success: (res) => {
        console.log(res)
        let tmpAddressInfo = {
          detailInfo: res.detailInfo,
          userName: res.userName,
          telNumber: res.telNumber,
        }
        this.setData({
          addressInfo: tmpAddressInfo
        })
      },
      fail:(res) => {
      }
    })
  },
  pickByRider() { // 外卖
    if (this.data.addressInfo === null) {
      wx.showToast({
        title: '收货地址不能为空哦',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let params = {}
    params.foodPickList = foodPickList
    params.freight = freight
    params.riderPhone = ''// 增加骑手手机号字段
    params.riderName = ''// 增加骑手姓名字段
    params.merchantId = app.globalData.merchantInfo._id
    params.merchantLogo = app.globalData.merchantInfo.cardInfo.merchantLogo
    params.orderId = Date.now()
    params.payTime = new Date(Date.now()).toLocaleString('zh', {year: 'numeric', month: 'numeric',  day: 'numeric',  hour: 'numeric',  minute: 'numeric'})
    params.merchantTitle = app.globalData.merchantInfo.cardInfo.shopName
    params.merchantPhone = app.globalData.merchantInfo.merchantSignUpInfo.phoneNumber
    params.merchantAddress = app.globalData.merchantInfo.merchantSignUpInfo.managementAddress
    params.deliveryWay = 0 // 0为外卖 1为自取
    params.userId = app.globalData.loginInfo.openid
    params.totalPrice = totalPrice/100 + freight // 单位还原回元
    params.addressInfo = this.data.addressInfo // 收货信息
    setTimeout(()=>{ // 为了保证button提交完表单数据
      for (let i in ByRider) { // 补充备注参数
        params[i] = ByRider[i]
      }
      wx.showModal({
        content: '待支付',
        confirmColor: '#7ccd7d',
        cancelColor: '#ee0a24',
        confirmText: '支付',
        success (res) {
          if (res.confirm) {
          wx.showLoading({
            title: '订单生成中',
            mask: true
          })
          orderModel.createOrder(params)
          .then(res => {
            if (res.code === 1) {
              wx.hideLoading({})
              wx.reLaunch({
                url: '../../../order/order',
              })
            }
            else if (res.code === 0) {
              wx.hideLoading({})
              wx.showToast({
                title: '支付失败',
                icon:'error',
                duration: 2000
              })
            }
          })
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
          }
      })
    }, 50)
  },
  pickBySelf() { // 堂食
    let params = {}
    params.foodPickList = foodPickList
    params.merchantId = app.globalData.merchantInfo._id
    params.merchantLogo = app.globalData.merchantInfo.cardInfo.merchantLogo
    params.orderId = Date.now()
    params.payTime = new Date(Date.now()).toLocaleString('zh', {year: 'numeric', month: 'numeric',  day: 'numeric',  hour: 'numeric',  minute: 'numeric'})
    params.merchantTitle = app.globalData.merchantInfo.cardInfo.shopName
    params.merchantPhone = app.globalData.merchantInfo.merchantSignUpInfo.phoneNumber
    params.merchantAddress = app.globalData.merchantInfo.merchantSignUpInfo.merchantAddress
    params.deliveryWay = 1 // 0为外卖 1为自取
    params.userId = app.globalData.loginInfo.openid
    params.totalPrice = totalPrice/100 // 单位还原为元
    setTimeout(()=>{ // 为了保证button提交完表单数据
      for (let i in BySelf) { // 补充备注参数
        params[i] = BySelf[i]
      }
      wx.showModal({
        content: '待支付',
        confirmColor: '#7ccd7d',
        cancelColor: '#ee0a24',
        confirmText: '支付',
        success (res) {
          if (res.confirm) {
          wx.showLoading({
            title: '订单生成中',
            mask: true
          })
          orderModel.createOrder(params)
          .then(res => {
            if (res.code === 1) {
              wx.hideLoading({})
              wx.reLaunch({
                url: '../../../order/order',
              })
            }
            else if (res.code === 0) {
              wx.hideLoading({})
              wx.showToast({
                title: '支付失败',
                icon:'error',
                duration: 2000
              })
            }
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
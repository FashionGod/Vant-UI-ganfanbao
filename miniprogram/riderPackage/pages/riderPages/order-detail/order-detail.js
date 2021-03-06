let orderItem = {}
Page({
  data: {
    status: 1,
    steps: [
      {
        text: '已下单',
        desc: '',
        inactiveIcon: '',
        activeIcon: 'success',
      },
      {
        text: '商家备餐',
        desc: '',
        inactiveIcon: '',
        activeIcon: 'underway',
      },
      {
        text: '骑手送餐',
        desc: '',
        inactiveIcon: '',
        activeIcon: 'underway',
      },
      {
        text: '餐已送达',
        desc: '',
        inactiveIcon: '',
        activeIcon: 'success',
      },
    ],
    orderItem: {}
  },
  // 联系商家
  contactMerchant() {
    wx.makePhoneCall({
      phoneNumber: orderItem.orderInfo.merchantPhone,
      success:(res)=> {
      },
      fail:(res)=> {
      },
    })
  },
  // 联系用户
  contactUser() {
    wx.makePhoneCall({
      phoneNumber: orderItem.orderInfo.addressInfo.telNumber,
      success:(res)=> {
      },
      fail:(res)=> {
      },
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function () {
   let that = this
   const eventChannel = this.getOpenerEventChannel()
   eventChannel.on('orderDetailEvent', function(data) {
      orderItem = data.orderItem
      that.setData({
        orderItem: orderItem
      })
   })
 },
});
let orderItem = {}
Page({
  data: {
    status: 3,
    takeWaySteps: [
      {
        text: '已下单',
        desc: '',
        inactiveIcon: '',
        activeIcon: 'success',
      },
      {
        text: '备餐完成',
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
    eatInSteps: [
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
        text: '备餐完成',
        desc: '',
        inactiveIcon: '',
        activeIcon: 'success',
      },
    ],
    // 卡片数据
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
  // 联系骑手
  contactRider() {
    wx.makePhoneCall({
      phoneNumber: orderItem.orderInfo.riderPhone,
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
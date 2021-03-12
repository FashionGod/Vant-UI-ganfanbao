
Page({
  data: {
    status: 3,
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
  },
  // 联系商家
  contactMerchant() {
    wx.makePhoneCall({
      phoneNumber: '15541155173',
      success:(res)=> {
      },
      fail:(res)=> {
      },
    })
  },
  // 联系用户
  contactUser() {
    wx.makePhoneCall({
      phoneNumber: '15541155173',
      success:(res)=> {
      },
      fail:(res)=> {
      },
    })
  },
});
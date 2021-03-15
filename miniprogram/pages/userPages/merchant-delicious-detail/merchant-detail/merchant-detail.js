const app = getApp()
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
    // 商家资质信息轮播图
    swiperImgList: [],
  },
  onLoad: function() {
    this.setData({
      swiperImgList: app.globalData.merchantInfo.license
    })
  },
  // 查看大图
  previewImg(e) {
   wx.previewImage({
     current: this.data.swiperImgList[e.currentTarget.dataset.i], // 当前显示图片的http链接
     urls: this.data.swiperImgList // 需要预览的图片http链接列表
   })
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
  // 联系骑手
  contactRider() {
    wx.makePhoneCall({
      phoneNumber: '15541155173',
      success:(res)=> {
      },
      fail:(res)=> {
      },
    })
  },
});
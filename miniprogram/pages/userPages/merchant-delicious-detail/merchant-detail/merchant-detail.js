const app = getApp()
Page({
  data: {
    name: '',
    companyName: '',
    managementAddress: '',
    managementArrange: '',
    deadline: '',
    // 商家资质信息轮播图
    swiperImgList: [],
  },
  onLoad: function() {
    this.setData({
      swiperImgList: app.globalData.merchantInfo.license,
      name: app.globalData.merchantInfo.merchantSignUpInfo.name, 
      companyName: app.globalData.merchantInfo.merchantSignUpInfo.companyName,
      managementAddress: app.globalData.merchantInfo.merchantSignUpInfo.managementAddress,
      managementArrange: app.globalData.merchantInfo.merchantSignUpInfo.managementArrange,
      deadline: app.globalData.merchantInfo.merchantSignUpInfo.deadline,
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
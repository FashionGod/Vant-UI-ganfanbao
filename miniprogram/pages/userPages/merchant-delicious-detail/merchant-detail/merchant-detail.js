
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
    swiperImgList: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1901359579,1861271908&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1840683049,2335736361&fm=26&gp=0.jpg' ,'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2905099515,729646340&fm=26&gp=0.jpg'],
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
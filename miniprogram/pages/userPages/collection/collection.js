// miniprogram/pages/userPages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 子组件需要的值
    merchantImg1: "../../assets/homeImages/merchant_photo1.png",
    merchantItem: {
      cardInfo: {
        merchantLogo: "cloud://ganfanbao-1goayejba4ec1d03.6761-ganfanbao-1goayejba4ec1d03-1304352490/merchantInfo/2/merchantLogo/1616170087140.png",
        shopName: "黑心包子铺"}
    },
    merchantImg2: "../../assets/homeImages/merchant_photo2.png",
    // 下拉刷新
    pullDownloading: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
  },
    // 监控自定义scroll-view下拉刷新
    pullDownFresh() {
      setTimeout(() => {
        // 再此调取接口，如果接口回调速度太快，为了展示loading效果，可以使用setTimeout
  
        // 数据请求成功后，关闭刷新
        this.setData({
          pullDownloading: false,
        })
      }, 1000)
    },
    scrollTouchedBottom() {
      // 显示loading开始请求
      this.setData({
        scrollTouchedBottomLoading: true,
      })
      // 数据请求成功后，关闭刷新
      setTimeout(() => {
        this.setData({
          scrollTouchedBottomLoading: false,
        })
      }, 1000);
    },
})
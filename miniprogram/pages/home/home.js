// miniprogram/pages/myPages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 子组件需要的值
    merchantImg: "../../assets/homeImages/merchant_photo1.png",
    // 展开筛选禁用scroll
    dropDownForbidenScroll: true,
    // 下拉刷新
    pullDownloading: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
    // 搜索框
    value: '',
    showSearchPanelFlag: false,
    // 轮播图
    swiperImgList: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1901359579,1861271908&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1840683049,2335736361&fm=26&gp=0.jpg' ,'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2905099515,729646340&fm=26&gp=0.jpg'],
    //商家列表筛选头部
    switchTitle1: '包邮',
    switchTitle2: '团购',
    itemTitle: '筛选',
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    option2: [
      { text: '综合排序', value: 0 },
      { text: '离我最近', value: 1 },
      { text: '销量最高', value: 2 },
      { text: '评分最高', value: 3 },
    ],
    value1: 0,
    value2: 0,
    //
  },
  // 搜索框
  onFocus() {
    this.setData({
      showSearchPanelFlag: true
    })
  },
  onCancel() {
    this.setData({
      showSearchPanelFlag: false
    })
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
    console.log(e);  
  },
  onSearch() {
    wx.showToast({
      title: '搜索' + this.data.value,
      icon: 'none'
    })
  },

  // 轮播图
  previewImg(e) {
    wx.previewImage({
      current: this.data.swiperImgList[e.currentTarget.dataset.i], // 当前显示图片的http链接
      urls: this.data.swiperImgList // 需要预览的图片http链接列表
    })
  },
  // 商家列表筛选头部
  onConfirm() {
    this.selectComponent('#item').toggle();
  },
  dropDownMenuOpen() {
      this.setData({
        dropDownForbidenScroll: false,
      })
    console.log('禁用scroll');
  },
  dropDownMenuClose() {
      this.setData({
        dropDownForbidenScroll: true,
      })
    console.log('启用scroll');
  },
  onSwitch1Change({ detail }) {
    console.log('1');
    this.setData({ switch1: detail });
  },

  onSwitch2Change({ detail }) {
    console.log('2');
    this.setData({ switch2: detail });
  },
  // 监控自定义scroll-view下拉刷新
  pullDownFresh() {
    console.log('下拉刷新');
    setTimeout(() => {
      // 再此调取接口，如果接口回调速度太快，为了展示loading效果，可以使用setTimeout

      // 数据请求成功后，关闭刷新
      this.setData({
        pullDownloading: false,
      })
      console.log('刷新成功');
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
    console.log('淦，你碰到俺底部啦！');
  },

/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
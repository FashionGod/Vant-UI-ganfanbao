// miniprogram/pages/riderPages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 条件渲染我的页面
    showMePageFlag: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
    // tabbars data
    tabbarActive: 0,
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
  // 跳转至详情页
  navigateToOrderDetail() {
    wx.navigateTo({
      url: '../order-detail/order-detail',
    })
  },
  onShow:function() {
    wx.hideHomeButton();
  },
  // tabbars function
  onChange(event) {
    if (event.detail == 1) {
      this.setData({
        tabbarActive: 1,
        showMePageFlag: true
      });
    } else {
      this.setData({
        tabbarActive: 0,
        showMePageFlag: false
      });
    }
    
  },
})
// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 子组件需要的值
    merchantImg1: "../../assets/homeImages/merchant_photo1.png",
    merchantImg2: "../../assets/homeImages/merchant_photo2.png",
    // 下拉刷新
    pullDownloading: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
  },

    // 商家列表筛选头部
    onConfirm() {
      this.selectComponent('#item').toggle();
    },
    dropDownMenuOpen(e) {
        this.setData({
          dropDownForbidenScroll: false,
        })
        // 向父组件传值禁用外层scrool 防止出现UIbug
        const dropDownForbidenScroll = this.data.dropDownForbidenScroll;
        this.triggerEvent("handleScrollState",{dropDownForbidenScroll});
      console.log('禁用scroll');
    },
    dropDownMenuClose() {
        this.setData({
          dropDownForbidenScroll: true,
        })
    // 向父组件传值禁用外层scrool 防止出现UIbug
        const dropDownForbidenScroll = this.data.dropDownForbidenScroll;
        this.triggerEvent("handleScrollState",{dropDownForbidenScroll});
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
})
// miniprogram/pages/riderPages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 条件渲染我的页面
    showMePageFlag: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
    // 下拉刷新
    pullDownloading: false,
    // tabbars data
    tabbarActive: 0,
    // 我的页面
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 动画animation
    animation_class: null
  },

  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 联系我们
  contactOfficial() {
    wx.makePhoneCall({
      phoneNumber: '15541155173',
      success:(res)=> {
      },
      fail:(res)=> {
      },
    })
  },
  // 收获地址
  shippingAddress() {
    wx.chooseAddress({
      success: (res) => {
        console.log(res)
      },
      fail:(res) => {
        console.log(res)
      }
    })
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
  onReady: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "linear",
      delay: 0,
    })
    animation.opacity(1).step();
    this.setData({
      animation_class: animation.export(),
    })
  }
})
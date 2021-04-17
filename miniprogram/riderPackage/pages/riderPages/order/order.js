// miniprogram/pages/riderPages/order/order.js
import {
  RiderOrderModel
}
from "../../../../models/rider/order"
const orderModel = new RiderOrderModel()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs data
    tabsActive: 0,
    // 条件渲染我的页面
    showMePageFlag: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
    // 下拉刷新
    pullDownloading: false,
    // 订单列表
    orderList: [],
    // tabbars data
    tabbarActive: 0,
    // 动画animation
    animation_class: null
  },

  onLoad() {
    this.loadMore({
      init: true
    })
    console.log(app.globalData)
  },
  // 联系我们
  contactOfficial() {
    wx.makePhoneCall({
      phoneNumber: '15541155173',
      success: (res) => {},
      fail: (res) => {},
    })
  },

  // 获取分页加载的ids
  getOrderIds(start) {
    return this.data.orderIds.slice(start, start + 5)
  },
  // 分页加载
  loadMore({
    init
  }) {
    if (this.data.scrollTouchedBottomLoading) {
      return
    }
    let p
    if (init) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      p = orderModel.getOrderIdList({
          id: app.globalData.loginInfo.id,
          status: this.data.tabsActive
        })
        .then(res => {
          this.data.start = 0
          this.data.more = true
          this.data.orderIds = res.result.data
          return res
        })
    } else {
      p = new Promise(resolve => {
        resolve({})
      })
    }
    if (!this.data.more && !init) {
      return
    }
    this.setData({
      scrollTouchedBottomLoading: true
    })
    return p.then(res => {
      return orderModel.getOrderList(this.getOrderIds(this.data.start))
        .then(res => {
          wx.hideLoading({}) // 关闭getIdlist的showLoading
          if (res.code == 1) {
            console.log(res)
            let orderList = this.data.orderList.concat(res.data.data)
            if (init) {
              orderList = res.data.data
            }
            this.setData({
              orderList: orderList.reverse(), // 保证最上面看到的是最新的
              start: orderList.length,
              more: res.data.data.length == 5 ? true : false,
              scrollTouchedBottomLoading: false
            })
          } else {
            wx.showToast({
              title: '订单列表获取失败',
              icon: 'none'
            })
            this.setData({
              loading: false
            })
          }
          return res
        })
        .catch(err => {
          console.log(err)
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
          this.setData({
            scrollTouchedBottomLoading: false
          })
        })
    })
  }, // 监控自定义scroll-view下拉刷新
  pullDownFresh() {
    setTimeout(() => {
      // 再此调取接口，如果接口回调速度太快，为了展示loading效果，可以使用setTimeout
      this.loadMore({
        init: true
      })
      // 数据请求成功后，关闭刷新
      this.setData({
        pullDownloading: false,
      })
    }, 1000)
  },
  scrollTouchedBottom() {
    if (!this.data.more) {
      this.setData({
        showEnd: true
      })
      setTimeout(() => {
        this.setData({
          showEnd: false
        })
      }, 1000)
      this.loadMore({
        init: false
      })
    }
  },
  // 子组件的事件（抢单）
  grabOrder(e) {
    let that = this
    const {
      dataset
    } = e.currentTarget
    wx.showModal({
      cancelText: '取消',
      confirmText: '确定',
      content: '您确定吗？',
      showCancel: true,
      title: '提示',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          orderModel.updateOrderStatus({
            orderId: dataset.item._id,
            loginInfo: app.globalData.loginInfo,
            status: this.data.tabsActive
          }).then(res => {
            wx.hideLoading({})
            if (res.result.code === 0) {
              wx.showToast({
                title: '云函数调用失败',
                icon: 'none'
              })
            } else if (res.result.code === 1) {
              that.loadMore({
                init: true
              })
            }
          })
        } else if (res.cancel) {}
      }
    })
  },
  tabsChange(e) {
    this.setData({
      tabsActive: e.detail.index
    })
    this.loadMore({
      init: true
    })
  },
  // 进入订单详情页面
  navigateToOrderDetail(e) {
    console.log(e)
    const {dataset} = e.currentTarget
    let {item} = dataset
    wx.navigateTo({
      url: '../order-detail/order-detail',
      events: {
        orderDetailEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        res.eventChannel.emit('orderDetailEvent', {
          orderItem: item,
        })
      }
    })
  },
  onShow: function () {
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
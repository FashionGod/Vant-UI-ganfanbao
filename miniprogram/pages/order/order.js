// miniprogram/pages/order/order.js
import {
  UserOrderModel
} from '../../models/user/order'
import {
  UserModel
} from '../../models/user/user'
const userModel = new UserModel()
const orderModel = new UserOrderModel()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tabs data
    tabsActive: 0,
    // 订单列表
    orderList: [],
    orderIds: [],
    // 下拉刷新
    pullDownloading: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
    showEnd: false,
    // 分页参数
    start: 0,
    more: true,
    // 订单列表2
    orderList2: [],
    orderIds2: [],
    // 下拉刷新
    pullDownloading2: false,
    // 显示触底刷新
    scrollTouchedBottomLoading2: false,
    showEnd2: false,
    // 分页参数
    start2: 0,
    more2: true,
  },
  tabsChange(e) {
    this.setData({
      tabsActive: e.detail.index
    })
  },
    // ————————————————————————————————————————————全部订单（START）———————————————————————————————————————
    // 监控自定义scroll-view下拉刷新
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
      }
      this.loadMore({
        init: false
      })
    },
    // 获取分页加载的ids
    getOrderIds(start) {
      console.log(this.data.orderIds)
      console.log(this.data.orderIds.slice(start, start + 5))
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
        this.setData({
          more: true,
          start: 0
        })
        p = orderModel.getOrderIdList()
            .then(res => {
              this.setData({
                start: 0,
                more: true,
                orderIds: res.result.data
              })
              return res
            })
      }
      else {
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
              orderList: orderList,
              start: orderList.length,
              more: res.data.data.length == 5 ? true : false,
              scrollTouchedBottomLoading: false
            })
          }
          else {
            wx.showToast({
              title: '订单列表获取失败',
              icon: 'none'
            })
            this.setData({
              scrollTouchedBottomLoading: false
            })
          }
          return res
        })
        .catch(err => {
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
          this.setData({
            scrollTouchedBottomLoading: false
          })
        })
      })
    },
    // ————————————————————————————————————————————全部订单（END）————————————————————————————————————————

    // ————————————————————————————————————————————未评价（START）———————————————————————————————————————
    // 监控自定义scroll-view下拉刷新
    pullDownFresh2() {
      setTimeout(() => {
        // 再此调取接口，如果接口回调速度太快，为了展示loading效果，可以使用setTimeout
        this.loadMore2({
          init: true
        })
        // 数据请求成功后，关闭刷新
        this.setData({
          pullDownloading2: false,
        })
      }, 1000)
    },
    scrollTouchedBottom2() {
      if (!this.data.more) {
        this.setData({
          showEnd2: true
        })
        setTimeout(() => {
          this.setData({
            showEnd2: false
          })
        }, 1000)
      }
      this.loadMore2({
        init: false
      })
    },
    // 获取分页加载的ids
    getOrderIds2(start) {
      return this.data.orderIds2.slice(start, start + 5)
    },
    // 分页加载
    loadMore2({
      init
    }) {
      if (this.data.scrollTouchedBottomLoading2) {
        return
      }
      let p
      if (init) {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        this.setData({
          more2: true,
          start2: 0
        })
        p = orderModel.getUnEvaluatedOrderIdList()
            .then(res => {
              this.setData({
                start2: 0,
                more2: true,
                orderIds2: res.result.data
              })
              return res
            })
      }
      else {
        p = new Promise(resolve => {
          resolve({})
        })
      }
      if (!this.data.more2 && !init) {
        return
      }
      this.setData({
        scrollTouchedBottomLoading2: true
      })
      return p.then(res => {
        return orderModel.getOrderList(this.getOrderIds2(this.data.start2))
        .then(res => {
          wx.hideLoading({}) // 关闭getIdlist的showLoading
          if (res.code == 1) {
            let orderList = this.data.orderList2.concat(res.data.data)
            if (init) {
              orderList = res.data.data
            }
            this.setData({
              orderList2: orderList,
              start2: orderList.length,
              more2: res.data.data.length == 5 ? true : false,
              scrollTouchedBottomLoading2: false
            })
          }
          else {
            wx.showToast({
              title: '订单列表获取失败',
              icon: 'none'
            })
            this.setData({
              scrollTouchedBottomLoading2: false
            })
          }
          return res
        })
        .catch(err => {
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
          this.setData({
            scrollTouchedBottomLoading2: false
          })
        })
      })
    },
    // ————————————————————————————————————————————未评价（END）————————————————————————————————————————
    // 进入订单详情页面
    navigateToOrderDetail(e) {
      console.log(e)
      const {dataset} = e.currentTarget
      let {item} = dataset
      wx.navigateTo({
        url: '../../pages/userPages/order-detail/order-detail',
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
    // 跳转到评价页面
    navigateToView(e) {
      const {dataset} = e.currentTarget
      let {item} = dataset
      let that = this
      wx.getStorage({
        key: 'userInfo',
        success:(res)=> {
          wx.navigateTo({
            url: '../../pages/userPages/evaluate/evaluate',
            events: {
              dataToEvaluate: function(data) {
                console.log(data)
              }
            },
            success: function(res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('dataToEvaluate', { orderItem: item })
              }
          })
        },
        fail:(res)=> {
          wx.getUserProfile({
            desc: '评价功能的信息展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              wx.showLoading({
                title: '加载中',
                mask: true
              })
              userModel.updateUserInfo(res.userInfo)
              .then(res => {
                wx.hideLoading({})
                if (res.success) {
                  wx.setStorage({
                    data: res.data,
                    key: 'userInfo',
                  })
                  app.globalData.canIUseGetUserProfile = true
                  console.log('item', item)
                  wx.navigateTo({
                    url: '../../pages/userPages/evaluate/evaluate',
                    events: {
                      dataToEvaluate: function(data) {
                        console.log(data)
                      }
                    },
                    success: function(res) {
                      // 通过eventChannel向被打开页面传送数据
                      res.eventChannel.emit('dataToEvaluate', { orderItem: item })
                      }
                  })
                }
                else {
                  wx.showToast({
                    title: '用户信息获取失败',
                    icon: 'none'
                  })
                }
              }).catch(err => {
                console.log(err)
                wx.hideLoading({})
                wx.showToast({
                  title: '用户信息上传失败',
                  icon: 'none'
                })
              })
            },
            fail: err => {
              wx.showToast({
                title: '信息获取失败',
                icon: 'none'
              })
            }
          })
        }
      })
    },
    onLoad() {
      this.loadMore2({init: true})
    },
    onShow() {
      if (this.data.tabsActive == 0) {
        this.loadMore({init: true})
      }
      else if (this.data.tabsActive == 1) {
        this.loadMore2({init: true})
      }
    },
    
    // 删除单项订单
    // delete(e) {
    //   console.log(e)
    //   wx.showModal({
    //     content: '你确定要删除该项订单吗？',
    //     confirmColor: '#ff0000',
    //     success (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // },
})
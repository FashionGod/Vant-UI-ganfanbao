// miniprogram/pages/order/order.js
import {
  UserOrderModel
} from '../../models/user/order'
const orderModel = new UserOrderModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 子组件需要的值
    merchantImg1: "../../assets/homeImages/merchant_photo1.png",
    merchantImg2: "../../assets/homeImages/merchant_photo2.png",
    // 订单列表
    orderList: [],
    // 下拉刷新
    pullDownloading: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
    // 分页参数
    start: 0,
    more: true,
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
    },
    dropDownMenuClose() {
        this.setData({
          dropDownForbidenScroll: true,
        })
    // 向父组件传值禁用外层scrool 防止出现UIbug
        const dropDownForbidenScroll = this.data.dropDownForbidenScroll;
        this.triggerEvent("handleScrollState",{dropDownForbidenScroll});
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
        p = orderModel.getOrderIdList()
            .then(res => {
              wx.hideLoading({})
              this.data.start = 0
              this.data.more = true
              this.data.orderIds = res.result.data
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
              loading: false
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
            loading: false
          })
        })
      })
    },
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
    onLoad() {
      this.loadMore({init: true})
    }
})
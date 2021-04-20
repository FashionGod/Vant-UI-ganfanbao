import {
  HomeModel
} from "../../../models/user/home.js"
const homeModel = new HomeModel()

let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框
    searchContent: '',
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
    showEnd: false,
    // 商家列表
    merchantList: [],
    // 分页加载参数
    start: 0,
    more: true,
  },

  
  // 搜索框
  onFocus() {
    // this.setData({
    //   showSearchPanelFlag: true
    // })
  },
  onCancel() {
    // this.setData({
    //   showSearchPanelFlag: false
    // })
  },
  onSearch() {
    this.loadMore({
      init: true
    })
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
  getMerchantIds(start) {
    return this.data.merchantIds.slice(start, start + 5)
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
      p = homeModel.searchMerchantIdByContent({searchContent: this.data.searchContent})
          .then(res => {
            this.setData({
              start: 0,
              more: true,
              merchantIds: res.result.data
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
      return homeModel.getMerchantList(this.getMerchantIds(this.data.start))
      .then(res => {
        wx.hideLoading({}) // 关闭getIdlist的showLoading
        app.globalData.loginInfo.openid = res.openid
        if (res.code == 1) {
          let merchantList = this.data.merchantList.concat(res.data.data)
          if (init) {
            merchantList = res.data.data
          }
          this.setData({
            merchantList: merchantList,
            start: merchantList.length,
            more: res.data.data.length == 5 ? true : false,
            scrollTouchedBottomLoading: false
          })
        }
        else {
          wx.showToast({
            title: '商家列表获取失败',
            icon: 'none'
          })
          this.setData({
            scrollTouchedBottomLoading: false
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
  },
  // 进入详情页
  navigateToDetail(e) {
    const {item} = e.currentTarget.dataset
    app.globalData.merchantInfo = item
    wx.navigateTo({
      url: '../../userPages/merchant-delicious-detail/merchant-delicious-detail',
    })
  },
})
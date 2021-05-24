import {
  HomeModel
} from "../../models/user/home.js"
const homeModel = new HomeModel()

let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 展开筛选禁用scroll
    dropDownForbidenScroll: true,
    // 下拉刷新
    pullDownloading: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
    showEnd: false,
    // 搜索框
    value: '',
    // 轮播图
    swiperImgList: ['https://img2.baidu.com/it/u=2284126798,72955360&fm=26&fmt=auto&gp=0.jpg', 'https://img2.baidu.com/it/u=1086693792,1561580078&fm=26&fmt=auto&gp=0.jpg' ,'https://img2.baidu.com/it/u=1844779269,3406037568&fm=26&fmt=auto&gp=0.jpg'],
    //商家列表筛选头部
    // option1: [
    //   { text: '全部商品', value: 0 },
    //   { text: '新款商品', value: 1 },
    //   { text: '活动商品', value: 2 },
    // ],
    option2: [
      { text: '乱序盲选', value: 0 },
      { text: '评分最高', value: 1 },
      { text: '销量最高', value: 2 },
      { text: '综合排序', value: 3 },
    ],
    value1: 0,
    value2: 0,
    // 商家列表
    merchantList: [],
    merchantIds: [],
    // 分页加载参数
    start: 0,
    more: true,
  },
  // 搜索框
  onFocus() {
    wx.navigateTo({
      url: '../../pages/userPages/search-page/search-page',
    })
  },
  // 轮播图
  previewImg(e) {
    wx.previewImage({
      current: this.data.swiperImgList[e.currentTarget.dataset.i], // 当前显示图片的http链接
      urls: this.data.swiperImgList // 需要预览的图片http链接列表
    })
  },
  // 子组件传来的，用来控制scroll的滚动，防止UI出现bug
  handleScrollChange(e) {
    const {dropDownForbidenScroll} = e.detail;
    this.setData({
      dropDownForbidenScroll: dropDownForbidenScroll,
    });
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
  // onSwitch1Change({ detail }) {
  //   console.log('1');
  //   this.setData({ value1: detail });
  // },

  onSwitch2Change({ detail }) {
    console.log('2');
    this.setData({
      value2: detail,
      more: true, // 防止一种排序下已经没有更多了，切换到另一种排序more为false会阻止查询
    });
    this.loadMore({
      init: true,
      sortType: this.data.value2
    })
  },
  // 监控自定义scroll-view下拉刷新
  pullDownFresh() {
    setTimeout(() => {
      // 再此调取接口，如果接口回调速度太快，为了展示loading效果，可以使用setTimeout
      this.loadMore({
        init: true,
        sortType: this.data.value2
      })
      // 数据请求成功后，关闭刷新
      this.setData({
        pullDownloading: false,
      })
    }, 1000)
  },
  scrollTouchedBottom() {
    console.log(this.data.more)
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
      init: false,
      sortType: this.data.value2
    })
  },
  navigateToDetail(e) {
    const {item} = e.currentTarget.dataset
    app.globalData.merchantInfo = item
    wx.navigateTo({
      url: '../userPages/merchant-delicious-detail/merchant-delicious-detail',
    })
  },
  // 获取分页加载的ids
  getMerchantIds(start) {
    return this.data.merchantIds.slice(start, start + 5)
  },
  // 分页加载
  loadMore({
    init, sortType
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
      p = homeModel.getMerchantIdList({sortType: sortType})
          .then(res => {
            if (sortType == 0){ // 0盲选乱序 1评分最高 2销量最高 3综合排序
              this.setData({
                start: 0,
                more: true,
                merchantIds: this.shuffle(res.result.data)
              })
            }
            else if (sortType == 1) {
              this.setData({
                start: 0,
                more: true,
                merchantIds: res.result.data
              })
            }
            else if (sortType == 2) {
              this.setData({
                start: 0,
                more: true,
                merchantIds: res.result.data
              })
            }
            else if (sortType == 3) {
              this.setData({
                start: 0,
                more: true,
                merchantIds: res.result.data
              })
            }
            return res
          })
    }
    else {
      p = new Promise(resolve => {
        resolve({})
      })
    }
    if (!this.data.more) {
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
  // 乱序函数
  shuffle: function(arr) {
    var length = arr.length,
      randomIndex,
      temp;
    while (length) {
      randomIndex = Math.floor(Math.random() * (length--));
      temp = arr[randomIndex];
      arr[randomIndex] = arr[length];
      arr[length] = temp
    }
    return arr;
  },
  onLoad() {
    this.loadMore({
      init: true,
      sortType: this.data.value2
    })
  }
})
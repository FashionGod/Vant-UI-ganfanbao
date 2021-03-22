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
    // 子组件需要的值
    merchantImg1: "../../assets/homeImages/merchant_photo1.png",
    merchantImg2: "../../assets/homeImages/merchant_photo2.png",
    // 展开筛选禁用scroll
    dropDownForbidenScroll: true,
    // 下拉刷新
    pullDownloading: false,
    // 显示触底刷新
    scrollTouchedBottomLoading: false,
    showEnd: false,
    // 搜索框
    value: '',
    showSearchPanelFlag: false,
    // 轮播图
    swiperImgList: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1901359579,1861271908&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1840683049,2335736361&fm=26&gp=0.jpg' ,'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2905099515,729646340&fm=26&gp=0.jpg'],
    //商家列表筛选头部
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
    // 商家列表
    merchantList: [],
    start: 0,
    more: true,
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
      this.getMerchantList()
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
  navigateToDetail(e) {
    const {item} = e.currentTarget.dataset
    console.log(item)
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
    init
  }) {
    if (this.data.scrollTouchedBottomLoading) {
      return
    }
    let p
    if (init) {
      p = homeModel.getMerchantIdList()
          .then(res => {
            this.data.start = 0
            this.data.more = true
            this.data.merchantIds = this.shuffle(res.result.data)
          })
    }
    else {
      p = new Promise(resolve => {
        resolve()
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
        console.log(res)
        app.globalData.loginInfo.openid = res.openid
        console.log(app.globalData)
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
          console.log(this.data.more)
        }
        else {
          wx.showToast({
            title: '商家列表获取失败',
            icon: 'none'
          })
          this.setData({
            loading: false
          })
        }
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
    this.loadMore({init: true})
  }
})
// miniprogram/pages/userPages/merchant-delicious-detail/merchant-delicious-detail.js
import tool from "../../public/tools/tool.js";
import {
  EvaluateModel
} from "../../../models/user/evaluate";
import {
  ShopDetailModel
} from "../../../models/merchant/merchant-shop-detail.js";
const shopDetailModel = new ShopDetailModel()
const evaluateModel = new EvaluateModel()
let app = getApp()
let allFoodList = [] // 初始化单纯的食品列表
let foodPickList = [] // 查看详情的列表
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ------------------------------------- 点菜 -----------------------------------------
    showSubmit: true,
    activeKey: 0,
    // 标签锚点跳转值
    indexMaodian: 'b1',
    // 标签详情内容锚点跳转
    storeDetail: 'a1',
    // 收藏状态
    collectionStar: 'star-o',
    // 类目列表
    categoryList: [],
    merchantMenuList: [],
    foodPickList: [],
    arr: [0],
    // 购物车弹出层
    showPopup: false,
    // 提交栏
    totalPrice: 0,
    // -------------------------------------- 评价 -----------------------------------------------
    evaluateList: [],
    //分页数据
    start: 0,
    more: true,
    loading: false,
    showEnd: false,
    // -------------------------------------- 商家 -----------------------------------------------
    merchantInfo: {},
  },
  // 点击收藏
  collectionMerchant() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    console.log(app.globalData)
    shopDetailModel.collectOrCancel({
        operation: this.data.collectionStar == 'star-o' ? 1 : 0, // 1是收藏 0是取消收藏
        id: app.globalData.merchantInfo._id
      })
      .then(res => {
        let {
          mess
        } = res.result
        if (mess.code !== 0) {
          this.setData({
            collectionStar: this.data.collectionStar == 'star-o' ? 'star' : 'star-o'
          })
          wx.hideLoading({})
          wx.showToast({
            title: mess.message,
            icon: 'success'
          })
        } else {
          wx.hideLoading({})
          wx.showToast({
            title: '失败',
            icon: 'error'
          })
        }
      })
      .catch(err => {
        wx.hideLoading({})
        wx.showToast({
          title: '失败',
          icon: 'error'
        })
      })
  },
  // -------------------------------------------- 点菜 --------------------------------------------
  // 滑动右边判断是哪个sidebar
  judgeScrollWhere(height) {
    this.data.arr.forEach((item, i) => {
      if (height >= item && height < this.data.arr[i + 1]) {
        this.setData({
          indexMaodian: `b${i+1}`,
          activeKey: i,
        });
      }
    })
  },
  onPageScroll: tool.debounce(function (res) {
    // 通过滑动的距离判断页面滑动那个区域让后让顶部的标签栏切换到对应位置
    var height = Number(res[0].detail.scrollTop)
    this.judgeScrollWhere(height)
  }, 50),
  // 切换tab ‘点菜’ ‘评价’ ‘商家’
  switTab(event) {
    if (event.detail.name == 0) {
      this.setData({
        showSubmit: true,
      })
    } else {
      this.setData({
        showSubmit: false,
      })
    }
  },
  // 跳转到对应的标签详情内容区
  toDetail(e) {
    let id = e.target.dataset.id
    this.setData({
      storeDetail: 'a' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore({init: true})
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    shopDetailModel.getMenuList({
      id: app.globalData.merchantInfo._id,
      role: 0 // 用户
    }).then(res => {
      const {
        mess
      } = res.result
      app.globalData.merchantInfo = {
        ...app.globalData.merchantInfo,
        ...mess.data.data
      }
      // 证书的图片两个字符串处理为数组
      let license = []
      license.push(app.globalData.merchantInfo.businessLicense, app.globalData.merchantInfo.foodLicense)
      app.globalData.merchantInfo.license = license
      if (mess.code === 1) {
        const merchantMenuList = mess.data.data.merchantMenuList ? mess.data.data.merchantMenuList : []
        let tmpCategoryList = merchantMenuList ? merchantMenuList.map((obj) => {
          let tmpObj = {
            title: obj.title
          }
          return tmpObj
        }) : []
        // 遍历初始化 查看详情所需的数组
        allFoodList = []
        merchantMenuList.map((i, index) => {
          i.foodList.map(j => {
            allFoodList.push({
              ...j,
              categoryIndex: index
            })
          })
        })
        allFoodList.forEach(i => {
          i.count = 0
          return i
        })
        // 加入锚点标记id
        merchantMenuList.forEach((item, i) => {
          this.data.arr[i + 1] = 150 * item.foodList.length + this.data.arr[i];
        })
        var tmpMerchantMenuList = merchantMenuList
        tmpCategoryList.forEach((item, i) => {
          item.dataId = i + 1;
          item.maodian = 'b' + (i + 1);
          item.count = 0; // 用于分类小红点的统计
        })
        tmpMerchantMenuList.forEach((item, i) => {
          item.id = 'a' + (i + 1);
        })
        this.setData({
          // 列表数据
          merchantMenuList: merchantMenuList ? merchantMenuList : [],
          // 头部数据
          merchantInfo: app.globalData.merchantInfo,
          // 锚点相关
          categoryList: tmpCategoryList,
        });
      } else {
        wx.showToast({
          title: `${mess.message}`,
          icon: 'none',
          duration: 2000
        })
      }
      setTimeout(() => {
        wx.hideLoading({})
      }, 1000)
    })
    shopDetailModel.getCollectStatus({
        id: app.globalData.merchantInfo._id,
        operation: 2, // 获取收藏状态
      })
      .then(res => {
        let {
          mess
        } = res.result
        if (mess.code === 3) {
          this.setData({
            collectionStar: 'star'
          })
        } else if (mess.code === 4) {
          this.setData({
            collectionStar: 'star-o'
          })
        }
        setTimeout(() => {
          wx.hideLoading({})
        }, 1000)
      })
  },
  // 食品数量变化
  onFoodCountChange(event) {
    const {
      dataset
    } = event.currentTarget
    let tmpCategoryList = this.data.categoryList
    tmpCategoryList.forEach(obj => { // 分类小圆点清零
      obj.count = 0
    })
    allFoodList.forEach(obj => { // 单个数量变化
      if (obj.title == dataset.item.title) {
        obj.count = event.detail
      }
      tmpCategoryList[obj.categoryIndex].count += obj.count
    })
    this.countTotalPrice(tmpCategoryList)
  },
  countTotalPrice(tmpCategoryList) { // 处理查看详情数组并计算总价
    let tmpTotalPrice = 0
    foodPickList = allFoodList.filter(obj => obj.count > 0)
    for (let i = 0; i < allFoodList.length; i++) { //计算总价
      tmpTotalPrice += (allFoodList[i].count * allFoodList[i].price)
    }
    this.setData({
      totalPrice: tmpTotalPrice * 100, // 总价单位为分
      foodPickList: foodPickList,
      categoryList: tmpCategoryList,
    })
  },
  // 底部购物车弹出层
  showPopup() {
    if (foodPickList.length === 0) {
      wx.showToast({
        title: '您还没有选择任何商品哦亲',
        icon: 'none'
      })
    } else {
      this.setData({
        showPopup: true
      });
    }
  },
  onClose() {
    this.setData({
      showPopup: false
    });
  },
  onSubmit() {
    setTimeout(() => { // 防止出现空订单
      if (foodPickList.length === 0) {
        wx.showToast({
          title: '您还没有选择任何商品哦亲',
          icon: 'none'
        })
      } else {
        let that = this
        wx.navigateTo({
          url: './order-confirm/order-confirm',
          success: function (res) {
            res.eventChannel.emit('foodPickListEvent', {
              foodPickList: foodPickList,
              totalPrice: that.data.totalPrice
            })
          }
        })
      }
    }, 50)
  },
  // --------------------------------------------- 评价 -------------------------------------------------
  loadMore: function ({
    init = false
  }) {
    if (this.data.loading) {
      return
    }
    if (init) {
      this.setData({
        start: 0,
        more: true
      })
    }
    if (!this.data.more) {
      return
    }
    this.setData({
      loading: true
    })
    return evaluateModel.getEvaluate({
        merchantId: app.globalData.merchantInfo._id,
        start: this.data.start,
        operateType: 1
      })
      .then(res => {
        let evaluateList = this.data.evaluateList.concat(res.result.data[0].data)
        if (init) {
          evaluateList = res.result.data[0].data
        }
        this.setData({
          evaluateList: evaluateList,
          start: evaluateList.length,
          more: res.result.data.length == 20 ? true : false,
          loading: false
        })
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
  },
  // 触底加载
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
  // 删除自己的评价
  onDeleteEvaluate(e) {
    let that = this
    const {dataset} = e.currentTarget
    wx.showModal({
      title: '提示',
      content: '您确定要删除此评价吗？',
      confirmText: '删除',
      confirmColor: '#e04d3a',
      success (res) {
      if (res.confirm) {
      wx.showLoading({
        title: '删除中',
        mask: true
      })
      evaluateModel.deleteEvaluate({evaluateId: dataset.id, orderId: dataset.orderid})
      .then(res => {
        wx.hideLoading({})
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        that.loadMore({init: true})
      })
      } else if (res.cancel) {
      }
      }
      })
  },
  // --------------------------------------------- 商家 -------------------------------------------------
  previewImg(e) {
    wx.previewImage({
      current: app.globalData.merchantInfo.merchantEnvironment[e.currentTarget.dataset.i], // 当前显示图片的http链接
      urls: app.globalData.merchantInfo.merchantEnvironment // 需要预览的图片http链接列表
    })
  },
  // 联系商家
  contactOfficial() {
    wx.makePhoneCall({
      phoneNumber: this.data.merchantInfo.merchantSignUpInfo.phoneNumber,
      success: (res) => {},
      fail: (res) => {},
    })
  }
})
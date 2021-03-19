// miniprogram/pages/userPages/merchant-delicious-detail/merchant-delicious-detail.js
import tool from "../../public/tools/tool.js";
let app = getApp()
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
    arr: [0],
    // -------------------------------------- 评价 -----------------------------------------------
    // -------------------------------------- 商家 -----------------------------------------------
    merchantInfo: {},
  },
  // 点击收藏
  collectionMerchant() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.cloud.callFunction({
      name: 'collectOrCancel',
      data: {
        operation: this.data.collectionStar == 'star-o' ? 1 : 0, // 1是收藏 0是取消收藏
        merchantId: app.globalData.merchantInfo._id
      },
      success: res => {
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
      },
      fail: fail => {
        wx.hideLoading({})
        wx.showToast({
          title: '失败',
          icon: 'error'
        })
      }
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
    console.log(res)
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
    this.getMenuList()
    this.getCollectStatus()
  },
  // --------------------------------------------- 评价 -------------------------------------------------

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
      phoneNumber: '15541155173',
      success: (res) => {},
      fail: (res) => {},
    })
  },
  // 获取商家菜单、获取商家详细信息等
  getMenuList() {
    wx.cloud.callFunction({
      name: 'getMerchantMenuList',
      data: {
        id: app.globalData.merchantInfo._id,
        role: 0,
      },
      success: res => {
        const {
          mess
        } = res.result
        app.globalData.merchantInfo = {...app.globalData.merchantInfo, ...mess.data.data}
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
          merchantMenuList.forEach((item, i) => {
            this.data.arr[i + 1] = 120 * item.foodList.length + this.data.arr[i];
          })
          // 加入锚点标记id
          var tmpMerchantMenuList = merchantMenuList
          tmpCategoryList.forEach((item, i) => {
            item.dataId = i + 1;
            item.maodian = 'b' + (i + 1);
          })
          tmpMerchantMenuList.forEach((item, i) => {
            item.id = 'a' + (i + 1);
          })
          this.setData({
            // 列表数据
            merchantMenuList: merchantMenuList ? merchantMenuList : [],
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
        wx.hideLoading({})
      }
    })
  },
  getCollectStatus() {
    wx.cloud.callFunction({
      name: 'collectOrCancel',
      data: {
        merchantId: app.globalData.merchantInfo._id,
        operation: 2,
      },
      success: res=>{
        let {mess} = res.result
        if (mess.code === 3) {
          this.setData({
            collectionStar: 'star'
          })
        }
        else if (mess.code === 4) {
          this.setData({
            collectionStar: 'star-o'
          })
        }
      },
      fail: err=>{

      }
    })
  }
})
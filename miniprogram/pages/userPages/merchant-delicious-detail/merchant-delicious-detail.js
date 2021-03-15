// miniprogram/pages/userPages/merchant-delicious-detail/merchant-delicious-detail.js
import tool from "../../public/tools/tool.js";
let merchantInfo = {}
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
    // 类目列表    （假数据）
    categoryList: [
      {
        title: '满减专区',
        badge: 1,
      },
      {
        title: '折扣专区',
        badge: 5,
      },
      {
        title: '新品专区',
        badge: 0,
      },
    ],
    merchantList: [
      {
        title: '满减专区',
        foodList: [
          {
            price: 10.00,
            desc: '描述信息',
            title: '满减第一个商品',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
        ]
      },
      {
        title: '折扣专区',
        foodList: [
          {
            price: 10.00,
            desc: '描述信息',
            title: '折扣第一个商品',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
        ]
      },
      {
        title: '新品专区',
        foodList: [
          {
            price: 10.00,
            desc: '描述信息',
            title: '新品第一个商品',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
          {
            price: 10.00,
            desc: '描述信息',
            title: '商品标题',
            url: 'https://img01.yzcdn.cn/vant/ipad.jpeg'
          },
        ]
      },
    ],
    arr: [0],
    // -------------------------------------- 评价 -----------------------------------------------
    // -------------------------------------- 商家 -----------------------------------------------
    // 商家介绍轮播图
    swiperImgList: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1901359579,1861271908&fm=26&gp=0.jpg', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1840683049,2335736361&fm=26&gp=0.jpg' ,'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2905099515,729646340&fm=26&gp=0.jpg'],
  },
  // 点击收藏
  collectionMerchant() {
    this.setData({
      collectionStar: this.data.collectionStar == 'star-o' ? 'star' : 'star-o' 
    })
  },
  // -------------------------------------------- 点菜 --------------------------------------------
// 滑动右边判断是哪个sidebar
judgeScrollWhere(height) {
  console.log('我动啦')
  this.data.arr.forEach((item, i)=> {
    if (height >= item && height < this.data.arr[i+1]) {
       this.setData({
        indexMaodian: `b${i+1}`,
        activeKey: i,
       });
    }
  })
},
onPageScroll: tool.debounce(function(res) {
  // 通过滑动的距离判断页面滑动那个区域让后让顶部的标签栏切换到对应位置
  console.log(res)
  var height = Number(res[0].detail.scrollTop)
  this.judgeScrollWhere(height)
}, 100), 
 // 切换tab ‘点菜’ ‘评价’ ‘商家’
 switTab(event) {
   if (event.detail.name == 0) {
     this.setData({
       showSubmit: true,
     })
   }
   else {
    this.setData({
      showSubmit: false,
    }) 
   }
},
 // 跳转到对应的标签详情内容区
 toDetail(e) {
   console.log(e)
  let id = e.target.dataset.id
  this.setData({
   storeDetail: 'a'+id
  })
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  this.merchantInfo = JSON.parse(options.item)
  console.log(this.merchantInfo)
  let tmpList = this.merchantInfo.merchantMenuList ? this.merchantInfo.merchantMenuList.map((obj)=>{
    let tmpObj = {
      title: obj.title
    }
    return tmpObj
  }) : []
  this.setData({
    merchantList: this.merchantInfo.merchantMenuList ? this.merchantInfo.merchantMenuList : [],
    categoryList: tmpList,
    merchantInfo: this.merchantInfo
  })
  this.data.merchantList.forEach((item, i)=>{
    this.data.arr[i + 1] = 120*item.foodList.length + this.data.arr[i];
  })
  // 加入锚点标记id
  var tmpCategoryList = this.data.categoryList
  var tmpMerchantList = this.data.merchantList
  tmpCategoryList.forEach((item, i) => {
    item.dataId = i + 1;
    item.maodian = 'b' + ( i + 1);
  })
  tmpMerchantList.forEach((item, i) => {
    item.id = 'a' + ( i + 1);
  })
  this.setData({
   categoryList: tmpCategoryList,
   merchantList: tmpMerchantList,
  });
 },
 // --------------------------------------------- 评价 -------------------------------------------------

 // --------------------------------------------- 商家 -------------------------------------------------
 previewImg(e) {
  wx.previewImage({
    current: this.merchantInfo.merchantSignUpInfo.merchantSignUpImages.merchantEnvironment[e.currentTarget.dataset.i], // 当前显示图片的http链接
    urls: this.merchantInfo.merchantSignUpInfo.merchantSignUpImages.merchantEnvironment // 需要预览的图片http链接列表
  })
},
  // 联系商家
  contactOfficial() {
    wx.makePhoneCall({
      phoneNumber: '15541155173',
      success:(res)=> {
      },
      fail:(res)=> {
      },
    })
  },
})
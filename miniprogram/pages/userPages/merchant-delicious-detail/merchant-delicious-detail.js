// miniprogram/pages/userPages/merchant-delicious-detail/merchant-delicious-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSubmit: true,
    activeKey: 0,
    // 标签锚点跳转值
    indexMaodian: 'a',
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
        badge: null,
      },
    ]
  },
  // 点击收藏
  collectionMerchant() {
    this.setData({
      collectionStar: this.data.collectionStar == 'star-o' ? 'star' : 'star-o' 
    })
  },
// 监听页面滑动距离
onPageScroll(e) {
  // 通过滑动的距离判断页面滑动那个区域让后让顶部的标签栏切换到对应位置
  console.log(e)
  var height = Number(e.detail.scrollTop)
  console.log(height)
  if (height <= 800) {
   // 滑到1区域
   this.setData({
    indexMaodian: 'b1',
    activeKey: '0',
   });
  } else if (height > 800 && height<= 1512) {
   // 滑到2区域
   this.setData({
    indexMaodian: 'b2',
    activeKey: '1',
   });
  } else if (height > 1512 && height <= 1821) {
  // 滑到3区域
   this.setData({
    indexMaodian: 'b3',
    activeKey: '2',
   });
  }
 
 
 },
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
  var systemInfo = wx.getSystemInfoSync();
  var windowHeight = systemInfo.windowHeight;
  // 加入锚点标记id
  var tmpList = this.data.categoryList
  tmpList.forEach((item, i) => {
    item.dataId = i + 1;
    item.maodian = 'b' + ( i + 1);
  })
  // 拿到导航栏以下可视区域的高度
  this.setData({
   height: windowHeight,
   categoryList: tmpList
  });
 },
 

})
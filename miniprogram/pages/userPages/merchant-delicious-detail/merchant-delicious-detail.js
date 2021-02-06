// miniprogram/pages/userPages/merchant-delicious-detail/merchant-delicious-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    // 标签锚点跳转值
    indexMaodian: 'a',
    // 标签详情内容锚点跳转
    storeDetail: 'a1'
  },
// 监听页面滑动距离
onPageScroll(e) {
  // 通过滑动的距离判断页面滑动那个区域让后让顶部的标签栏切换到对应位置
  console.log('我在滑动')
  var height = Number(e.detail.scrollTop)
  console.log(height)
  if (height <= 100) {
   // 滑到1区域
   this.setData({
    indexMaodian: 'a',
    activeKey: '1',
   });
  } else if (height > 100 && height<= 200) {
   // 滑到2区域
   this.setData({
    indexMaodian: 'b',
    activeKey: '2',
   });
  } else if (height > 200 && height <= 260) {
  // 滑到3区域
   this.setData({
    indexMaodian: 'c',
    activeKey: '3',
   });
  }
 
 
 },
 // 跳转到对应的标签详情内容区
 toDetail(e) {
   console.log(e)
  let id = e.target.dataset.id
  this.setData({
   storeDetail: id
  })
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  var systemInfo = wx.getSystemInfoSync();
  var windowHeight = systemInfo.windowHeight;
  // 拿到导航栏以下可视区域的高度
  this.setData({
   height: windowHeight
  });
 },
 

})
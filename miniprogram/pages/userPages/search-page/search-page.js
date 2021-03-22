// miniprogram/pages/userPages/search-page/search-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    wx.showToast({
      title: '搜索' + this.data.value,
      icon: 'none'
    })
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
    console.log(e);  
  },
})
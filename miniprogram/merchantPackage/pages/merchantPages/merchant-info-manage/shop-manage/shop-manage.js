// miniprogram/merchantPackage/pages/merchantPages/merchant-info-manage/shop-manage/shop-manage.js
Page({

  data: {
    checked: true,
    currentDate: '12:00',
    minHour: 10,
    maxHour: 20,
    // 弹出层
    show: false,
  },

  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  // 时间选择
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  // 弹出层
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
})
class ShopDetailModel {
  // 获取商家菜单、获取商家详细信息等
  getMenuList(data) {
    return wx.cloud.callFunction({
      name: 'getMerchantMenuList',
      data: {
        id: data.id,
        role: data.role,
      },
    })
    .then(res => {
      return res
    })
  }
  getCollectStatus(data) {
    return wx.cloud.callFunction({
      name: 'collectOrCancel',
      data: {
        merchantId: data.id,
        operation: data.operation,
      },
    })
    .then(res => {
      return res
    })
  }
  collectOrCancel(data) {
    return wx.cloud.callFunction({
      name: 'collectOrCancel',
      data: {
        merchantId: data.id,
        operation: data.operation,
      },
    })
    .then(res => {
      return res
    })
  }
}

export {
  ShopDetailModel
}
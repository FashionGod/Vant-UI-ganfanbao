class UserOrderModel {
  // 云函数 查询商家列表
  createOrder(data) {
    return wx.cloud.callFunction({
      name: 'createOrder',
      data: {
        orderInfo: data
      }
    })
    .then(res => {
      return res.result.mess
    })
    .catch(err => {
      console.error(err)
    })
  }
  // 查询订单id列表
  getOrderIdList() {
    return wx.cloud.callFunction({
      name: 'getOrderIdList',
      data: {
        role: 0, // 0用户 1商家 2骑手
        // openid: app.globalData.loginInfo.openid
      }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err)
    })
  }
  // 获取订单列表
  getOrderList(orderIds) {
    return wx.cloud.callFunction({
      name: 'getOrderList',
      data: {
        orderIds: orderIds
      }
    })
    .then(res => {
      return res.result.mess
    })
    .catch(err => {
      console.error(err)
    })
  }

}

export {
  UserOrderModel
}
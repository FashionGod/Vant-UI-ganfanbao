class MerchantOrderModel {
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
  getOrderIdList(loginInfo) {
    return wx.cloud.callFunction({
      name: 'getOrderIdList',
      data: {
        role: 1, // 0用户 1商家 2骑手
        merchantId: loginInfo.id,
        status: loginInfo.status, // 0新订单 1备餐完成 2骑手接单 3骑手送达
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
  // 更改订单状态
  updateOrderStatus(orderId) {
    return wx.cloud.callFunction({
      name: 'updateOrderStatus',
      data: {
        role: 1, // 1为商家 2为骑手
        orderId: orderId
      }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err)
    })
  }

}

export {
  MerchantOrderModel
}
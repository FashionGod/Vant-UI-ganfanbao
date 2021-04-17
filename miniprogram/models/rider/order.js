class RiderOrderModel {
  // 查询订单id列表
  getOrderIdList(loginInfo) {
    return wx.cloud.callFunction({
      name: 'getOrderIdList',
      data: {
        role: 2, // 0用户 1商家 2骑手
        riderId: loginInfo.id,
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
  updateOrderStatus(data) {
    return wx.cloud.callFunction({
      name: 'updateOrderStatus',
      data: {
        role: 2, // 1为商家 2为骑手
        orderId: data.orderId,
        loginInfo: data.loginInfo,
        status: data.status
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
  RiderOrderModel
}
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
  // 查询全部订单id列表
  getOrderIdList() {
    return wx.cloud.callFunction({
      name: 'getOrderIdList',
      data: {
        role: 0, // 0用户 1商家 2骑手
        operateType: 0, // 0查询所有的 1查询未评价的
      }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err)
    })
  }
  // 查询未评价订单id列表
  getUnEvaluatedOrderIdList() {
    return wx.cloud.callFunction({
      name: 'getOrderIdList',
      data: {
        role: 0, // 0用户 1商家 2骑手
        operateType: 1, // 0查询所有的 1查询未评价的
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
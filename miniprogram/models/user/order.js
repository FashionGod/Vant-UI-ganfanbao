class OrderModel {
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
}

export {
  OrderModel
}
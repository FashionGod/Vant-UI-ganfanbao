class OrderModel {
  // 云函数 查询商家列表
  createOrder(data) {
    return wx.cloud.callFunction({
      name: 'createOrder',
      data: {
        merchantIds: merchantIds
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
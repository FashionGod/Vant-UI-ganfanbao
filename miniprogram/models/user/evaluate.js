class EvaluateModel {
  // 增加评价
  addEvaluate(data) {
    return wx.cloud.callFunction({
      name: 'addOrDelEvaluate',
      data: {
        orderId: data.orderId,
        merchantId: data.merchantId,
        starCount: data.starCount,
        content: data.content,
        operateType: 1, // 0为查询 1为新增 2为删除
      }
    })
    .then(res => {
      return res.result
    })
    .catch(err => {
      console.error(err)
    })
  }
  // 云函数 查询商家列表
  getMerchantList(merchantIds) {
    return wx.cloud.callFunction({
      name: 'getMerchantList',
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
  // 查询商家Ids列表
  getMerchantIdList() {
    return wx.cloud.callFunction({
      name: 'getMerchantIdList'
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
  EvaluateModel
}
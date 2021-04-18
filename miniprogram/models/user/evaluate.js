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
  // 查看是否已经评论
  getEvaluate(data) {
    console.log(data)
    return wx.cloud.callFunction({
      name: 'getEvaluate',
      data: {
        orderId: data.orderId?data.orderId:null,
        merchantId: data.start != null?data.merchantId:null,
        start: data.start != null?data.start:null,
        operateType: data.operateType, // 0为查看是否有评价 1为查看评价列表
      }
    })
    .then(res => {
      console.log(res)
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
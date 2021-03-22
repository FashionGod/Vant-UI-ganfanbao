class HomeModel {
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
  HomeModel
}
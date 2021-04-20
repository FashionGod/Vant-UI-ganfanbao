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
  getMerchantIdList(data) {
    console.log(data)
    return wx.cloud.callFunction({
      name: 'getMerchantIdList',
      data: {
        operateType: 0, // 0查询所有过审商家 1查询该用户已收藏的商家 2根据输入条件查询
        sortType: data.sortType,
      }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err)
    })
  }
  // 查询已收藏过的商家Ids列表
  getCollectedMerchantIdList() {
    return wx.cloud.callFunction({
      name: 'getMerchantIdList',
      data: {
        operateType: 1, // 0查询所有过审商家 1查询该用户已收藏的商家 2根据输入条件查询
      }
    })
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err)
    })
  }
  // 根据输入条件查询商家ids列表
  searchMerchantIdByContent(data) {
    return wx.cloud.callFunction({
      name: 'getMerchantIdList',
      data: {
        operateType: 2, // 0查询所有过审商家 1查询该用户已收藏的商家 2根据输入条件查询
        searchContent: data.searchContent, 
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
  HomeModel
}
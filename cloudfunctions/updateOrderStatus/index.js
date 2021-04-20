// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'ganfanbao-1goayejba4ec1d03'
})
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100
const wxContext = cloud.getWXContext()

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.role == 1) { // 如果是商家
    try {
      const result = await db.collection('orderCollection').where({
        _id: event.orderId
      }).update({
        data: {
          orderInfo: {
            orderStatus: _.inc(1)
          }
        }
      })
      return handleSuccess(result)
    } catch (error) {
      return handleErr(error)
    }
  } else if (event.role == 2) { // 如果是骑手
    if (event.status == 0) { // 新任务
      try {
        const result = await db.collection('orderCollection').where({
          _id: event.orderId
        })
        .get()
        .then(res => {
          if (res.data[0].orderInfo.riderName == '') { // 判断订单是否已经被抢，防止覆盖
            return db.collection('orderCollection').where({
              _id: event.orderId
            }).update({
              data: {
                orderInfo: {
                  riderName: event.loginInfo.riderName,
                  riderPhone: event.loginInfo.riderPhone
                }
              }
            })
          }
          else {
            return null // 订单已经被抢
          }
        })
        return handleSuccess(result)
      } catch (error) {
        return handleErr(error)
      }
    }
    else if (event.status == 1) { // 待取货
      try {
        const result = await db.collection('orderCollection').where({
          _id: event.orderId
        }).update({
          data: {
            orderInfo: {
              orderStatus: 2 // 改为配送中
            }
          }
        })
        return handleSuccess(result)
      } catch (error) {
        return handleErr(error)
      }
    }
    else if (event.status == 2) { // 配送中
      try {
        const result = await db.collection('orderCollection').where({
          _id: event.orderId
        }).update({
          data: {
            orderInfo: {
              orderStatus: 3 // 改为已送达
            }
          }
        })
        return handleSuccess(result)
      } catch (error) {
        return handleErr(error)
      }
    }
  }
}

function handleSuccess(data = {}) {
  return mess = {
    code: 1,
    message: '更新成功',
    data: data,
    openid: wxContext.OPENID,
  }
}

function handleErr(err) {
  return mess = {
    code: 0,
    message: '更新失败',
    err: err
  }

}
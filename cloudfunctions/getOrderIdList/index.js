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
  if (event.role == 0) { // 如果是用户
    const countResult = await db.collection('orderCollection').where({
      orderInfo: {
        userId: wxContext.OPENID
      }
    }).count()
    const total = countResult.total
    const batchTimes = Math.ceil(total / 100)
    const tasks = []
    let ids = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('orderCollection').where({
          orderInfo: {
            userId: wxContext.OPENID
          }
        })
        .skip(i * MAX_LIMIT).limit(MAX_LIMIT).field({
          _id: true
        }).get().then(res => {
          res.data.forEach(v => {
            ids.push(v._id)
          })
        })
      tasks.push(promise)
    }
    return Promise.all(tasks).then(res => {
      return handleSuccess(ids)
    }).catch(err => {
      return handleErr(err)
    })
  } else if (event.role == 1) { // 如果是商家
    const countResult = await db.collection('orderCollection').where({
      orderInfo: {
        merchantId: event.merchantId,
        orderStatus: event.status
      }
    }).count()
    const total = countResult.total
    const batchTimes = Math.ceil(total / 100)
    const tasks = []
    let ids = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('orderCollection').where({
          orderInfo: {
            merchantId: event.merchantId,
            orderStatus: event.status
          }
        })
        .skip(i * MAX_LIMIT).limit(MAX_LIMIT).field({
          _id: true
        }).get().then(res => {
          res.data.forEach(v => {
            ids.push(v._id)
          })
        })
      tasks.push(promise)
    }
    return Promise.all(tasks).then(res => {
      return handleSuccess(ids)
    }).catch(err => {
      return handleErr(err)
    })
  } else if (event.role == 2) { // 如果是骑手

  }
}

function handleSuccess(data = {}) {
  return mess = {
    code: 1,
    message: '查询成功',
    data: data,
    openid: wxContext.OPENID,
  }
}

function handleErr(err) {
  return mess = {
    code: 0,
    message: '查询失败',
    err: err
  }

}
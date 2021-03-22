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

  const countResult = await db.collection('merchantSignUpInfoCollection').where({
    checked: true
  }).count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / 100)
  const tasks = []
  let ids = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('merchantSignUpInfoCollection')
        .where({
          checked: true
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
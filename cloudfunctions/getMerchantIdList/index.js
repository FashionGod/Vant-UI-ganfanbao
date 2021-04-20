// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'ganfanbao-1goayejba4ec1d03'
})
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.operateType == 0) { // 查询所有过审商家
    if (event.sortType == 0) { // 0盲选乱序(前端处理，后端正常查询) 1评分最高 2销量最高 3综合排序
      let countResult = await db.collection('merchantSignUpInfoCollection').where({
        checked: true
      }).count()
      let total = countResult.total
      let batchTimes = Math.ceil(total / 100)
      let tasks = []
      let ids = []
      for (let i = 0; i < batchTimes; i++) {
        let promise = db.collection('merchantSignUpInfoCollection')
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
    else if (event.sortType == 1) {
      let countResult = await db.collection('merchantSignUpInfoCollection').where({
        checked: true
      }).count()
      let total = countResult.total
      let batchTimes = Math.ceil(total / 100)
      let tasks = []
      let ids = []
      for (let i = 0; i < batchTimes; i++) {
        let promise = db.collection('merchantSignUpInfoCollection')
          .where({
            checked: true
          })
          .orderBy('starScore', 'desc')
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
    else if (event.sortType == 2) {
      let countResult = await db.collection('merchantSignUpInfoCollection').where({
        checked: true
      }).count()
      let total = countResult.total
      let batchTimes = Math.ceil(total / 100)
      let tasks = []
      let ids = []
      for (let i = 0; i < batchTimes; i++) {
        let promise = db.collection('merchantSignUpInfoCollection')
          .where({
            checked: true
          })
          .orderBy('salesMonthly', 'desc')
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
    else if (event.sortType == 3) {
      let countResult = await db.collection('merchantSignUpInfoCollection').where({
        checked: true
      }).count()
      let total = countResult.total
      let batchTimes = Math.ceil(total / 100)
      let tasks = []
      let ids = []
      for (let i = 0; i < batchTimes; i++) {
        let promise = db.collection('merchantSignUpInfoCollection')
          .where({
            checked: true
          })
          .orderBy('starScore', 'desc')
          .orderBy('salesMonthly', 'desc')
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
  } else if (event.operateType == 1) { // 查询所有过审且该用户收藏的商家
    let countResult = await db.collection('collection').where({
      _openid: wxContext.OPENID
    }).count()
    let total = countResult.total
    let batchTimes = Math.ceil(total / 100)
    let tasks = []
    let ids = []
    for (let i = 0; i < batchTimes; i++) {
      let promise = db.collection('collection')
        .where({
          _openid: wxContext.OPENID
        })
        .skip(i * MAX_LIMIT).limit(MAX_LIMIT).field({
          merchantId: true
        }).get().then(res => {
          res.data.forEach(v => {
            ids.push(v.merchantId)
          })
        })
      tasks.push(promise)
    }
    return Promise.all(tasks).then(res => {
      return handleSuccess(ids)
    }).catch(err => {
      return handleErr(err)
    })
  } else if (event.operateType == 2) { // 根据输入字符查询商家
    let re = db.RegExp({
      regexp: '.*' + event.searchContent + '.*'
    })
    let countResult = await db.collection('merchantSignUpInfoCollection').where({
      checked: true,
      cardInfo: {
        shopName: re
      }
    }).count()
    let total = countResult.total
    let batchTimes = Math.ceil(total / 100)
    let tasks = []
    let ids = []
    for (let i = 0; i < batchTimes; i++) {
      let promise = db.collection('merchantSignUpInfoCollection')
        .where({
          checked: true,
          cardInfo: {
            shopName: re
          }
        })
        .skip(i * MAX_LIMIT).limit(MAX_LIMIT).field({
          merchantId: true
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
}

function handleSuccess(data = {}) {
  return mess = {
    code: 1,
    message: '查询成功',
    data: data
  }
}

function handleErr(err) {
  return mess = {
    code: 0,
    message: '查询失败',
    err: err
  }

}
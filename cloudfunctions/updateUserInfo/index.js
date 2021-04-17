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
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    return db.collection('userInfo').where({
        _id: wxContext.OPENID
      }).count()
      .then(res => {
        if (res.total <= 0) {
          return db.collection('userInfo').add({
            data: {
              _id: wxContext.OPENID,
              avatarUrl: event.avatarUrl,
              city: event.city,
              country: event.country,
              gender: event.gender,
              language: event.language,
              nickName: event.nickName,
              province: event.province,
            }
          })
        } else {
          return db.collection('userInfo').doc(wxContext.OPENID).update({
            data: {
              avatarUrl: event.avatarUrl,
              city: event.city,
              country: event.country,
              gender: event.gender,
              language: event.language,
              nickName: event.nickName,
              province: event.province,
            }
          })
        }
      })
      .then(res => {
        return db.collection('userInfo').doc(wxContext.OPENID).get()
      })
      .then(res => {
        return handleSuccess(res.data)
      })
  } catch (err) {
    return handleErr(err)
  }
}

function handleSuccess(data = {}) {
  return {
    success: true,
    data: data
  }
}

function handleErr(err) {
  return {
    success: false,
    err: err
  }
}
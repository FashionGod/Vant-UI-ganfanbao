// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'ganfanbao-1goayejba4ec1d03'
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const mess = {}
  try {// 1是收藏 0是取消收藏 2是查看是否收藏
    if (event.operation === 1) {
      mess.data = await db.collection('collection').add({
        data: {
          _openid: wxContext.OPENID,
          merchantId: event.merchantId
        }
      })
      mess.message = '已收藏'
      mess.code = 1
    }
    else if (event.operation === 0) {
      mess.data = await db.collection('collection').where({
        _openid: wxContext.OPENID,
        merchantId: event.merchantId
      })
      .remove()
      mess.message = '已取消'
      mess.code = 2
    }
    else if (event.operation === 2) {
      mess.data = await db.collection('collection').where({
        _openid: wxContext.OPENID,
        merchantId: event.merchantId
      }).count()
      if (mess.data.total > 0) {
        mess.message = '已收藏'
        mess.code = 3 // 已收藏
      }
      else {
        mess.message = '未收藏'
        mess.code = 4 // 未收藏
      }
    }
  } catch (error) {
    mess.code = 0
    mess.message = '请求失败'
    mess.err = error
  }
  return {
    mess,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

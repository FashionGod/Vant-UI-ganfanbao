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
  try {
    mess.data = await db.collection('orderCollection')
    .where({
      _id: _.in(event.orderIds)
    })
    .field({
      orderInfo: true,
      _id: true,
    }).get()
    mess.code = 1
    mess.message = '查询成功'
    mess.openid = wxContext.OPENID
  } catch (error) {
    mess.code = 0
    mess.message = '查询失败'
    mess.err = error
  }
  return {
    mess
  }
}
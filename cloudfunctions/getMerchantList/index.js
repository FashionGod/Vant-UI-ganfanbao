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
    mess.data = await db.collection('merchantSignUpInfoCollection')
    .where({
      _id: _.in(event.merchantIds)
    })
    .field({
      cardInfo: true,
      _id: true,
      salesMonthly: true,
      starScore: true
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
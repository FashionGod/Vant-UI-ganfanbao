// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'ganfanbao-1goayejba4ec1d03'
})
const db = cloud.database({
  throwOnNotFound: false
})
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const mess = {}
  try {
      mess.data = await db.collection('merchantSignUpInfoCollection').doc(event.id).update({
        data: {
          merchantMenuList: event.menuList
        }
      })
  } catch (error) {
    mess.code = 0
    mess.message = '云函数调用失败'
    mess.err = error
  }
  return {
    mess,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
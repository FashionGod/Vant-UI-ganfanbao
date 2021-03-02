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
    if (event.role == 1) {
      mess.data = await db.collection('merchantSignUpInfoCollection').doc(event.userName).get()
    }
    else if (event.role == 2) {
      mess.data = await db.collection('riderSignUpInfoCollection').doc(event.userName).get()
    }
    if (mess.data.data != null) {
      if (mess.data.data.merchantSignUpInfo.password == event.password) {
        mess.code = 1
        mess.message = '密码正确'
      }
      else {
        mess.code = 2
        mess.message = '密码错误'
      }
    }
    else {
      mess.code = 3
      mess.message = '用户名不存在'
    }
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
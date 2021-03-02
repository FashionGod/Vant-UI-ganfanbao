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
  let search = null
  if (event.role == 1) {
    try {
        search = await db.collection('merchantSignUpInfoCollection').doc(event.userName).get()
        if (search.data != null) {
          mess.code = 2
          mess.message = '用户名已存在'
        }
        else {
          mess.code = 1
          mess.message = '用户名可用'
        }
    } catch (error) {
      mess.code = 0
      mess.message = '用户名查重失败'
    }
  }
  else if (event.role == 2) {
    try {
        search = await db.collection('riderSignUpInfoCollection').doc(event.userName).get()
        if (search.data != null) {
          mess.code = 2
          mess.message = '用户名已存在'
        }
        else {
          mess.code = 1
          mess.message = '用户名可用'
        }
    } catch (error) {
      mess.code = 0
      mess.message = '用户名查重失败'
    }
  }
  return {
    mess,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
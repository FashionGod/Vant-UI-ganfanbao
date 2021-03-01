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
        await db.collection('merchantSignUpInfoCollection').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: event.merchantSignUpInfo.userName, // 用户名为唯一Id
          merchantSignUpInfo: {
            name: event.merchantSignUpInfo.name,
            userName: event.merchantSignUpInfo.userName,
            IDNumber: event.merchantSignUpInfo.IDNumber,
            password: event.merchantSignUpInfo.password,
            phoneNumber: event.merchantSignUpInfo.phoneNumber,
            merchantSignUpImages: event.merchantSignUpInfo.merchantSignUpImages,
            checked: false
          }
        },
      })
      mess.code = 1
      mess.message = '注册成功'
  } catch (error) {
    mess.code = 0
    mess.message = '注册失败'
  }
  return {
    mess,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
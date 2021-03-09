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
        await db.collection('riderSignUpInfoCollection').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: event.riderSignUpInfo.phoneNumber, // 手机号为唯一Id
          riderSignUpInfo: {
            name: event.riderSignUpInfo.name,
            userName: event.riderSignUpInfo.userName,
            IDNumber: event.riderSignUpInfo.IDNumber,
            password: event.riderSignUpInfo.password,
            phoneNumber: event.riderSignUpInfo.phoneNumber,
            riderSignUpImages: event.riderSignUpInfo.riderSignUpImages,
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
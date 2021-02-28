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
    const search = await db.collection('merchantSignUpInfoCollection').where({
      _id: event.merchantSignUpInfo.IDNumber
    }).get()
    if (search.data.length == 0) {
        await db.collection('merchantSignUpInfoCollection').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: event.merchantSignUpInfo.IDNumber, // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          merchantSignUpInfoList: [
            {
              name: event.merchantSignUpInfo.name,
              IDNumber: event.merchantSignUpInfo.IDNumber,
              password: event.merchantSignUpInfo.password,
              phoneNumber: event.merchantSignUpInfo.phoneNumber,
              checked: false
            }
          ]
        },
      })
      mess.code = 1
      mess.message = '注册成功'
    } else {
      event.merchantSignUpInfo.checked = false
      db.collection('merchantSignUpInfoCollection').doc(event.merchantSignUpInfo.IDNumber).update({
        data: {
          merchantSignUpInfoList: _.push([event.merchantSignUpInfo])
        }
      })
      mess.code = 1
      mess.message = '注册成功'
    }
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
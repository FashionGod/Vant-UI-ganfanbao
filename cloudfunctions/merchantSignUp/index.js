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
  let envList = event.merchantSignUpInfo.merchantSignUpImages.merchantEnvironment ? event.merchantSignUpInfo.merchantSignUpImages.merchantEnvironment : []
  envList.push(event.merchantSignUpInfo.merchantSignUpImages.merchantDoor)
  envList.reverse()
  try {
        await db.collection('merchantSignUpInfoCollection').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: event.merchantSignUpInfo.phoneNumber, // 手机号为唯一Id
          merchantSignUpInfo: {
            name: event.merchantSignUpInfo.name,
            IDNumber: event.merchantSignUpInfo.IDNumber,
            phoneNumber: event.merchantSignUpInfo.phoneNumber,
            managementAddress: event.merchantSignUpInfo.managementAddress,
            managementArrange: event.merchantSignUpInfo.managementArrange,
            deadline: event.merchantSignUpInfo.deadline,
            companyName: event.merchantSignUpInfo.companyName,
          },
          cardInfo: {
            shopName: event.merchantSignUpInfo.shopName,
            merchantLogo: event.merchantSignUpInfo.merchantSignUpImages.merchantLogo,
          },
          merchantSignUpImages: event.merchantSignUpInfo.merchantSignUpImages,
          businessLicense: event.merchantSignUpInfo.merchantSignUpImages.businessLicense,
          foodLicense: event.merchantSignUpInfo.merchantSignUpImages.foodLicense,
          merchantEnvironment: envList,
          starScore: 0,
          salesMonthly: 0, 
          password: event.merchantSignUpInfo.password,
          checked: false,
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
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
  // 用户获取商铺详情
  if (event.role === 0) {
    try {
      mess.data = await db.collection('merchantSignUpInfoCollection').doc(event.id).field({
        merchantMenuList: true,
        merchantSignUpInfo: true,
        businessLicense: true,
        foodLicense: true,
        merchantEnvironment: true,
      }).get()
      mess.code = 1
      mess.message = '查询成功'
    } catch (error) {
      mess.code = 0
      mess.message = '查询失败'
      mess.err = error
    }
  }
  // 商家管理菜单时获取菜单详情
  else if (event.role === 1) {
    try {
      mess.data = await db.collection('merchantSignUpInfoCollection').doc(event.id).field({
        merchantMenuList: true
      }).get()
      mess.code = 1
      mess.message = '查询成功'
    } catch (error) {
      mess.code = 0
      mess.message = '查询失败'
      mess.err = error
    }
  }
  return {
    mess,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'ganfanbao-1goayejba4ec1d03'
})
const db = cloud.database({
  throwOnNotFound: false
})
const _ = db.command
const MAX_LIMIT = 100
const wxContext = cloud.getWXContext()
// 云函数入口函数
let search = null
const mess = {}
exports.main = async (event, context) => {
  if (event.operateType == 0) { // 0查询是否有评价
    try {
      search = await db.collection('evaluateCollection').where({
        orderId: event.orderId,
      }).get()
      if (search.data != null) {
        mess.code = 2
        mess.message = '评价存在'
        mess.data = search.data
        return handleSuccess(mess)
      }
      else {
        mess.code = 1
        mess.message = '未评价'
        mess.data = search.data
        return handleSuccess(mess)
      }
  } catch (error) {
    mess.code = 0
    mess.message = '查询失败'
    mess.error = error
    return handleErr(mess)
  }
  }
}

function handleSuccess(data = {}) {
  return data
}

function handleErr(data = {}) {
  return data

}
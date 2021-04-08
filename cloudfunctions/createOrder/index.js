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
        event.orderInfo.orderStatus = 0// 增加订单状态为 0已下单 1备餐完成 2骑手接单 3骑手配送 4餐已送达
        event.orderInfo.evaluateStatus = 0// 增加评价状态为 0未评价 1已评价
        await db.collection('orderCollection').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: event.orderInfo.deliveryWay + '' + event.orderInfo.payTime, // 订单号为（外卖0 自取1 + 时间戳）
          orderInfo: event.orderInfo,
        },
      })
      mess.code = 1
      mess.message = '订单创建成功'
  } catch (error) {
    mess.code = 0
    mess.message = '订单创建失败'
  }
  return {
    mess,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
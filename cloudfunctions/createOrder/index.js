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
  // const orderNumber = await db.collection('orderCollection').count() + 1（暂时舍弃）
  try {
        event.orderInfo.orderStatus = 0// 增加订单状态为 0已下单 1备餐完成 2骑手送餐 3餐已送达
        event.orderInfo.evaluateStatus = 0// 增加评价状态为 0未评价 1已评价
        // event.orderInfo.orderNumber = orderNumber// 增加订单序号，作为商家查看有多少个订单 （暂时舍弃）
        await db.collection('orderCollection').add({
        // data 字段表示需新增的 JSON 数据
        data: { // 外卖0 自取1
          _id: event.orderInfo.orderId, // 订单号为（时间戳）
          orderInfo: event.orderInfo,
          createTime: db.serverDate()
        },
      })
      .then(res => {
        return db.collection('merchantSignUpInfoCollection').doc(event.orderInfo.merchantId).update({
          // data 字段表示需新增的 JSON 数据
          data: {
            salesMonthly: _.inc(1)
          },
        })
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
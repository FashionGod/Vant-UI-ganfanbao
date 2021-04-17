// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'ganfanbao-1goayejba4ec1d03'
})
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100
const wxContext = cloud.getWXContext()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
    if (event.operateType === 0) {

    }
    else if (event.operateType === 1) {
      try {
        // 内容安全监测
        const res = await cloud.openapi.security.msgSecCheck({
          content: event.content
        })
        if (res.errCode != 0) {
          return handleErr('含有敏感内容,无法发布')
        }
        else {
          return db.collection('evaluateCollection').add({
              data: {
                _openid: wxContext.OPENID,
                orderId: event.orderId,
                merchantId: event.merchantId,
                commentId: event.commentId,
                starCount: event.starCount,
                content: event.content,
                merchantReply: '',
                createTime: db.serverDate()
              }
            })
            .then(res => {
              return db.collection('orderCollection').doc(event.orderId).update({
                data: {
                  orderInfo: {
                    evaluateStatus: 1
                  }
                }
              })
            })
            .then(res => {
              return handleSuccess(res)
            }).catch(err => {
              return handleErr(err)
            })
        }
      } catch (err) {
        return handleErr('含有敏感内容,无法发布')
      }
    }
    else if (event.operateType === 2) {

    }
  }
  

  function handleSuccess(data = {}) {
    return mess = {
      code: 1,
      message: '调用成功',
      data: data,
      openid: wxContext.OPENID,
    }
  }
  
  function handleErr(err) {
    return mess = {
      code: 0,
      message: '调用失败',
      err: err
    }
  
  }
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
    if (event.operateType === 0) { // 删除评价
      try {
        return db.collection('evaluateCollection').doc(event.evaluateId).remove()
        .then(res => {
          const data = db.collection('orderCollection').doc(event.orderId).update({
            data: {
              orderInfo: {
                evaluateStatus: 0
              }
            }
          })
          handleSuccess(data)
        })
      } catch (error) {
        handleErr(error)
      }
    }
    else if (event.operateType === 1) { // 新增评价
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
                starScore: event.starScore,
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
              return db.collection('merchantSignUpInfoCollection').where({
                _id: event.merchantId
              }).get()
            })
            .then(res => {
              let data = res.data[0]
              let caculatedScore = 0
              if (data.starScore == 0) { // 判断是否是第一个评价，如果有0就说明是第一单
                caculatedScore = event.starScore
              } else {
                caculatedScore = (event.starScore + data.starScore)/2 // 每次新来的评分和上一次的做平均数为新评分
              }
              return db.collection('merchantSignUpInfoCollection').doc(event.merchantId).update({
                data: {
                  starScore: caculatedScore,
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
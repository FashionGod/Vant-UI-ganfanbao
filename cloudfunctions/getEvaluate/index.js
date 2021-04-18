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
  else if (event.operateType == 1) { // 查询店铺内的所有评价
    let limit = 20
    let data = []
    return db.collection('evaluateCollection').where({
      merchantId: event.merchantId,
    }).count()
      .then(res => {
        let skip = res.total - event.start - limit
        if (skip <= 0) {
          limit = limit + skip
          skip = 0
        }
        return db.collection('evaluateCollection')
          .where({
            merchantId: event.merchantId,
          })
          .skip(skip)
          .limit(limit)
          .get()
      })
      .then(res => {
        data = data.concat(res)
        // 这里得到所有
        console.log(data)
        return _handleComment(data, wxContext.OPENID)
      })
      .then(res => {
        return handleSuccess(res.reverse())
      })
      .catch(err => {
        return handleErr(err)
      })
  }
}

function _handleComment(odata, openId) {
  console.log(odata)
  let data = JSON.parse(JSON.stringify(odata))
  let ids = []
  console.log(data)
  data[0].data.forEach(v => {
    console.log(v)
    ids.push(v._openid)
  })
  console.log(ids)
  return db.collection('userInfo').where({
      _id: _.in(ids)
    }).get()
    .then(res => {
      console.log(res)
      console.log(data)
      data[0].data.forEach(v => {
        res.data.forEach(v1 => {
          if (v1._id == v._openid) {
            v.userInfo = v1
            v.formatTime = _timeago(new Date(v.createTime).getTime())
            v.canDelete = false
            if (v._openid == openId) {
              v.canDelete = true
            }
          }
        })
      })
      return data
    })
}

function _timeago(dateTimeStamp) {
  //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime(); //获取当前时间毫秒
  var diffValue = now - dateTimeStamp; //时间差

  if (diffValue < 0) {
    return;
  }
  // 计算时间差的分，时，天，周，月
  var minC = diffValue / minute;
  var hourC = diffValue / hour;
  var dayC = diffValue / day;
  var weekC = diffValue / week;
  var monthC = diffValue / month;
  var result = ""
  if (monthC >= 1 && monthC <= 3) {
    result = " " + parseInt(monthC) + "月前"
  } else if (weekC >= 1 && weekC <= 3) {
    result = " " + parseInt(weekC) + "周前"
  } else if (dayC >= 1 && dayC <= 6) {
    result = " " + parseInt(dayC) + "天前"
  } else if (hourC >= 1 && hourC <= 23) {
    result = " " + parseInt(hourC) + "小时前"
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt(minC) + "分钟前"
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚"
  } else {
    var datetime = new Date();
    datetime.setTime(dateTimeStamp);
    var Nyear = datetime.getFullYear();
    var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    result = Nyear + "-" + Nmonth + "-" + Ndate
  }
  return result;
}

function handleSuccess(data = {}) {
  return {
    success: true,
    data: data
  }
}

function handleErr(err) {
  return {
    success: false,
    err: err
  }
}
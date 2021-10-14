const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
      console.log(event)
    var participants = []
    var dateNow = Date.now().toString()
   await db.collection('matches').add({
    // data 字段表示需新增的 JSON 数据
    data: {
        uniqueId: dateNow, 
        headcount: event.hc,
        date: event.date,
        duration: event.duration,
        location: event.location,
        participants: participants,
        finished: false
    }
  })
  return {
    success: true,
    data: dateNow
  }
  } catch (e) {
      console.log(e)
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: dateNow
    }
  }
}
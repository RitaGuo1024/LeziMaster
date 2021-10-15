const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    var validMatches = await db.collection('matches').get()

    var tempData = validMatches.data
    var result = []

    for (let i = 0; i < tempData.length; i++) {
        var current = tempData[i]
        if(current.participants.length === parseInt(current.headcount) && current.participants.includes(event.nickName)){
            result.push(current)
        }
    }
    return {
        success: true,
        data: result
    }
  } catch (e) {
      console.log(e)
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: result
    }
  }
}
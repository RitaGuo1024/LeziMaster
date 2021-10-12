const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建集合
   //await db.createCollection('ranks')
   await db.collection('ranks').add({
    // data 字段表示需新增的 JSON 数据
    data: {
        "name":"zigu", 
        "totalPoints":666, 
        "totalWin":13, 
        "totalLose":4, 
        "rank":0
    }
  })
  return {
    success: true
  }
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: 'create collection success'
    }
  }
}
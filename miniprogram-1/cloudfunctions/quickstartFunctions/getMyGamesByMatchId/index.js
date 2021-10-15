const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 获取openId云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('games').where({
    uniqueId:event.uniqueId
  }).get()
}
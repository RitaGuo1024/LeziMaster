const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    var match = await db.collection('matches').where({
        uniqueId: event.matchId
    }).get()
    var participants = match.participants.push(event.unionid)
    match.participants = participants

    await db.collection('matches').where({
        uniqueId: event.matchId
      })
        .update({
          data: {
            matches: match
          }
        })
    return {
      success: true,
      data: match
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}
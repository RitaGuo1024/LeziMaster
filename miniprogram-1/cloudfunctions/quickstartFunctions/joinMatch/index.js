const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    var match = await db.collection('matches').where({
        uniqueId: event.matchid
    }).get()
    match.data[0].participants.push(event.unionid)
    var updatedParticipants = match.data[0].participants

    await db.collection('matches').where({
        uniqueId: event.matchid
      })
        .update({
          data: {
            participants: updatedParticipants
          }
        })
    return {
      success: true,
      data: match.data[0]
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}
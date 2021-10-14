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

    if(match.data[0].participants.length >= parseInt(match.data[0].headcount)){
      return{
        success: false,
        data: "该比赛人数已满，请选择其他比赛加入😁"
      }
    }

    if(match.data[0].participants.includes(event.nickName)){
      console.log("加入过了")
      return{
        success: true,
        data: "您已经加入过该比赛，无需重复加入😂"
      }
    }
    match.data[0].participants.push(event.nickName)
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
      data: "恭喜你已加入！！😉"
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}
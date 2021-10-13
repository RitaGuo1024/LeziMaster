const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  var games = event.games
  var matchId = event.matchId
  console.log("resultGames", games)
  try {
    await db.collection('games').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        "games": games,
        "matchId": matchId
      }
    })
  } catch (e) {
    console.error(e)
  }

  var currentRankChanges = rankChanges(games)
  console.log("currentRankChanges", currentRankChanges)
  const _ = db.command
  var updatePromise = []
  for(var currentName in currentRankChanges) {
    updatePromise.push(db.collection("ranks").where({
      name: currentName
    }).update({
      data: {
        totalLose: _.inc(currentRankChanges[currentName].totalLose),
        totalWin: _.inc(currentRankChanges[currentName].totalWin),
        totalPoints: _.inc(currentRankChanges[currentName].score)
      }
    }))
  }

  return await Promise.all(updatePromise)
}

function rankChanges(games) {
  var userRanks = {}
  console.log("rankChanges.games: ", games)
  games.forEach(game => {
    if (!(game.left1 in userRanks)) {
      userRanks[game.left1] = { "score": 0, "totalWin": 0, "totalLose": 0 }
    }
    if (!(game.right1 in userRanks)) {
      userRanks[game.right1] = { "score": 0, "totalWin": 0, "totalLose": 0 }
    }
    if (!(game.left2 in userRanks)) {
      userRanks[game.left2] = { "score": 0, "totalWin": 0, "totalLose": 0 }
    }
    if (!(game.right2 in userRanks)) {
      userRanks[game.right2] = { "score": 0, "totalWin": 0, "totalLose": 0 }
    }

    if (game.leftScore > game.rightScore) {
      userRanks[game.left1].totalWin += 1
      userRanks[game.left2].totalWin += 1
      userRanks[game.right1].totalLose += 1
      userRanks[game.right2].totalLose += 1
    } else {
      userRanks[game.left1].totalLose += 1
      userRanks[game.left2].totalLose += 1
      userRanks[game.right1].totalWin += 1
      userRanks[game.right2].totalWin += 1
    }

    userRanks[game.left1].score += game.leftScore
    userRanks[game.left2].score += game.leftScore
    userRanks[game.right1].score += game.rightScore
    userRanks[game.right2].score += game.rightScore
  })

  return userRanks
}
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  var games = event.games
  var uniqueId = event.uniqueId
  console.log("resultGames", games)
  try {
    await db.collection('games').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        "games": games,
        "uniqueId": uniqueId
      }
    })
  } catch (e) {
    console.error(e)
  }

  var currentRankChanges = rankChanges(games)
  console.log("currentRankChanges", currentRankChanges)
  
  var updatePromise = []
  for(var currentName in currentRankChanges) {
    var currentUserRankItem = (await db.collection("ranks").where({name: currentName}).get()).data
    console.log("currentUserRankItem", currentUserRankItem)
    if (currentUserRankItem.length > 0) {
      updatePromise.push(db.collection("ranks").where({
        name: currentName
      }).update({
        data: {
          totalLose: _.inc(currentRankChanges[currentName].totalLose),
          totalWin: _.inc(currentRankChanges[currentName].totalWin),
          totalPoints: _.inc(currentRankChanges[currentName].score)
        }
      }))
    } else {
      updatePromise.push(
        db.collection("ranks").add({
          data: {
            name: currentName,
            totalLose: currentRankChanges[currentName].totalLose,
            totalWin: currentRankChanges[currentName].totalWin,
            totalPoints: currentRankChanges[currentName].score
          }
        })
      )
    }
  }

  await db.collection('matches').where({
    uniqueId: event.uniqueId
    })
      .update({
        data: {
          finished: true
        }
      })

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
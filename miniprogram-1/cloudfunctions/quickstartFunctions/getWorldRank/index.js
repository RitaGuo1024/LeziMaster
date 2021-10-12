const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  //const wxContext = cloud.getWXContext()

  return{
      demoData : [{"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":1},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":2},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":3},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":4},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":5},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":6},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":7},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":8},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":9},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":10},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":11},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":12},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":13},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":14},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":15},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":16},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":17},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":18},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":19},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":20},
                  {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":21}]
  }
}
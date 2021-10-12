// pages/badminton/badminton.js
Page({
  /**
   * Page initial data
   */
  data: {
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
                {"name":"yizhou", "totalPoints":329, "totalWin":13, "totalLose":4, "rank":21},],
    worldRank : []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: options.envId
      },
      data: {
        type: 'getWorldRank'
      }
    }).then((resp) => {
      console.log(resp)
      this.setData({
        worldRank: resp.result.data
      })
     wx.hideLoading()
   }).catch((e) => {
      this.setData({
        showUploadTip: true
      })
      console.log("exception-", e)
     wx.hideLoading()
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onTopRefresh: function () {

  }
})
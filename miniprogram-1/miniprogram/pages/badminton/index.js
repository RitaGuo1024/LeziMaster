// pages/badminton/badminton.js
Page({
  /**
   * Page initial data
   */
  data: {
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

      var sortedRanks = resp.result.data.sort((a, b) => {
        if (a.totalPoints !== b.totalPoints) {
          return b.totalPoints - a.totalPoints
        } else if (a.totalWin !== b.totalWin) {
          return b.totalWin - a.totalWin
        } else {
          return a.totalLose - b.totalLose
        }
      })

      this.setData({
        worldRank: sortedRanks
      })
      
      console.log(this.data.worldRank)
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
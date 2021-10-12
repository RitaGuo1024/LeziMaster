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
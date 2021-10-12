// pages/recordMatch/index.js
Page({

    /**
     * Page initial data
     */
    data: {
        games : [],
        envId: "",
        matchId: ""
    },

    bindKeyInput: function(e){
      this.setData({matchId: e.detail.value})
    },

    onStartMatch: function (options) {
      wx.cloud.callFunction({
        name: 'quickstartFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'getMatchForRecording',
          matchId: this.data.matchId
        }
      }).then((resp) => {
        console.log("response: ", resp)
        this.setData({
          games: resp.result.data
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
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
      this.setData({
        envId: options.envId
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

    }
})
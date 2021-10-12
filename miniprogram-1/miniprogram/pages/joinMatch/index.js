// pages/joinMatch/joinMatch.js
Page({

  /**
   * Page initial data
   */
  data: {
    createText: "输入比赛Id",
    matchId: ""
  },

  bindKeyInput: function(e){
    this.setData({matchId: e.detail.value})
  },

  /**
   * TODO: send the input match Id to server and load the game
   * @param {*} e 
   */
  sendMatchId: function(e){
    console.log(this.data.matchId)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
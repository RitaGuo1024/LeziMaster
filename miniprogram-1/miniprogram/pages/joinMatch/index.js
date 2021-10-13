// pages/joinMatch/joinMatch.js
Page({

  /**
   * Page initial data
   */
  data: {
    createText: "输入比赛Id",
    matchId: "",
    hc: "",
    location: "",
    date: "",
    participants: [],
    unionid: '',
    joined: Boolean,
    nickName: ''
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

    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      console.log(resp)
      this.setData({
        unionid: resp.result.openid
      })
   }).catch((e) => {
     console.log(e)
    })

    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'joinMatch',
        nickName: this.data.nickName,
        matchid: this.data.matchId
      }
    }).then((resp) => {
      console.log(resp)
      this.setData({
        date: resp.result.data.date,
        location: resp.result.data.location,
        hc: resp.result.data.headcount,
        participants: resp.result.data.participants,
        joined: true
      })
   }).catch((e) => {
     this.setData({
       joined: false
     })
     console.log(e)
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      nickName: options.nickName
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
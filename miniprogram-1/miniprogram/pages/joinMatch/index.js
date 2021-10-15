// pages/joinMatch/joinMatch.js
Page({

  /**
   * Page initial data
   */
  data: {
    createText: "输入比赛Id",
    matchId: '',
    joined: Boolean,
    nickName: '',
    respTxt: '',
    matches: [],
    focusId: ''
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
        type: 'joinMatch',
        nickName: this.data.nickName,
        matchid: this.data.matchId
      }
    }).then((resp) => {
      console.log(resp)
      this.setData({
        joined: true,
        respTxt: resp.result.data
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
    console.log("calling getMatches")

    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getMatches',
        nickName: this.data.nickName,
        finished: false
      }
    }).then((resp) => {
      console.log(resp)
      this.setData({
        matches: resp.result.data
      })
   }).catch((e) => {
     console.log(e)
    })
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.matches
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items: items,
      matchId: e.detail.value
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
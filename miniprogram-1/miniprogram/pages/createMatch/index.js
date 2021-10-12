// pages/createMatch/chooseMode.js
Page({

  /**
   * Page initial data
   */
  data: {
    hc: '',
    date: Date,
    duration: '',
    location: '',
    unionid: '',
    matchid: ''
  },

  headcount: function(e){
    this.setData({hc: e.detail.value})
  },

  date: function(e){
    this.setData({date: new Date(e.detail.value)})
  },

  location: function(e){
    this.setData({location: e.detail.value})
  },

  duration: function(e){
    this.setData({duration: e.detail.value})
  },

  creatingMatch: function(e) {
    console.log("start creating match");

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
        type: 'createMatch',
        hc: this.data.hc,
        date: this.data.date,
        duration: this.date.duration,
        location: this.data.location,
        unionid: this.data.unionid,
      }
    }).then((resp) => {
      console.log(resp)
      this.setData({
        matchid: resp.result.data
      })
   }).catch((e) => {
     console.log(e)
    })

    console.log(this.data.hc, this.data.date, this.data.duration, this.data.location, this.data.unionid, this.data.matchid);

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
        type: 'createMatch'
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

  }
})
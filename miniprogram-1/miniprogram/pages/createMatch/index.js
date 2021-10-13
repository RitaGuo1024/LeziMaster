// pages/createMatch/chooseMode.js
Page({

  /**
   * Page initial data
   */
  data: {
    unionid: '',
    matchid: '',
    nickName: '',
    formData: {

    },
  },

  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
},
  bindDateChange: function (e) {
    this.setData({
        date: e.detail.value,
        [`formData.date`]: e.detail.value
    })
},

  creatingMatch: function(e) {
    console.log("start creating match");
    console.log(this.data.formData)

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
        hc: this.data.formData.hc,
        date: this.data.formData.date,
        location: this.data.formData.location,
        nickName: this.data.nickName,
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
    console.log('createMatch on load')
    this.setData({
      nickName: options.nickName
    })
    console.log(this.data.nickName)
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
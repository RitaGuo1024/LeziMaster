// pages/recordMatch/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    games: [],
    envId: "",
    uniqueId: "",
    submitted: false
  },

  bindKeyInput: function (e) {
    this.setData({ uniqueId: e.detail.value.toString() })
  },

  onStartMatch: function (options) {
    console.log("matchId: ", this.data.uniqueId)
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getMatchForRecording',
        uniqueId: this.data.uniqueId.toString()
      }
    }).then((resp) => {
      console.log("response: ", resp)
      var selectedMatch = resp.result.data[0]
      console.log(selectedMatch)
      var generatedGames = generateGames(selectedMatch.participants, this.data.uniqueId)
      console.log("generated games:", generatedGames)
      this.setData({
        games: generatedGames
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

  sendMatchResult: function (options) {
    if (!this.data.submitted)
    {
      wx.cloud.callFunction({
        name: 'quickstartFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'submitMatchResult',
          games: this.data.games,
          uniqueId: this.data.uniqueId
        }
      }).then((resp) => {
        console.log("sendMatchResult response: ", resp)
        this.setData({
          submitted: true
        })
      }).catch((e) => {
        this.setData({
          showUploadTip: true
        })
        console.log("sendMatchResult exception-", e)
        wx.hideLoading()
      })
    }
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

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function generateGames(array, uniqueId) {
  var result = []
  if (array.length === 5) {
    var a = shuffle(array)
    console.log("shuffled array", a)
    result = [
      {
        "left1": a[0],
        "left2": a[1],
        "leftScore": 0,
        "right1": a[2],
        "right2": a[3],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 1
      }, {
        "left1": a[2],
        "left2": a[4],
        "leftScore": 0,
        "right1": a[1],
        "right2": a[3],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 2
      }, {
        "left1": a[1],
        "left2": a[4],
        "leftScore": 0,
        "right1": a[0],
        "right2": a[3],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 3
      }, {
        "left1": a[1],
        "left2": a[2],
        "leftScore": 0,
        "right1": a[0],
        "right2": a[4],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 4
      }, {
        "left1": a[0],
        "left2": a[2],
        "leftScore": 0,
        "right1": a[3],
        "right2": a[4],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 5
      }]
    console.log("Generated games: ", result)
  } else if (array.length === 4) {
    var a = shuffle(array)
    console.log("shuffled array", a)
    result = [
      {
        "left1": a[0],
        "left2": a[1],
        "leftScore": 0,
        "right1": a[2],
        "right2": a[3],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 1
      }, {
        "left1": a[1],
        "left2": a[2],
        "leftScore": 0,
        "right1": a[0],
        "right2": a[3],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 2
      }, {
        "left1": a[1],
        "left2": a[3],
        "leftScore": 0,
        "right1": a[0],
        "right2": a[2],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 3
      }]
    console.log("Generated games: ", result)
  }
  return result
}
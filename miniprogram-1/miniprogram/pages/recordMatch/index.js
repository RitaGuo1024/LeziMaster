// pages/recordMatch/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    games: [],
    envId: "",
    uniqueId: "",
    submitted: false,
    inputValue: '',
    focusId: '',
    matches: [],
    isSubmitHidden: true
  },

  bindLeftScoreFocus: function (event) {
    let id = event.currentTarget.dataset.id
    console.log("trigger focus, the id: ", id)
    this.setData({
      focusId: id
    })
  },
 
  bindLeftScoreKeyInput: function (event) {
    let value = Number(event.detail.value)
    let id = event.currentTarget.dataset.id
  
    var up = 'games[' + id + '].leftScore';
    this.setData({
      [up]:value 
    })
 
    console.log(this.data.focusId)
    console.log(this.data.games)
  },

  bindRightScoreFocus: function (event) {
    let id = event.currentTarget.dataset.id
    console.log("trigger focus, the id: ", id)
    this.setData({
      focusId: id
    })
  },
 
  bindRightScoreKeyInput: function (event) {
    let value = Number(event.detail.value)
    let id = event.currentTarget.dataset.id
  
    var up = 'games[' + id + '].rightScore';
    this.setData({
      [up]:value 
    })
 
    console.log(this.data.focusId)
    console.log(this.data.games)
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
      if (selectedMatch.finished) {
        wx.cloud.callFunction({
          name: 'quickstartFunctions',
          config: {
            env: this.data.envId
          },
          data: {
            type: 'getMyGamesByMatchId',
            uniqueId: this.data.uniqueId.toString()
          }
        }).then((resp) => {
          var finishedGames = resp.result.data[0]
          console.log("finsihed games:", finishedGames)
          this.setData({
            games: finishedGames.games,
            isSubmitHidden: true,
            submitted: true
          })})
      } else {
        var generatedGames = generateGames(selectedMatch.participants, this.data.uniqueId)
        console.log("generated games:", generatedGames)
        this.setData({
          games: generatedGames,
          isSubmitHidden: false,
          submitted: false
        })
      }
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
      uniqueId: e.detail.value
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      envId: options.envId,
      nickName: options.nickName
    })

    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getPreparedMatches',
        nickName: this.data.nickName
      }
    }).then((resp) => {
      var matches = resp.result.data
      console.log("To be start nickName",  this.data.nickName)
      console.log("To be start matches", matches)
      this.setData({
        matches: matches
      })
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
  } else if (array.length === 3) {
    var a = shuffle(array)
    console.log("shuffled array", a)
    result = [
      {
        "left1": a[0],
        "leftScore": 0,
        "right1": a[1],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 1
      }, {
        "left1": a[0],
        "leftScore": 0,
        "right1": a[2],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 2
      }, {
        "left1": a[1],
        "leftScore": 0,
        "right1": a[2],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 3
      }]
    console.log("Generated games: ", result)
  } else if (array.length === 2) {
    var a = shuffle(array)
    console.log("shuffled array", a)
    result = [
      {
        "left1": a[0],
        "leftScore": 0,
        "right1": a[1],
        "rightScore": 0,
        "uniqueId": uniqueId,
        "number": 1
      }]
    console.log("Generated games: ", result)
  }
  return result
}
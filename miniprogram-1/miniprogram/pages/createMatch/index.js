// pages/createMatch/chooseMode.js
Page({

  /**
   * Page initial data
   */
  data: {
    hc: "0",
    date: '',
    location: ''
  },

  headcount: function(e){
    this.setData({hc: e.detail.value})
  },

  date: function(e){
    this.setData({date: e.detail.value})
  },

  location: function(e){
    this.setData({location: e.detail.value})
  },

  creatingMatch: function(e) {
    console.log("start creating match");
    console.log(this.data.hc, this.data.date, this.data.location);
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
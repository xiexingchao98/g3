const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: [],
    isShowReleasenNewPostPanel: false,
    unreadMessageCount: 0,
    unreadMessageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.connectSocket()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
      })
    }
    this.getIndexPost()
    let unreadMessageList = wx.getStorageSync('unreadMessageList')
    if (!unreadMessageList)
      unreadMessageList = []
    this.setData({ unreadMessageList: unreadMessageList })
    let unreadMessageCount = this.countUnreadMessage(unreadMessageList)
    this.setData({ unreadMessageCount: unreadMessageCount })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({ title: '刷新中' })
    this.getIndexPost(function () { wx.hideLoading(); wx.showToast({ title: '刷新成功' })})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getIndexPost(callback) {
    wx.request({
      method: 'GET',
      url: app.globalData.serverPath + '/database/post',
      success: (res) => {
        this.setData({ postList: res.data })
        if (callback && typeof callback == 'function')
          callback()
      }
    })
  },
  showReleaseNewPostPanel() {
    app.doAfterCheckLogin(() => {wx.navigateTo({ url: '/pages/community/edit-post' })})
  },
  hideReleaseNewPostPanel() {
    wx.navigateBack({
      delta: 1
    })
  },
  connectSocket() {
    wx.connectSocket({
      url: app.globalData.socketServerPath,
      success: () => {
        wx.onSocketOpen((() => {
          console.log('成功连接到 websocket ~')
          setInterval(() => {
            let data = {
              event: 'readMessage',
              data: {
                storage: wx.getStorageSync(app.globalData.storageKey)
              }
            }
            wx.sendSocketMessage({
              data: JSON.stringify(data),
              fail: (err) => {
                console.log(err)
              }
            })
          },10000)
          wx.onSocketMessage((res) => {
            console.log(res)
            let data = JSON.parse(res.data)
            if (data.event == 'readMessage' && data.data != 0) {
              let unreadMessageList = this.data.unreadMessageList
              console.log(data.data)
              unreadMessageList = unreadMessageList.concat(data.data)
              console.log(unreadMessageList)
              this.setData({
                unreadMessageList: unreadMessageList,
                unreadMessageCount: this.data.unreadMessageCount + data.data.length
              })
              wx.setStorage({
                key: 'unreadMessageList',
                data: unreadMessageList
              })
            }
          })
        }))
      }
    })
  },
  getUnreadMessageCount() {
    let messageList = this.data.unreadMessageList
    let ret = 0
    for (let message in messageList) {
      if (message.unread == true) {
        ++ret
      }
    }
    console.log('unread count: ', ret)
    return ret
  },
  countUnreadMessage(messageList) {
    let ret = 0
    for (let index in messageList) {
      if (messageList[index].unread == true) {
        ++ret
      }
    }
    console.log('unread count: ', ret)
    return ret
  }  
})
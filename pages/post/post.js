const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_id: null,
    post: {},
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ post_id: options.id })
    wx.request({
      method: 'GET',
      url: app.globalData.serverPath + '/database/post/viewDetail?id=' + this.data.post_id,
      success: (res) => {
        this.setData({ post: res.data })
      }
    })
    this.getComment()
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
  doComment(e) {
    wx.request({
      method: 'POST',
      url: app.globalData.serverPath + '/database/post/doComment',
      data: {
        storage: wx.getStorageSync(app.globalData.storageKey),
        data: {
          post_id: this.data.post.post_id,
          comment_content: e.detail.value.comment_content
        }
      },
      success: (res) => {
        wx.showToast({ title: res.data.errmsg })
        let comment_id = res.data.data.comment_id
        wx.connectSocket({
          url: app.globalData.socketServerPath,
          success: () => {
            let data = {
              event: 'sendMessage',
              data: {
                storage: wx.getStorageSync(app.globalData.storageKey),
                message: {
                  comment_id: comment_id,
                  post_id: this.data.post_id,
                  unread: true
                }
              }
            }
            console.log('websocket data 待发送 => ', data)
            wx.sendSocketMessage({
              data: JSON.stringify(data),
              success: () => {
                wx.closeSocket()
              },
              fail: (err) => {
                console.log(err)
              }
            })
    
          }
        })
        this.getComment()
      }
    })
  },
  getComment() {
    wx.request({
      method: 'GET',
      url: app.globalData.serverPath + '/database/post/viewComment?id=' + this.data.post_id,
      success: (res) => {
        this.setData({ commentList: res.data })
      } 
    })
  }
})
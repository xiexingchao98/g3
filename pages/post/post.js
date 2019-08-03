const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_id: null,
    post: {},
    commentList: [],
    comment_content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取 url 中的 id
    this.setData({ post_id: options.id })
    // 获取帖子数据
    wx.request({
      method: 'GET',
      url: app.globalData.serverPath + '/database/post/viewDetail?id=' + this.data.post_id,
      success: (res) => {
        this.setData({ post: res.data })
        // 获取帖子评论数据
        this.getComment()
      }
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({ title: '刷新中' })
    this.getComment(function () {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      wx.showToast({ title: '刷新成功' })
    })
  },
  // 评论事件
  doComment(e) {
    wx.request({
      method: 'POST',
      url: app.globalData.serverPath + '/database/post/doComment',
      data: {
        // 用户身份验证信息
        storage: wx.getStorageSync(app.globalData.storageKey),
        // 评论数据
        data: {
          post_id: this.data.post.post_id,
          comment_content: e.detail.value.comment_content
        }
      },
      success: (res) => {
        this.setData({ comment_content: '' })
        // 反馈操作结果
        wx.showToast({ title: res.data.errmsg })
        // 准备待发送的 websocket 数据
        let data = {
          event: 'sendMessage',
          data: {
            // 用户身份验证信息
            storage: wx.getStorageSync(app.globalData.storageKey),
            // 通知消息详情
            message: {
              post_id: this.data.post_id,
              unread: true
            }
          }
        }
        let socketTask = wx.connectSocket({ url: app.globalData.socketServerPath })
        // SocketTask 成功连接后再发送数据
        socketTask.onOpen(() => {
          socketTask.send({
            data: JSON.stringify(data),
            success: () => { console.log('send message success') },
            fail: (err) => { console.log(err) }
          })
        })
        // 刷新评论数据
        this.getComment()
      }
    })
  },
  getComment(callback) {
    wx.request({
      method: 'GET',
      url: app.globalData.serverPath + '/database/post/viewComment?id=' + this.data.post_id,
      success: (res) => {
        this.setData({ commentList: res.data })
        if (callback && typeof callback == 'function')
          callback()
      } 
    })
  }
})
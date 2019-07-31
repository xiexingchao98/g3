// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSocketReady: false,
    collection: [],
    intervalId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openSocket()
    wx.onSocketOpen(() => {
      this.setData({
        isSocketReady: true
      })
    })
    wx.onSocketMessage((res) => {
      let data = JSON.parse(res.data)
      if (data.event == 'collect') {
        this.setData({
          collection: this.data.collection.concat(data.data)
        })
      }
      console.log(data)
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
  doCollect: function () {
    let intervalId = setInterval(() => {
      let data = {
        event: 'collect',
        data: {
          user: {
            openid: 'o0RrU5KzmQfD3fbZvpsxiG8HbEB0'
          }
        }
      }
      this.sendSocketMessage(data)
    }, 2000)

    this.setData({ intervalId: intervalId })
  },
  cancelCollect: function () {
    clearInterval(this.data.intervalId)
  },
  doScan: function () {
    let data = {
      event: 'upload',
      data: {
        qrcodeContent: 'g3project',
        user: {
          openid: 'o0RrU5KzmQfD3fbZvpsxiG8HbEB0'
        }
      }
    }
    this.sendSocketMessage(data)
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res.result)
 
    //   }
    // })
  },
  sendSocketMessage(data) {
    if (this.data.isSocketReady) {
      wx.sendSocketMessage({
        data: JSON.stringify(data),
        fail: (err) => {
          console.log(err)
          wx.showToast({ title: '操作失败，请重试或者重新连接' })
        } 
      })
    }
  },
  openSocket() {
    wx.connectSocket({
      url: 'ws://localhost:8360/ws',
      success: () => {
        console.log('成功连接到websocket')     
      }
    })
  }
})
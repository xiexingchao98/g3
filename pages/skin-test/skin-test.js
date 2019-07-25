// pages/skin-test/skin-test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    status: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let cameraContext = wx.createCameraContext()
    let that = this
    // setInterval(function() {
    //   cameraContext.takePhoto({
    //     quality: 'normal',
    //     success: function (res) {
    //       that.setData({
    //         src: res.tempImagePath
    //       })
    //       wx.compressImage({
    //         src: res.tempImagePath,
    //         success: (res) => {
    //           wx.uploadFile({
    //             url: 'http://www.whatdoyoudo.club:8360/user/upload',
    //             filePath: res.tempFilePath,
    //             name: 'image',
    //             success: (res) => {
    //               that.setData({ status: 'success' })
    //               console.log(res.data)
    //             },
    //             fail: () => {
    //               that.setData({ status: 'fail' })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   })
    // }, 1000)
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

  }
})
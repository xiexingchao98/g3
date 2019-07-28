const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  takePhoto () {
    wx.showLoading({ title: '上传中' })
    let cameraContext = wx.createCameraContext()
    let that = this
    cameraContext.takePhoto({
      quality: 'normal',
      success: function (takePhotoRes) {
        wx.compressImage({
          src: takePhotoRes.tempImagePath,
          success: (compressRes) => {
            wx.uploadFile({
              url: app.globalData.serverPath + '/skintest/user/upload',
              filePath: compressRes.tempFilePath,
              name: 'image',
              success: (uploadRes) => {
                console.log(uploadRes)
                wx.setStorageSync('testResult',JSON.parse(uploadRes.data))
                that.setData({ status: 'success' })
                wx.navigateTo({
                  url: '/pages/test-result/test-result'
                });
                wx.showToast({ title: '上传成功' })
              },
              fail: () => {
                that.setData({ status: 'fail' })
                wx.showToast({ title: '上传失败', icon: 'none'})
              }
            })
            setTimeout(() => {wx.showToast({ title: '上传失败' })}, 25000)
          }
        })
      },
    })    
  }
})
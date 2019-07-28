const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanPhotoPath:''
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
    // wx.startDeviceMotionListening({ 'interval': 'normal' })
    // wx.onDeviceMotionChange(res => {
    //   if ((res.beta > -70 || res.beta < -110) && (res.gamma < 10 || res.gamma > -10)) {
    //     wx.showToast({
    //       title: '手机倾斜，请放正',
    //       icon: 'none',
    //       duration: 100
    //     })
    //   }
    //   else if ((res.beta<-70 && res.beta>-110) && (res.gamma>-10 && res.gamma<10))
    //   {
    //     wx.showToast({
    //       title: '手机方向正确',
    //       icon:'none',
    //       duration: 100
    //     })
    //   }
    // })
    setInterval(this.scanPhoto,5000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { 
    wx.stopDeviceMotionListening();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopDeviceMotionListening();
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
  },
  scanPhoto: function (){
    const cam=wx.createCameraContext();
    cam.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData(
          {
            scanPhotoPath: res.tempImagePath
          }
        );
        wx.uploadFile({
          url: 'https://www.whatdoyoudo.club/api/skintest/faceplusplus/upload', //仅为示例，非真实的接口地址
          filePath: this.data.scanPhotoPath,
          name: 'image',
          formData: {
          },
          success(res) {
            const data = res.data
            const ret=JSON.parse(data)
            var dis =""
            console.log(ret[0].distance)
            if (ret[0].distance==-1){
              dis="太近了"
            }
            else if(ret[0].distance==0){
              dis="距离合适"
            }
            else {
              dis="太远了"
            }
            wx.showToast({
              title: dis,
              icon:'none',
              duration:2000
            })
            console.log(ret[1].angle)
          }
        })
      }
    })
  }

})
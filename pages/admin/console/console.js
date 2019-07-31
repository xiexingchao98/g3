const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    realdata: {},
    errMsg: ''
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
    this.getRealTimeData()
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
  getRealTimeData() {
    wx.request({
      method: 'GET',
      url: app.globalData.serverPath + '/database/factory/realdata',
      success: (res) => {
        let timestamp = Date.parse(res.data.timestamp)
        // 刷新间隔5分钟
        let offset = Date.now() - timestamp 
        console.log(offset)
        if (offset <= 5*60*1000) {
          for (let key in res.data) {
            if (res.data[key] == null || res.data[key] == 'null') {
              this.setData({ err: true, errMsg: '警告，工厂数据更新异常~'})
            }
          }
          this.setData({ realdata: res.data })
        }
        else {
          this.setData({ err: true, errMsg: '警告，工厂数据更新异常~'})
        }
      }
    })
  }
})
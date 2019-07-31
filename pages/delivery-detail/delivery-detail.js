// pages/delivery-detail/delivery-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    steps: [
      {
        timestamp: {
          date: '2019/7/29',
          time: '10:42'
        },
        title: '运输中',
        detail: '到达转运中心'
      },
      {

        timestamp: {
          date: '2019/7/28',
          time: '13:00'
        },
        title: '运输中',
        detail: '到达便利店'
      },
      {
        timestamp: {
          date: '2019/7/26',
          time: '10:01'
        },
        title: '已接单',
        detail: '某某地某某快递点已受理'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.setData({ active: that.data.steps.length - 1 })
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

  }
})
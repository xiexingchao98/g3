const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    ads: ["/ads/1.jpeg","/ads/2.jpeg"],
    choose_item:[
      [
        { icon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563857794802&di=e06b676daf97aaca6c1d26a1069e0a5e&imgtype=0&src=http%3A%2F%2Fpic.makepolo.net%2Fnews%2Fallimg%2F20170104%2F1483528275169771.jpg ",text:"夏日清凉" },
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563857794802&di=e06b676daf97aaca6c1d26a1069e0a5e&imgtype=0&src=http%3A%2F%2Fpic.makepolo.net%2Fnews%2Fallimg%2F20170104%2F1483528275169771.jpg ", text: "夏日清凉" },
      { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563857794802&di=e06b676daf97aaca6c1d26a1069e0a5e&imgtype=0&src=http%3A%2F%2Fpic.makepolo.net%2Fnews%2Fallimg%2F20170104%2F1483528275169771.jpg ", text: "夏日清凉" },
        { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563857794802&di=e06b676daf97aaca6c1d26a1069e0a5e&imgtype=0&src=http%3A%2F%2Fpic.makepolo.net%2Fnews%2Fallimg%2F20170104%2F1483528275169771.jpg ", text: "夏日清凉" },
        { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563857794802&di=e06b676daf97aaca6c1d26a1069e0a5e&imgtype=0&src=http%3A%2F%2Fpic.makepolo.net%2Fnews%2Fallimg%2F20170104%2F1483528275169771.jpg ", text: "夏日清凉" }
      ],
      [
        { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563857794802&di=e06b676daf97aaca6c1d26a1069e0a5e&imgtype=0&src=http%3A%2F%2Fpic.makepolo.net%2Fnews%2Fallimg%2F20170104%2F1483528275169771.jpg ", text: "夏日清凉" },
        { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563857794802&di=e06b676daf97aaca6c1d26a1069e0a5e&imgtype=0&src=http%3A%2F%2Fpic.makepolo.net%2Fnews%2Fallimg%2F20170104%2F1483528275169771.jpg ", text: "夏日清凉" },
        { icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563857794802&di=e06b676daf97aaca6c1d26a1069e0a5e&imgtype=0&src=http%3A%2F%2Fpic.makepolo.net%2Fnews%2Fallimg%2F20170104%2F1483528275169771.jpg ", text: "夏日清凉" }
      ]
    ],
    categoryList: []
  },
  onChange(event) {
    this.setData({
      active:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory()
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
  getCategory() {
    wx.request({
      method: 'GET',
      url: app.globalData.serverPath + '/database/category',
      success: (res) => {
        this.setData({ categoryList: res.data })
      }
    })
  }
})
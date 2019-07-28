const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImages: [
      'https://img30.360buyimg.com/sku/jfs/t1/24989/31/5554/338706/5c3ff4ecE401b316e/c2987c542d73749d.jpg',
      'https://img30.360buyimg.com/sku/jfs/t1/73186/27/2536/411306/5d0c7c67E25c47144/4bf22213d5e12e25.jpg',
      'https://img30.360buyimg.com/sku/jfs/t1/31375/11/701/275009/5c3ff4ebE452f751a/cc8dc0639729b5c1.jpg',
      'https://img30.360buyimg.com/sku/jfs/t1/25254/10/5589/271886/5c3ff4ecE9f3e4a9b/e370f0d2a1d1c14b.jpg'
    ],
    name: '欧莱雅（LOREAL）清润葡萄籽补水护肤化妆品',
    price: 199.9,
    detail: '商品细节描述',
    introduction: '欧莱雅（LOREAL）清润葡萄籽补水护肤化妆品套装礼盒(膜力水130ml+乳液110ml+乳液50ml+膜力水65ml)',
    ingredient: '暂无信息'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getCommodity(options.id) 
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
  doBuy: () => {
    wx.navigateTo({ url: '/pages/pay/pay' })
  },
  doAddToCart: () => {
    // 业务逻辑代码
    wx.showToast({ title: '加入购物车成功', icon: 'success' })
  },
  getCommodity(commodity_id) {
    wx.request({
      method: 'GET',
      url: app.globalData.serverPath + '/database/commodity/detail?id=' + commodity_id,
      success: (res) => {
        this.setData({ commodity: res.data })
      }
    })
  }
})
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [{name: '热门', background: ''}, {name: '新品', background: ''}],
    swiperImages: ['http://img.zcool.cn/community/010257585bf19ea801219c77880daf.jpg@1280w_1l_2o_100sh.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563812682360&di=f3119561250c5f17781e3650d32a58a6&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheji%2F20160325%2Ftaobaotianmaohufupinhuazhuangpinhaibaoguanggao_6053996.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563812682361&di=193dff98488bc60cd28ebf62184fb223&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1409%2F02%2Fc2%2F38151288_1409622293587_mthumb.jpg'],
    // menuItems: [{text: '测肤', icon: 'camera', url: '/pages/skin-test/skin-test'}, {text: '趋势', icon: 'trending_up', color: '#009acd'}, {text: '品牌', icon: 'business', color: null}, {text: '定制', icon: 'build', color: null}],
    menuItems: [{text: '测肤', icon: 'camera', url: '/pages/skin-test/skin-test'}],
    // commodityList: [{name: '测试商品【1】', price: 99.9, cover: 'http://image2.suning.cn/uimg/b2c/newcatentries/0070153884-000000000623667571_3_800x800.jpg'},{name: '测试商品【1】', price: 99.9, cover: 'http://image2.suning.cn/uimg/b2c/newcatentries/0070153884-000000000623667571_3_800x800.jpg'},{name: '测试商品【1】', price: 99.9, cover: 'http://image2.suning.cn/uimg/b2c/newcatentries/0070153884-000000000623667571_3_800x800.jpg'},{name: '测试商品【1】', price: 99.9, cover: 'http://image2.suning.cn/uimg/b2c/newcatentries/0070153884-000000000623667571_3_800x800.jpg'},{name: '测试商品【1】', price: 99.9, cover: 'http://image2.suning.cn/uimg/b2c/newcatentries/0070153884-000000000623667571_3_800x800.jpg'}]
    commodityList: [],
    safePaddingBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('safePaddingBottom', app.globalData.safePaddingBottom)
    this.setData({ safePaddingBottom: app.globalData.safePaddingBottom })
    this.getRecommendCommodity()
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
        active: 0
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
  getRecommendCommodity() {
    let that = this
    wx.request({
      mehtod: 'GET',
      url: app.globalData.serverPath + '/database/recommend',
      success: (res) => {
        that.setData({
          commodityList: res.data
        })        
      }
    })
  }
})
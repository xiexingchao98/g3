const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    wordMapping: {
      wrinkle: '皱纹', glabella: '眉间纹', crowfeet: '鱼尾纹', nasolabial: '法令纹', eyecorner: '眼角纹', forehead: '抬头纹',
        none: '无', lightly: '轻微', moderately: '中度', serve: '严重', 
      moisture: '水分', good: '充足', normal: '良好', bad: '缺失',
      color: '肤色', toubai: '透白', baixi: '白皙', ziran: '自然', xiaomai: '小麦', ancchen: '暗沉', youhei: '黝黑'
    },
    testResult: [],
    active: 0,
    categoryList: [],
    commodityList: {},
    tags: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ testResult: wx.getStorageSync('testResult') })
    this.genTags(this.data.testResult)
    this.getCategoryList()
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
  getCategoryList() {
    let that = this
    wx.request({
      method: 'GET',
      url: app.globalData.serverPath + 'category',
      success: (res) => {
        this.setData({ categoryList: res.data })
        that.getAllCommodity()
      }
    })
  },
  getRecommendCommodity() {
    wx.request({
      method: 'GET',
      url: app.serverPath + 'commodity/personal'
    })
  },
  genTags(testResult) {
    let tags = ''
    for (let i = 0; i < testResult.length; ++i) {
      let detail = testResult[i].detail
      if (Array.isArray(detail)) {
        for (let j = 0; j < detail.length; ++j) {
          if (detail[j].solution)
            tags += detail[j].solution + ','
        }
      }
      else if (detail.solution)
        tags += detail.solution + ','
    }
    tags = tags.substring(0, tags.length - 1)
    this.setData( {tags: tags })
  },
  getAllCommodity() {
    let that = this
    let tags = this.data.tags
    for (let i = 0; i < this.data.categoryList.length; ++i) {
      wx.request({
        method: 'POST',
        url: app.globalData.serverPath + 'recommend/personal',
        data: {
          category_id: this.data.categoryList[i].category_id,
          tags: tags
        },
        success: (res) => {
          that.setData({ ["commodityList["+ this.data.categoryList[i].category_id + "]"]: res.data })
        }
      })
    }
  }
})
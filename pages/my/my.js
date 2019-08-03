const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    usr_headphoto:'/icon/head/1.jpeg',
    usr:{name:'HelloWorld',recordnum: 110, follownum: 230,collection: 150},
    second_block_bottom_item:[
      {
        icon: 'payment',
        text:'待支付'
      },
      {
        icon: 'local_shipping',
        text: '待发货'
      },
      {
        icon: 'comment',
        text: '评价'
      },
      {
        image:'/resources/icon/service_after_sale.png',
        text:'退款/售后'
      }
    ],
    // {name: '设置', icon: 'settings'}, {name: '反馈', icon: 'feedback'},{name: '帮助', icon: 'help'}, 
    appOption: [{name:'清除缓存', icon: 'delete_forever', event: 'clearStorage'}],
    userInfo: {},
    following: 8,
    follower: '12.8K',
    isLogged: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.checkSession({
      success: () => {
        let storage = wx.getStorageSync(app.globalData.storageKey)
        if (storage) {
          console.log('check session success')
          this.getUserInfo()
        }
      },
      fail: () => {
        console.log('check session fail')
      }
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2
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
  doLogin (e) {
    console.log(e)
    if (e.detail.userInfo) {
      wx.showLoading({ title: '登录中' })
      wx.login({
        success: (res) => {
          console.log(res.code)
          wx.request({
            method: 'POST',
            url: app.globalData.serverPath + '/database/oauth/login/weixin',
            data: {
              code: res.code,
              userInfo: e.detail.userInfo
            },
            success: (res) => {
              console.log(res)
              this.getUserInfo()

              wx.setStorage({
                key: app.globalData.storageKey,
                data: res.data.data
              })

              wx.showToast({ title: '登录成功' })
            }
          })
        }
      })
    }
    else {
      wx.showToast({ title: '授权失败', icon: 'none' })
    }
  },
  getUserInfo() {
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          isLogged: true,
          userInfo: res.userInfo
        })
      }
    })
  },
  clearStorage() {
    wx.clearStorage({
      success() {
        wx.showToast({ title: '清除缓存成功' })
      }
    })
  }
})
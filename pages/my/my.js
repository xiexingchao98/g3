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
    appOption: [{name: '设置', icon: 'settings'}, {name: '反馈', icon: 'feedback'},{name: '帮助', icon: 'help'}],
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
        console.log('check session success')
        this.getUserInfo()
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
        active: 3
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
    if (e.detail.userInfo) {
      wx.login({
        success: (res) => {
          console.log(res.code)
          wx.request({
            method: 'POST',
            url: app.globalData.serverPath + '/database/oauth/login/weixin',
            data: {
              code: res.code
            },
            success: (res) => {
              console.log(res)
              this.getUserInfo()
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
  }
})
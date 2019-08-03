//app.js
App({
  globalData: {
    userInfo: null,
    // serverPath: 'http://120.78.163.56/'
    // serverPath: 'http://127.0.0.1:8360/api',
    // socketServerPath: 'ws://localhost:8360/api/database/ws',
    storageKey: 'g3',
    socketServerPath: 'wss://whatdoyoudo.club/api/database/ws',
    serverPath: 'https://whatdoyoudo.club/api',
    safePaddingBottom: 0
  }, 
  onLaunch: function () {
    let that = this
    wx.getSystemInfo({
      success (res) {
        console.log(res)
        that.globalData.safePaddingBottom = res.screenHeight - res.safeArea.bottom
      }
    })
    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  doAfterCheckLogin(success, fail) {
    let storage = wx.getStorageSync(this.globalData.storageKey)
    if (!storage) {
      if (fail && typeof fail == 'function')
        fail()
      else
        wx.showToast({ title: '请先登录', icon: 'none' })
    }
    else if (success && typeof success == 'function') {
      success()
    }
  }
})
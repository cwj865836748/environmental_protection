//app.js
import {
  getSystemInfo
} from './utils/wx.js'

App({
  globalData: {
    qqKey: 'ZBRBZ-E4WC2-HA3UF-CMQPB-QKR6E-5OFVJ'
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //获取导航栏数据
    this.getNavBar()
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },
  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },
  getNavBar() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect(); //获取胶囊按钮信息
    getSystemInfo().then(res => {
      let statusBarHeight = res.statusBarHeight //状态栏高度
      let navHeight = 0
      //机型适配 如果获取不到胶囊按钮信息手动赋值
      if (menuButtonObject) {
        let navTop = menuButtonObject.top //胶囊按钮与最顶部的距离
        navHeight = statusBarHeight + menuButtonObject.height + (navTop - statusBarHeight) * 2 //导航高度
      } else {
        navHeight = (res.system.indexOf('iOS') > -1 ? 44 : 48) + statusBarHeight
      }
      let navBar = {
        navHeight,
        statusBarHeight
      }
      this.globalData.navBar = navBar
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(navBar)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 请求
  request: function (object) {
    var that = this;
    if (!object.data)
      object.data = {};
    // var token = wx.getStorageSync('token');
    var token = 1111
    // this.showLoading('加载中')

    wx.request({
      url: object.url,
      header: object.header || {
        'content-type': 'application/x-www-form-urlencoded',
        'token': token
      },
      data: object.data || {},
      method: object.method || "GET",
      dataType: object.dataType || "json",
      success: function (res) {
        if (res.data.code == 401) {
          wx.clearStorageSync();
          wx.showModal({
            title: '提示',
            content: '请先登录获取权限',
            showCancel: true,
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/authorization/authorization',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          if (object.success)
            object.success(res.data);
        }
      },
      fail: function (res) {
        var app = getApp();
        if (app.is_on_launch) {
          app.is_on_launch = false;
          wx.showModal({
            title: "网络请求出错",
            content: res.errMsg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                if (object.fail)
                  object.fail(res);
              }
            }
          });
        } else {
          wx.showToast({
            title: res.errMsg,
            image: "/images/icon-warning.png",
          });
          if (object.fail)
            object.fail(res);
        }
      },
      complete: function (res) {
        // that.hideLoading();
        if (object.complete)
          object.complete(res);
      }
    });
  },

})
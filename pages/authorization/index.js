// pages/authorization/index.js
const App = getApp();
import {
  navigateTo
} from '../../utils/wx.js';
import {request} from '../../request/index.js';
const api = require('../../request/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: null,
    statusBarHeight: null,
    status: '',
    weChat: '',
    token: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (App.globalData.navBar) {
      this.setData({
        navHeight: App.globalData.navBar.navHeight,
        statusBarHeight: App.globalData.navBar.statusBarHeight
      })
    } else {
      App.userInfoReadyCallback = res => {
        this.setData({
          navHeight: App.globalData.navBar.navHeight,
          statusBarHeight: App.globalData.navBar.statusBarHeight
        })
      }
    }
  },
  authorLogin: function (e) {
    let _this = this;
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({
      title: "正在授权",
      mask: true
    });

    // 执行微信登录
    wx.login({
      success: function (res) {
        // 发送用户信息
        var code = res.code;
        wx.getUserInfo({
          success(res) {
            wx.request({
              url: api.login.login,
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              data: {
                code: code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              method: "post",
              success: function (res) {
                console.log(res)
                wx.hideLoading();
                if (res.data.code == 200) {
                  wx.setStorageSync('token', res.data.data.token);
                  _this.setData({
                    weChat: res.data.data.sessionKey,
                    token: res.data.data.token
                  })
                  // wx.setStorageSync('userInfo', JSON.stringify(res.data.result))
                  // _this.navigateBack();
                  _this.setData({
                    status: !_this.data.status,
                  })
                } else if (res.data.code == 1009) {
                  wx.showToast({
                    title: '您暂无权限，请联系客服',
                    icon: "none"
                  })
                } else {
                  wx.showToast({
                    title: res.desc,
                    icon: "none"
                  })
                }

              },
              fail: function (err) {
                wx.showToast({
                  title: res.desc,
                  icon: "none"
                })
                // console.log(err);
                wx.hideLoading();
              }
            })
          }
        })

      }
    });
  },

  getPhoneNumber: function (e) {
    var _this = this;
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;
    wx.showLoading({
      title: "正在获取",
      mask: true
    });

    wx.login({
      success(res) {
        if (res.code) {
          app.request({
            url: api.login.userPhone,
            method: "post",
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'token': _this.data.token
            },
            data: {
              code: res.code,
              iv: iv,
              encryptedData: encryptedData,
              sessionKey: _this.data.weChat
              // id: JSON.parse(wx.getStorageSync('userInfo')).id
            },
            success: function (res) {
              wx.hideLoading();

              if (res.code == 200) {
                wx.setStorageSync('userPhone', res.data)
                _this.navigateBack();
              }

            },
            fail: function () {
              wx.hideLoading();
            }

          })
        } else {
          console.log('获取失败！' + res.errMsg)
        }
      }
    })

  },
  /**
   * 授权成功 跳转回原页面
   */
  navigateBack: function () {
    wx.navigateBack();
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
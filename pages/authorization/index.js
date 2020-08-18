// pages/authorization/index.js
const App = getApp();
import {
  request
} from '../../request/index.js';
const api = require('../../request/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    status: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.status) {
      that.setData({
        status: options.status
      })
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
      success: function (login) {
        const code = login.code;

        wx.getUserInfo({
          success(res) {

            const {
              encryptedData,
              iv
            } = res
            request({
              url: api.login.login,
              data: {
                code,
                encrypted_data: encryptedData,
                iv
              }
            }).then(auth => {
              wx.hideLoading();
              if (auth.code == 200) {
                wx.setStorageSync('token', auth.data.token);
                _this.setData({
                  status: !_this.data.status,
                })
              } else {
                wx.showToast({
                  title: auth.desc,
                  icon: "none"
                })
              }
            })
          }
        })

      }
    });
  },
  getPhoneNumber: function (e) {
    const {
      iv,
      encryptedData
    } = e.detail
    console.log(e)
    wx.showLoading({
      title: "正在获取",
      mask: true
    });
    wx.login({
      success(res) {
        if (res.code) {
          request({
            url: api.login.userPhone,
            data: {
              code: res.code,
              iv,
              encrypted_data: encryptedData
            }
          }).then(res => {
            wx.hideLoading();
            if (res.code == 200) {
              wx.setStorageSync('userPhone', res.data)
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          console.log('获取失败！' + res.errMsg)
        }
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
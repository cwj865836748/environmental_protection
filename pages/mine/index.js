// pages/mine/index.js
const App = getApp();
import {
  navigateTo
} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: null,
    statusBarHeight: null,
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
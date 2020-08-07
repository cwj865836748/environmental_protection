// pages/activity/index.js
const App=getApp()
var utils = require('../../utils/util.js')
import {navigateTo} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    // swiperList: ['https://img02.mockplus.cn/idoc/xd/2020-07-30/ee08ebed-440f-4000-80cb-6271c5ed238e.png','https://img02.mockplus.cn/idoc/xd/2020-07-30/00cea579-9e88-4117-86c8-099bbe1206e4.png', 'https://img02.mockplus.cn/idoc/xd/2020-07-30/d2daeb77-852c-4b17-b75c-9740b8d5cc48.png'],
    swiperList: [{
      url: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/00cea579-9e88-4117-86c8-099bbe1206e4.png',
      type: 1
    }, {
      url: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/d2daeb77-852c-4b17-b75c-9740b8d5cc48.png',
      type: 1
    }, {
      url: 'https://cloud.video.taobao.com/play/u/576446681/p/1/e/6/t/1/50140370746.mp4',
      type: 2
    }, {
      url: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/619a01c6-c20d-4d55-8ea7-75f01de0ccae.png',
      type: 1
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
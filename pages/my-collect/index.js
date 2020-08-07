// pages/my-collect/index.js
const app=getApp()
var utils = require('../../utils/util.js')
import {navigateTo} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    tabList: [{
        title: '设备列表',
        id: 1
      },
      {
        title: '企业列表',
        id: 2
      }
    ],
    produceList: 12,
    enterpriseList:8
  },
  //  切换tab
  handleChangeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabIndex: id
    })
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
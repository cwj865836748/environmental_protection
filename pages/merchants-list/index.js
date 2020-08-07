// pages/merchants-list/index.js
const App=getApp()
var utils = require('../../utils/util.js')
import {navigateTo} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subTabIndex: 1,
    subTabList: [{
      title: '全部',
      id: 1
    }, {
      title: '水处理类',
      id: 2
    }, {
      title: '泵闸类',
      id: 3
    }, {
      title: '空气清新类',
      id: 4
    }, {
      title: '固废气类',
      id: 5
    }, ],
    merchantsList:8
  },
  handleChangeTab(e) {
    console.log(this.data.subTabIndex)
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex: id
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
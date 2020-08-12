// pages/exhibition/index.js
const App = getApp()
var utils = require('../../utils/util.js');
import {
  request
} from '../../request/index.js';
const api = require('../../request/api.js');
import {
  navigateTo
} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    noMore: false,
    noData: false,
    loading: false,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  // 获取展会列表
  getList() {
    const that = this;
    request({
      url: api.exhibition.lists,
      data: {
        page: that.data.page
      }
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        let listData = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;

        if (listData.length == 0 && that.data.page == 1) {
          that.setData({
            listData: [],
            noData: true
          })
          return;
        }

        if (listData.length != 0 && !is_next) {
          for (let i = 0; i < listData.length; i++) {
            listData[i].deadline_time = utils.formatTimeTwo(listData[i].deadline_time * 1000, 'Y.M.D');
            listData[i].end_time = utils.formatTimeTwo(listData[i].end_time * 1000, 'Y.M.D')
          }
          that.setData({
            listData: that.data.listData.concat(listData),
            noMore: true
          })
          return;
        }

        if (listData.length != 0 && is_next) {
          for (let i = 0; i < listData.length; i++) {
            listData[i].deadline_time = utils.formatTimeTwo(listData[i].deadline_time * 1000, 'Y.M.D');
            listData[i].end_time = utils.formatTimeTwo(listData[i].end_time * 1000, 'Y.M.D')
          }
          that.setData({
            listData: that.data.listData.concat(listData),
            page: that.data.page + 1
          })
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
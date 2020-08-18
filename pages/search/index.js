// pages/search/index.js
const App = getApp()
var utils = require('../../utils/util.js')
import {
  navigateTo
} from '../../utils/wx.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    id: '',
    // type = 1 从首页跳转而来 type = 2 从展会详情跳转而来
    type: ''
  },
  handleJump(e) {
    let search = e.detail;
    this.setData({
      search: search
    })
    console.log(search);
    if (this.data.type == 1) {
      wx.navigateTo({
        url: '/pages/search-result/index?search=' + search + '&&type=1',
      });
    }else{
      wx.navigateTo({
        url: '/pages/search-result/index?search=' + search + '&&type=2' + '&&id=' + this.data.id,
      });
    }

    this.setData({
      search: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('搜索type', options.type);
    let type = options.type;
    let id = options.id;
    this.setData({
      type: type,
      id: id
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
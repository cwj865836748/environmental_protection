// pages/slideshow/index.js
const App = getApp();
var utils = require('../../utils/util.js');
const api = require('../../request/api.js');
import {request} from '../../request/index.js'

import {
  navigateTo
} from '../../utils/wx.js';
let WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      id: options.id
    })

    this.getSlideshowDetail();
  },
  // 获取轮播图详情
  getSlideshowDetail() {
    const that = this;
    request({ url: api.forum.slideshowDetail, data: {slideshow_id: that.data.id} }).then(res=>{
         if(res.code == 200){
          WxParse.wxParse('content', 'html', res.data.info.content, that);
          that.setData({
            info:res.data.info
          })
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
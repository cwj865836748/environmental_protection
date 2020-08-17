// pages/slideshow/index.js
const api = require('../../request/api.js');
import {
  request
} from '../../request/index.js'
let WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: '',
    // type == 1 为供需快报  type == 2 为环保论坛 type == 3  为技术创新 type == 4 为环保展会 type ==5 为活动
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      type: options.type
    })

    if (this.data.type == 1) {
      this.getSlideshowDetailS();
    } else if (this.data.type == 2) {
      this.getSlideshowDetailF();
    }else if(this.data.type == 3){
      this.getSlideshowDetailT()
    }else if(this.data.type == 4){
      this.getSlideshowDetailA();
    }else {
      this.getSlideshowDetailC();
    }

  },
  // 获取轮播图详情-环保论坛
  getSlideshowDetailF() {
    const that = this;
    request({
      url: api.forum.slideshowDetail,
      data: {
        slideshow_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        WxParse.wxParse('content', 'html', res.data.info.content, that);
        that.setData({
          info: res.data.info
        })
      }
    })
  },
  // 获取轮播图详情 - 供需快报
  getSlideshowDetailS() {
    const that = this;
    request({
      url: api.supply.slideshowDetail,
      data: {
        slideshow_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        WxParse.wxParse('content', 'html', res.data.info.content, that);
        that.setData({
          info: res.data.info
        })
      }
    })
  },
  // 获取轮播图详情 - 创新技术
  getSlideshowDetailT() {
    const that = this;
    request({
      url: api.technology.slideshowDetail,
      data: {
        slideshow_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        WxParse.wxParse('content', 'html', res.data.info.content, that);
        that.setData({
          info: res.data.info
        })
      }
    })
  },
  // 获取轮播图详情 - 环保咨询
  getSlideshowDetailA() {
    const that = this;
    request({
      url: api.article.slideshowDetail,
      data: {
        slideshow_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        WxParse.wxParse('content', 'html', res.data.info.content, that);
        that.setData({
          info: res.data.info
        })
      }
    })
  },
  getSlideshowDetailC(){
    const that = this;
    request({
      url: api.activity.slideshowDetail,
      data: {
        slideshow_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        WxParse.wxParse('content', 'html', res.data.info.content, that);
        that.setData({
          info: res.data.info
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
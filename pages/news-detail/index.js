const api = require("../../request/api");
import {
  request
} from '../../request/index.js'

const App = getApp();
const utils = require('../../utils/util.js');
let WxParse = require('../../wxParse/wxParse.js');
// pages/news-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: '',
    // type ==1 表示 高峰论坛  type == 0 表示 供需快报 type == 2 表示创新技术  type == 3 表示环保咨询
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id,
      type: options.type
    })

    if (this.data.type == 0) {
      this.getSupplyDetail();
    } else if (this.data.type == 1) {
      this.getForumDetail();
    } else if (this.data.type == 2) {
      this.getTechnologyDetail();
    } else if (this.data.type == 3) {
      this.getArticleDetail();
    }

  },
  // 获取供需详情
  getSupplyDetail() {
    const that = this;
    request({
      url: api.supply.detail,
      data: {
        supply_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        // WxParse.wxParse('content', 'html', res.data.info.content, that);
        let info = res.data.info;
        info.content = info.content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
        info.createtime = utils.formatTimeTwo(info.createtime * 1000, 'Y-M-D h:m')
        that.setData({
          info: info
        })
      }
    })
  },
  // 获取高峰论坛详情
  getForumDetail() {
    const that = this;
    request({
      url: api.forum.forumDetail,
      data: {
        forum_id: that.data.id
      }
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        let info = res.data.info;
        info.content = info.content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
        info.createtime = utils.formatTimeTwo(info.createtime * 1000, 'Y-M-D h:m')
        that.setData({
          info: info
        })
      }
    })
  },
  // 获取创新技术详情
  getTechnologyDetail() {
    const that = this;
    request({
      url: api.technology.detail,
      data: {
        technology_id: that.data.id
      }
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        let info = res.data.info;
        info.content = info.content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
        info.createtime = utils.formatTimeTwo(info.createtime * 1000, 'Y-M-D h:m')
        that.setData({
          info: info
        })
      }
    })
  },
  // 获取环保咨询详情
  getArticleDetail() {
    const that = this;
    request({
      url: api.article.detail,
      data: {
        article_id: that.data.id
      }
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        let info = res.data.info;
        info.content = info.content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
        info.createtime = utils.formatTimeTwo(info.createtime * 1000, 'Y-M-D h:m')
        that.setData({
          info: info
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
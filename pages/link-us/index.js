// pages/link-us/index.js
const app = getApp();
var utils = require('../../utils/util.js');
import {
  navigateTo
} from '../../utils/wx.js';
import {
  request
} from '../../request/index.js';
const api = require('../../request/api.js');
let WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    // type = 0 表示从展会详情进入 type = 1 表示从我的中的联系我们进入
    type: '',
    info:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      id: options.id,
      type: options.type
    })
    if (this.data.type == 0) {
      this.getDetail();
    } else if(this.data.type == 1){

      this.getLinkInfo()
    }

  },
  // 获取展会详情
  getDetail() {
    const that = this;
    request({
      url: api.exhibition.detail,
      data: {
        exhibition_id: that.data.id
      }
    }).then(res => {
      // console.log(res);
      if (res.code == 200) {
        WxParse.wxParse('content', 'html', res.data.info.contact, that);
        let info = res.data.info
        info.contact = info.contact.replace(/\<img/gi, '<img style="width:100%;height:auto" ');
        that.setData({
          info:info
        })
      }
    })
  },
  // 获取联系我们详情
  getLinkInfo() {
    const that = this;
    request({
      url: api.configInfo.contact
    }).then(res => {
      // console.log(res);
      if (res.code == 200) {
        WxParse.wxParse('content', 'html', res.data.info, that);
        let info = res.data.info
        info = info.replace(/\<img/gi, '<img style="width:100%;height:auto" ');
        that.setData({
          info:info
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
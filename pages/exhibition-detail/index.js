// pages/exhibition-detail/index.js
const App = getApp();
var utils = require('../../utils/util.js');
import {
  navigateTo
} from '../../utils/wx.js';
import {
  request
} from '../../request/index.js';
const api = require('../../request/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    produceList: [],
    enterpriseList: [],
    merchantsList: [],
    id: '',
    info: '',
    noData: false,
    noData1: false,
    noMore: false,
    noMore1: false,
    loading: false,
    loading1: false
  },
  // 企业详情跳转
  handleJumpCompany(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/enterprise-detail/index?id=' + id + '&&show=true',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })

    this.getDetail();
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
        that.setData({
          info: res.data.info,
          produceList: res.data.equipment
        })
        let enterpriseList = res.data.business_list ? res.data.business_list : [];
        let merchantsList = res.data.customer_list ? res.data.business_list : [];
        if (enterpriseList.length == 0) {
          that.setData({
            enterpriseList: [],
            noData: true
          })
        } else {
          that.setData({
            enterpriseList: enterpriseList.slice(0, 7)
          })
        }

        if (merchantsList.length == 0) {
          that.setData({
            merchantsList: [],
            noData1: true
          })
        } else {
          that.setData({
            merchantsList: merchantsList.slice(0, 7)
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
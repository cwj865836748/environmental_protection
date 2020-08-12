const api = require("../../request/api");
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
    // type ==1 表示 高峰论坛  type == 0 表示 供需快报
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
    }else{
      this.getForumDetail();
    }

  },
  // 获取供需详情
  getSupplyDetail() {
    const that = this;
    App.request({
      url: api.supply.detail,
      method: 'post',
      data: {
        supply_id: that.data.id
      },
      success: function (res) {
        console.log(res);
        if (res.code == 200) {
          WxParse.wxParse('content', 'html', res.data.info.content, that);
          let info = res.data.info;
          info.createtime = utils.formatTimeTwo(info.createtime, 'Y-M-D h:m')
          that.setData({
            info: info
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 获取高峰论坛详情
  getForumDetail(){
    const that = this;
    App.request({
      url:api.forum.forumDetail,
      method:'post',
      data:{
        forum_id:that.data.id
      },
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
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
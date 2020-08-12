// pages/professor-detail/index.js
const app = getApp()
var utils = require('../../utils/util.js')
import {
  navigateTo
} from '../../utils/wx.js'
import api from '../../request/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: 10,
    id: '',
    info:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      id:options.id
    })

    this.getDetail()
  },
  // 获取专家详情
  getDetail() {
    const that = this;
    app.request({
      url:api.forum.expertsDetail,
      method:'post',
      data:{
        experts_id:that.data.id
      },
      success:function(res){
        console.log(res);
        if(res.code == 200){
          let info = res.data.info
          let position = info.position;
          let str = '';
          for(let i=0;i<position.length;i++){
            str += position[i] + '、'
          }
          str = str.slice(0,str.length - 1);
          info.position = str;
          that.setData({
            info:res.data.info,
            titleList:res.data.cate
          })
        }
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
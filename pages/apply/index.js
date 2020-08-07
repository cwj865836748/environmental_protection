// pages/apply/index.js
const app=getApp()
var utils = require('../../utils/util.js')
import {navigateTo} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexName: '男',
    sexIndex: 1,
    arrowFlag: false,
    selectList: [{
        title: '企业',
        id: 1
      }, {
        title: '院校',
        id: 2
      },
      {
        title: '协会',
        id: 3
      },
      {
        title: '个人',
        id: 4
      }
    ],
    selectedIndex: 1,
    category: '',
  },
  handleChooseType() {
    this.setData({
      arrowFlag: !this.data.arrowFlag
    })
  },
  // 选中参展类型
  handleSelectTitle(e) {
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title
    console.log(id);
    this.setData({
      selectedIndex: id,
      category: title
    })
  },
  // 选择性别
  handleChooseSex(e) {
    // console.log(e)
    let sexName = e.currentTarget.dataset.sexname;
    let sexIndex = e.currentTarget.dataset.sexindex;
    // console.log(sexName);
    // console.log(sexIndex);
    this.setData({
      sexName: sexName,
      sexIndex: sexIndex
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
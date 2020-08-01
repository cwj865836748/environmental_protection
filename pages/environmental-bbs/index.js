// pages/environmental-bbs/index.js
const App = getApp();
import {
  navigateTo
} from '../../utils/wx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: null,
    statusBarHeight: null,
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    // swiperList: ['/images/img/swiper2.png', '/images/img/swiper1.png', '/images/img/swiper3.png'],
    swiperList:['https://img02.mockplus.cn/idoc/xd/2020-07-30/00cea579-9e88-4117-86c8-099bbe1206e4.png','https://img02.mockplus.cn/idoc/xd/2020-07-30/d2daeb77-852c-4b17-b75c-9740b8d5cc48.png','https://img02.mockplus.cn/idoc/xd/2020-07-30/619a01c6-c20d-4d55-8ea7-75f01de0ccae.png'],
    tabIndex: 1,
    tabList: [{
        title: '专家智库',
        id: 1
      },
      {
        title: '高峰论坛',
        id: 2
      }
    ],
    listData:8,
    subTabIndex:1,
    subTabList:[{title:'全部',id:1},{title:'水处理类',id:2},{title:'泵闸类',id:3},{title:'空气清新类',id:4},{title:'固废气类',id:5},],
  },
  handleChangeTab(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabIndex:id
    })
  },
  
  handleChangeSubTab(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex:id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (App.globalData.navBar) {
      this.setData({
        navHeight: App.globalData.navBar.navHeight,
        statusBarHeight: App.globalData.navBar.statusBarHeight
      })
    } else {
      App.userInfoReadyCallback = res => {
        this.setData({
          navHeight: App.globalData.navBar.navHeight,
          statusBarHeight: App.globalData.navBar.statusBarHeight
        })
      }
    }
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
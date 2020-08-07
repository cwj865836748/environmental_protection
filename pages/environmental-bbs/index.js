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
    // swiperList: ['https://img02.mockplus.cn/idoc/xd/2020-07-30/00cea579-9e88-4117-86c8-099bbe1206e4.png', 'https://img02.mockplus.cn/idoc/xd/2020-07-30/d2daeb77-852c-4b17-b75c-9740b8d5cc48.png', 'https://img02.mockplus.cn/idoc/xd/2020-07-30/619a01c6-c20d-4d55-8ea7-75f01de0ccae.png'],
    swiperList: [{
      url: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/00cea579-9e88-4117-86c8-099bbe1206e4.png',
      type: 1
    }, {
      url: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/d2daeb77-852c-4b17-b75c-9740b8d5cc48.png',
      type: 1
    }, {
      url: 'https://cloud.video.taobao.com/play/u/576446681/p/1/e/6/t/1/50140370746.mp4',
      type: 2
    }, {
      url: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/619a01c6-c20d-4d55-8ea7-75f01de0ccae.png',
      type: 1
    }],
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
    listData: 8,
    subTabIndex: 1,
    subTabList: [{
      title: '全部',
      id: 1
    }, {
      title: '水处理类',
      id: 2
    }, {
      title: '泵闸类',
      id: 3
    }, {
      title: '空气清新类',
      id: 4
    }, {
      title: '固废气类',
      id: 5
    }, ],
    titleList: 2,
    selectList: 9,
    titleFlag: false,
  },
  goBack() {
    wx.navigateBack()
  },
  // 获取一级 tab 信息 
  handleChangeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabIndex: id
    })
  },
  // 获取二级 tab 信息
  handleChangeSubTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex: id
    })
  },
  // 下拉框显示与隐藏
  handleChooseTitle() {
    this.setData({
      titleFlag: !this.data.titleFlag
    })
  },
  // 选择专家类型
  handleSelectTitle(e) {
    let id = e.currentTarget.dataset.id;
    let titleList = [{}, {}, {}];
    for (let i = 0; i < titleList.length; i++) {
      titleList[i].checked = false
    }
    console.log(titleList)

  },
  // 跳转专家详情页面
  handleJump() {
    wx.navigateTo({
      url: '/pages/professor-detail/index',
    })
  },
  jumpPage1(){
    wx.navigateTo({
      url: '/pages/news-detail/index',
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
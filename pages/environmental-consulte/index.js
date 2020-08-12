// pages/environmental-consulte/index.js
const App = getApp();
import {
  request
} from '../../request/index.js'
import {
  navigateTo
} from '../../utils/wx.js'
import api from '../../request/api.js';
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: null,
    statusBarHeight: null,
    indicatorDots: true,
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
    listData: 8,
    subTabIndex: 1,
    subTabList: [],
    noData: false,
    noMore: false,
    loading: false,
    page: 1
  },
  goBack() {
    wx.navigateBack()
  },
  // 获取二级 tab 信息
  handleChangeSubTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex: id,
      noData: false,
      noMore: false,
      loading: false,
      page: 1,
      listData: []
    })
    this.getLists()
  },
  // 轮播图跳转
  handleJump(e) {
    let jump = e.currentTarget.dataset.item.jump_type;
    let id = e.currentTarget.dataset.item.id;
    if (jump == 1) {
      wx.navigateTo({
        url: '/pages/slideshow/index?id=' + id,
      })
    }
  },
  // 页面跳转
  jumpPage(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news-detail/index?id=' + id + '&&type=3',
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

    this.getSlideshow();
    this.getCategory();
    this.getLists();
  },
  // 获取轮播图
  getSlideshow() {
    const that = this;
    request({
      url: api.article.slideshow
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        that.setData({
          swiperList: res.data.list
        })
      }
    })
  },
  // 获取分类
  getCategory() {
    request({
      url: api.article.category
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        this.setData({
          subTabList: res.data.list
        })
      }
    })
  },
  // 获取创新技术列表
  getLists() {
    this.setData({
      loading: true
    })
    request({
      url: api.article.lists,
      data: {
        cat_id: this.data.subTabIndex,
        page: this.data.page
      }
    }).then(res => {
      console.log(res);
      this.setData({
        loading: false
      })
      if (res.code == 200) {
        let listData = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;

        if (listData.length == 0 && this.data.page == 1) {
          this.setData({
            listData: [],
            noData: true
          })
          return;
        }

        if (listData.length != 0 && !is_next) {
          for (let i = 0; i < listData.length; i++) {
            listData[i].createtime = utils.formatTimeTwo(listData[i].createtime * 1000, 'Y-M-D h:m')
          }
          this.setData({
            listData: this.data.listData.concat(listData),
            noMore: true
          })
          return;
        }

        if (listData.length != 0 && is_next) {
          for (let i = 0; i < listData.length; i++) {
            listData[i].createtime = utils.formatTimeTwo(listData[i].createtime * 1000, 'Y-M-D h:m')
          }
          this.setData({
            listData: this.data.listData.concat(listData),
            page: this.data.page
          })
          return;
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
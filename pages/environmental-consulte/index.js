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
    scrollTop: null,
    headColor: 'transparent',
    titleColor: '#fff',
    indicatorDots: true,
    swiperList: [],
    listData: [],
    subTabIndex: 0,
    subTabList: [],
    noData: false,
    noMore: false,
    loading: false,
    page: 1
  },
  //滚动条监听
  scroll: function (e) {
    if (e.detail.scrollTop < 50) {
      this.setData({
        headColor: 'transparent',
        titleColor: '#fff'
      })
      // 设置导航条背景色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ffffff'
      })
    } else {
      this.setData({
        headColor: '#fff',
        titleColor: '#333333'
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#000000'
      })
    }
    this.setData({
      scrollTop: e.detail.scrollTop
    })
    if (e.detail.scrollTop > 1700 & this.data.isCir) {
      this.animate()
      this.setData({
        isCir: false
      })
    }
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
        url: '/pages/slideshow/index?id=' + id + '&&type=4',
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
    // this.getSlideshow();
    // this.getCategory();
    // this.getLists();
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
    let tabFirst = {
      id: 0,
      name: '全部'
    };
    request({
      url: api.article.category
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        let list = res.data.list;
        list.unshift(tabFirst)
        this.setData({
          subTabList: list,
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
            listData[i].createtime = utils.formatTimeTwo(listData[i].createtime * 1000, 'Y-M-D')
          }
          this.setData({
            listData: this.data.listData.concat(listData),
            noMore: true
          })
          return;
        }

        if (listData.length != 0 && is_next) {
          for (let i = 0; i < listData.length; i++) {
            listData[i].createtime = utils.formatTimeTwo(listData[i].createtime * 1000, 'Y-M-D')
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
    this.setData({
      noData: false,
      noMore: false,
      page: 1,
      loading: false,
      listData: []
    })
    this.getSlideshow();
    this.getCategory();
    this.getLists();
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
    if (this.data.noMore) {
      return false;
    }
    this.getLists();
  },
  scrollToLower(){
    if (this.data.noMore) {
      return false;
    }
    this.getLists();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
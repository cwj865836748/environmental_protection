// pages/enterprise-list/index.js
const App = getApp();
var utils = require('../../utils/util.js');
import {
  navigateTo
} from '../../utils/wx.js';
const api = require('../../request/api.js');
import {
  request
} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noData: false,
    noMore: false,
    loading: false,
    page: 1,
    search: '',
    subTabIndex: 1,
    subTabList: [],
    enterpriseList: [],
    // type == 1 表示从首页跳转过来 type == 2 表示从展会详情跳转过来
    type: '',
    id: ''
  },
  handleChangeTab(e) {
    console.log(this.data.subTabIndex)
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex: id,
      noMore: false,
      noData: false,
      page: 1,
      enterpriseList: []
    })
    if (this.data.type == 1) {
      this.getList();
      console.log(this.data.search)
    } else if (this.data.type == 2) {
      this.getList1();
      console.log(this.data.search)
    }
  },
  onConfirm(e) {
    this.setData({
      search: e.detail,
      noData: false,
      noMore: false,
      page: 1,
      enterpriseList: []
    })
    if (this.data.type == 1) {
      this.getList();
      console.log(this.data.search)
    } else if (this.data.type == 2) {
      this.getList1();
      console.log(this.data.search)
    }

  },
  // 企业详情跳转
  handleJumpCompany(e) {
    let id = e.currentTarget.dataset.id;
    if (this.data.type == 1) {
      wx.navigateTo({
        url: '/pages/enterprise-detail/index?id=' + id +'&&show=false',
      })
    } else if (this.data.type == 2) {
      wx.navigateTo({
        url: '/pages/enterprise-detail/index?id=' + id + '&&show=true',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    let id = options.id || '';
    this.setData({
      type: type,
      id: id
    })
    this.getCategroy();
    if (type == 1) {
      this.getList();
    } else if (type == 2) {
      this.getList1();
    }

  },
  // 获取企业分类
  getCategroy() {
    const that = this;
    request({
      url: api.company.category,
      data: {
        company_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        that.setData({
          subTabList: res.data.list
        })
      }
    })
  },
  // 获取企业列表 - 首页
  getList() {
    const that = this;
    that.setData({
      loading: true
    })
    request({
      url: api.common.lists,
      data: {
        type: 0,
        name: that.data.search,
        cat_id: that.data.subTabIndex,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        loading: false,
      })
      if (res.code == 200) {
        let enterpriseList = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;

        if (enterpriseList.length == 0 && that.data.page == 1) {
          that.setData({
            enterpriseList: [],
            // noMore:false,
            noData: true
          })
          return;
        }

        if (enterpriseList.length != 0 && !is_next) {
          that.setData({
            enterpriseList: that.data.enterpriseList.concat(enterpriseList),
            noMore: true,
          })
          return;
        } else {
          that.setData({
            enterpriseList: that.data.enterpriseList.concat(enterpriseList),
            page: that.data.page + 1,
          })
          return;
        }

      }
    })
  },
  // 获取企业列表 - 展会详情
  getList1() {
    const that = this;
    that.setData({
      loading: true
    })
    request({
      url: api.exhibition.company,
      data: {
        type: 0,
        exhibition_id: that.data.id,
        name: that.data.search,
        cat_id: that.data.subTabIndex,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        loading: false,
      })
      if (res.code == 200) {
        let enterpriseList = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;

        if (enterpriseList.length == 0 && that.data.page == 1) {
          that.setData({
            enterpriseList: [],
            // noMore:false,
            noData: true
          })
          return;
        }

        if (enterpriseList.length != 0 && !is_next) {
          that.setData({
            enterpriseList: that.data.enterpriseList.concat(enterpriseList),
            noMore: true,
          })
          return;
        } else {
          that.setData({
            enterpriseList: that.data.enterpriseList.concat(enterpriseList),
            page: that.data.page + 1,
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
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
    subTabIndex: 0,
    subTabList: [],
    enterpriseList: [],
    // type == 1 表示从首页跳转过来 type == 2 表示从展会详情跳转过来
    type: '',
    id: ''
  },
  handleChangeTab(e) {
    // console.log(this.data.subTabIndex)
    // console.log(e.currentTarget.dataset.id)
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
      // console.log(this.data.search)
    }

  },
  // 企业详情跳转
  handleJumpCompany(e) {
    let id = e.currentTarget.dataset.id;
    if (this.data.type == 1) {
      wx.navigateTo({
        url: '/pages/enterprise-detail/index?id=' + id,
      })
    } else if (this.data.type == 2) {
      wx.navigateTo({
        url: '/pages/enterprise-detail/index?id=' + id + '&&show=true',
      })
    }

  },
  // 收藏操作
  handleCollect(e) {
    let id = e.currentTarget.dataset.id;
    let collect = e.currentTarget.dataset.collect;
    if (collect == 1) {
      this.getDel(id);
    } else {
      this.getAdd(id);
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
    let tabFirst = {id:0,name:'全部'};
    request({
      url: api.company.category,
      data: {
        company_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        let list = res.data.list;
        list.unshift(tabFirst)
        that.setData({
          subTabList: list
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
        type: 1,
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
          console.log('xixi')
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
        type: 1,
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
  changeCollect(id) {
    const List = this.data.enterpriseList
    List.forEach(item => {
      if (item.id == id) {
        item.is_collect = item.is_collect == 0 ? 1 : 0
      }
    })
    this.setData({
      enterpriseList: [...List]
    })
  },
  // 添加收藏
  getAdd(id) {
    request({
      url: api.company.addCollect,
      data: {
        company_id: id
      }
    }).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '收藏成功',
          icon: 'none'
        })
        this.changeCollect(id);
      }
    })
  },
  // 取消收藏
  getDel(id) {
    request({
      url: api.company.deCollect,
      data: {
        company_id: id
      }
    }).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '取消收藏',
          icon: 'none'
        })
      }
      this.changeCollect(id);
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
    if (this.data.noMore) {
      return false;
    }
    if (this.data.type == 1) {
      this.getList()
    } else {
      this.getList1();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
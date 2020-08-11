// pages/search-result/index.js
const App = getApp();
var utils = require('../../utils/util.js');
import {
  navigateTo
} from '../../utils/wx.js';
const api = require("../../request/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    tabIndex: 1,
    noData: false,
    noMore: false,
    loading: false,
    page: 1,
    tabList: [{
        title: '设备',
        id: 1
      },
      {
        title: '企业',
        id: 2
      }
    ],
    listData: 8,
    subTabIndex: 1,
    subTabList: [],
    produceList: [],
    etpTabIndex: 1,
    etpTabList: [{
      title: '全部',
      id: 1
    }, {
      title: '企业名录',
      id: 2
    }, {
      title: '客商名录',
      id: 3
    }],
    enterpriseList: []
  },
  // 获取一级 tab 信息 
  handleChangeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabIndex: id,
      noMore: false,
      noData: false,
      loading: false,
      page: 1,
      produceList: [],
      enterpriseList: []
    })
    if (id == 1) {
      this.getEqupmentList()
    } else {
      this.getComponyList("");
    }
  },
  // 获取 设备 二级 tab 信息
  handleChangeSubTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex: id,
      noData:false,
      noMore:false,
      loading:false,
      page:1,
      produceList:[]
    })
    this.getEqupmentList()
  },
  // 获取企业二级 tab 信息
  handleChangeEtpTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      etpTabIndex: id
    })
    if (id == 1) {
      this.getComponyList("")
    } else if (id == 2) {
      this.getComponyList(0)
    } else {
      this.getComponyList(1);
    }
  },
  // 搜索结果
  handleConfirm(e){
    this.setData({
      search:e.detail
    })
    if(this.tabIndex == 1){
      this.getEqupmentList()
    }else{
      if(this.etpTabIndex == 1){
        this.getComponyList("")
      }else if(this.etpTabIndex == 2){
        this.getComponyList(1)
      }else{
        this.getComponyList(2)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('传递过来的数据', options.search);
    this.setData({
      search: options.search
    })
    this.getCategory();
    this.getEqupmentList();

  },
  // 获取产品库分类
  getCategory() {
    const that = this;
    App.request({
      url: api.equipment.category,
      method: 'post',
      success: function (res) {
        console.log(res);
        if (res.code == 200) {
          that.setData({
            subTabList: res.data.list
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 获取设备列表
  getEqupmentList(id) {
    const that = this;
    that.setData({
      loading: true
    })
    App.request({
      url: api.search.equipment,
      method: 'post',
      data: {
        cate_id: that.data.subTabIndex,
        name: that.data.search,
        page: that.data.page
      },
      success: function (res) {
        that.setData({
          loading: false,
        })
        console.log("设备列表", res);
        if (res.code == 200) {
          let produceList = res.data.list ? res.data.list : [];
          let is_next = res.data.is_next;
          if (produceList.length == 0 && that.data.page == 1) {
            that.setData({
              produceList: [],
              noData: true,
            })
            return;
          }

          if (!is_next) {
            that.setData({
              produceList: produceList,
              noMore: true
            })
            return;
          }
        }

        if (is_next) {
          that.setData({
            produceList: that.data.produceList.concat(produceList),
            page: that.data.page + 1
          })
          return;
        }


      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 获取企业列表
  getComponyList(id) {
    const that = this;
    that.setData({
      loading: true
    })
    App.request({
      url: api.search.company,
      method: 'post',
      data: {
        cate_id: id,
        name: that.data.search,
        page: that.data.page
      },
      success: function (res) {
        console.log(res);
        that.setData({
          loading: false
        })
        if (res.code == 200) {
          let enterpriseList = res.data.list ? res.data.list : [];
          let is_next = res.data.is_next;

          if (enterpriseList.length == 0 && that.data.page == 1) {
            that.setData({
              enterpriseList: [],
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
          }

          if (enterpriseList.length != 0 && is_next) {
            that.setData({
              enterpriseList:that.data.enterpriseList.concat(enterpriseList),
              page:that.data.page + 1
            })
            return;
          }
        }
      },
      fail: function (res) {
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
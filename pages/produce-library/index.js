// pages/produce-library/index.js
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
    search: '',
    subTabIndex: 0,
    subTabList: [],
    produceList: [],
    noData: false,
    noMore: false,
    loading: false,
    page: 1,
    // type == 1 表示从首页跳转过来  type == 2 表示从展会详情跳转过来
    type: '',
    id: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('传参', options);
    let type = options.type;
    let id = options.id || ''
    this.setData({
      type: type,
      id: id
    })
    this.getCategory();
    if (type == 1) {
      this.getEqupmentList();
    } else if (type == 2) {
      this.getEqupmentList1();
    }
    // console.log(getCurrentPages()[1].options.type)
  },
  handleChangeTab(e) {
    // console.log(this.data.subTabIndex)
    // console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex: id,
      produceList: [],
      page: 1,
      noMore: false,
      noData: false
    })
    if (this.data.type == 1) {
      this.getEqupmentList();
    } else if (this.data.type == 2) {
      this.getEqupmentList1();
    }

  },
  onConfirm(e) {
    this.setData({
      search: e.detail,
      produceList: [],
      page: 1,
      noData: false,
      noMore: false
    })
    if (this.data.type == 1) {
      this.getEqupmentList();
    } else {
      this.getEqupmentList1();
    }

  },
  // 获取产品库分类
  getCategory() {
    const that = this;
    let tabFirst = {id:0,name:'全部'};
    request({
      url: api.equipment.category
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
  // 获取设备列表-首页
  getEqupmentList(id) {
    const that = this;
    that.setData({
      loading: true
    })
    request({
      url: api.search.equipment,
      data: {
        cate_id: that.data.subTabIndex,
        name: that.data.search,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        loading: false,
      })
      // console.log("设备列表", res);
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

        if (produceList.length != 0 && !is_next) {
          that.setData({
            produceList: produceList,
            noMore: true
          })
          return;
        }
      }

      if (produceList.length != 0 && is_next) {
        that.setData({
          produceList: that.data.produceList.concat(produceList),
          page: that.data.page + 1
        })
        return;
      }
    })
  },
  // 获取设备列表 - 展会
  getEqupmentList1() {
    const that = this;
    that.setData({
      loading: true
    })
    request({
      url: api.exhibition.equipment,
      data: {
        exhibition_id: that.data.id,
        cate_id: that.data.subTabIndex,
        name: that.data.search,
        page: that.data.page
      }
    }).then(res => {
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

        if (produceList.length != 0 && !is_next) {
          that.setData({
            produceList: produceList,
            noMore: true
          })
          return;
        }
      }

      if (produceList.length != 0 && is_next) {
        that.setData({
          produceList: that.data.produceList.concat(produceList),
          page: that.data.page + 1
        })
        return;
      }
    })
  },
  // 跳转设备详情页
  handleJump(e) {
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    if (this.data.type == 1) {
      wx.navigateTo({
        url: '/pages/equipment-detail/index?id=' + id,
      })
    }else if(this.data.type == 2){
      wx.navigateTo({
        url: '/pages/equipment-detail/index?id='+id+'&&show=true',
      })
    }

  },
  // 
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
    // 显示顶部刷新图标
    // wx.showNavigationBarLoading();
    // this.setData({
    //   page: 1,
    //   noMore: false,
    //   noData: false,
    //   loading: false,
    //   search: '',
    //   subTabIndex: 1
    // })
    // this.getEqupmentList();
    // 隐藏导航栏加载框
    // wx.hideNavigationBarLoading();
    // 停止下拉动作
    // wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.noMore) {
      return false;
    }
    if (this.data.type == 1) {
      this.getEqupmentList()
    } else {
      this.getEqupmentList1()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
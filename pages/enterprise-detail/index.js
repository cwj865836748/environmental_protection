// pages/enterprise-detail/index.js
const App = getApp();
import {
  request
} from '../../request/index.js'
const api = require('../../request/api.js');
let WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight: null,
    statusBarHeight: null,
    noData: false,
    noMore: false,
    loading: false,
    produceList: [],
    id: '',
    info: '',
    page: 1,
    show: ''
  },
  goBack() {
    wx.navigateBack()
  },
  // 收藏操作
  handleCollect(e) {
    // console.log(e.currentTarget.dataset.collect);
    let collect = e.currentTarget.dataset.collect;
    if (collect == 0) {
      this.getAdd()
      // this.getCompanyDetail();
    } else {
      this.getDel()
      // this.getCompanyDetail();
    }
  },
  changeCollect(id) {
    const info = this.data.info
    if (info.id == id) {
      info.is_collect = info.is_collect == 0 ? 1 : 0
    }
    this.setData({
      info: info
    })
    // console.log(info)
  },
  // 跳转设备详情页
  handleJump(e) {
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/equipment-detail/index?id=' + id + '&&show=' + this.data.show,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('企业show', options.show);
    this.setData({
      id: options.id,
      show: options.show
    })

    // this.getCompanyDetail();
    // this.getEquipment();

  },
  // 获取企业详情
  getCompanyDetail() {
    const that = this;
    request({
      url: api.company.detail,
      data: {
        company_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        // WxParse.wxParse('content', 'html', res.data.info.introduce, that);
        let info = res.data.info
        info.introduce = info.introduce.replace(/\<img/gi, '<img style="width:95%;height:auto" ')
        that.setData({
          info: info
        })
      }
    })
  },
  // 获取企业详情产品库
  getEquipment() {
    const that = this;
    that.setData({
      loading: true
    })
    request({
      url: api.company.equipment,
      data: {
        company_id: that.data.id,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        loading: false
      })
      if (res.code == 200) {
        let prodeceList = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;

        if (prodeceList.length == 0 && that.data.page == 1) {
          that.setData({
            produceList: [],
            noData: true
          })
          return;
        }

        if (prodeceList.length != 0 && !is_next) {
          that.setData({
            produceList: that.data.produceList.concat(prodeceList),
            noMore: true
          })
          return;
        }

        if (prodeceList.length != 0 && is_next) {
          that.setData({
            produceList: that.data.produceList.concat(prodeceList),
            page: that.data.page + 1
          })
          return;
        }

      }
    })
  },
  // 添加收藏
  getAdd() {
    const that = this;
    request({
      url: api.company.addCollect,
      data: {
        company_id: that.data.id
      }
    }).then(res => {
      //  console.log(res)
      wx.showToast({
        title: '收藏成功',
        icon: 'none'
      })
      this.changeCollect(that.data.id);

    })
  },
  // 取消收藏
  getDel() {
    const that = this;
    request({
      url: api.company.deCollect,
      data: {
        company_id: that.data.id
      }
    }).then(res => {
      // console.log(res);
      wx.showToast({
        title: '取消收藏',
        icon: 'none'
      })
      this.changeCollect(that.data.id);
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
      loading: false,
      page: 1,
      produceList: []
    })
    this.getCompanyDetail();
    this.getEquipment();
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
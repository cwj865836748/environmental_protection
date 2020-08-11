// pages/enterprise-detail/index.js
const App = getApp();
import {
  navigateTo
} from '../../utils/wx.js';
const api = require('../../request/api.js');
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
  },
  goBack() {
    wx.navigateBack()
  },
  // 收藏操作
  handleCollect(e){
    console.log(e.currentTarget.dataset.collect);
    let collect = e.currentTarget.dataset.collect;
    if(collect == 0){
      this.getAdd()
    }else{
      this.getDel()
    }

    this.getCompanyDetail();
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

    console.log('企业id', options.id);
    this.setData({
      id: options.id
    })

    this.getCompanyDetail();
    this.getEquipment();

  },
  // 获取企业详情
  getCompanyDetail() {
    const that = this;
    App.request({
      url: api.company.detail,
      method: 'post',
      data: {
        company_id: that.data.id
      },
      success: function (res) {
        console.log(res);
        if (res.code == 200) {
          that.setData({
            info: res.data.info
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 获取企业详情产品库
  getEquipment() {
    const that = this;
    that.setData({
      loading: true
    })
    App.request({
      url: api.company.equipment,
      method: 'post',
      data: {
        company_id: that.data.id,
        page: that.data.page
      },
      success: function (res) {
        that.setData({
          loading: false
        })
        console.log(res);
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
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  // 添加收藏
  getAdd() {
    const that = this;
    App.request({
      url: api.company.addCollect,
      method: 'post',
      data: {
        company_id: that.data.id
      },
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  // 取消收藏
  getDel(){
    const that = this;
    App.request({
      url:api.company.deCollect,
      method:'post',
      data:{
        company_id: that.data.id
      },
      success:function(res){
        console.log(res)
      },
      fail:function(res){
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
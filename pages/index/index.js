const App = getApp();
import {request} from '../../request/index.js'
const api = require('../../request/api.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    swiperList: [],
    produceList: [],
    enterpriseList: [],
    merchantsList: [],
    noData: false,
    noMore: false,
    noInternet: false,
    noContent: false,
    loading: false,
    loading1: false,
    noData1: false,
    noMore1: false
  },
  // 企业详情跳转
  handleJumpCompany(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/enterprise-detail/index?id=' + id,
    })
  },
  // 收藏操作
  handleCollect(e) {
    let id = e.currentTarget.dataset.id;
    let collect = e.currentTarget.dataset.collect;
    if(collect == 1){
      this.getDel(id);
    }else{
      this.getAdd(id);
    }
    this.getBusinessList();
    this.getCustomerList();
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSlideshow();
    this.getEquipment();
    this.getBusinessList();
    this.getCustomerList();
  },
  // 添加收藏
  getAdd(id) {
     request({ url: api.company.addCollect, data: {company_id: id} }).then(res=>{
         if (res.code == 200) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
   })
  },
  // 取消收藏
  getDel(id) {
     request({ url: api.company.deCollect, data: {company_id: id} }).then(res=>{
         if (res.code == 200) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 获取轮播图信息
  getSlideshow() {
     request({url: api.common.slideshow}).then(res=>{
        this.setData({
            swiperList: res.data.list
          })
   })
  },
  // 轮播图跳转到相应页面
  handleJump(e) {
    let item = e.currentTarget.dataset.item;
    if (item.jump_type == 1) {
      let id = item.ex_id;
      wx.navigateTo({
        url: '/pages/exhibition-detail/index?id=' + id,
      })
    } else if (item.jump_type == 2) {
      let id = item.active_id;
      wx.navigateTo({
        url: '/pages/activity-detail/index?id=' + id,
      })
    }
  },
  // 获取产品库信息
  getEquipment() {
       request({url: api.common.equipment}).then(res=>{
        this.setData({
            produceList: res.data.list
          })
   })
  },
  // 获取企业名录列表
  getBusinessList() {
    const that = this;
    that.setData({
      loading: true
    })
    request({url: api.common.businessList}).then(res=>{
          that.setData({
          loading: false
        })
        if (res.code == 200) {
          let enterpriseList = res.data.list ? res.data.list : [];
          if (enterpriseList.length == 0) {
            that.setData({
              enterpriseList:[],
              noData: true
            })
            return;
          }
          if (enterpriseList.length < 7) {
            that.setData({
              enterpriseList: enterpriseList,
              // noMore: true
            })
            return;
          } else {
            that.setData({
              enterpriseList: enterpriseList.slice(0, 7)
            })
          }
        }
   })
  },
  // 获取客商名录列表
  getCustomerList() {
    const that = this;
    
    that.setData({
      loading1: true
    })
    request({url: api.common.customerList}).then(res=>{
          that.setData({
          loading1: false
        })
        if (res.code == 200) {
          let merchantsList = res.data.list ? res.data.list : [];
          if (merchantsList.length == 0) {
            that.setData({
              merchantsList: [],
              noData1: true
            })
            return;
          }
          if (merchantsList.length < 7) {
            that.setData({
              merchantsList: merchantsList,
              // noMore1: true
            })
          } else {
            that.setData({
              merchantsList: merchantsList.slice(0, 7)
            })
            return;
          }
        }
   })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getLocation()
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
    wx.showNavigationBarLoading();
    this.setData({
      page:1,
      noData:false,
      noData1:false,
      noMore1:false,
      noMore:false,
      loading:false,
      produceList:[],
      enterpriseList:[],
      merchantsList:[],
      swiperList:[]
    })
    this.getSlideshow();
    this.getEquipment();
    this.getBusinessList();
    this.getCustomerList();

    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
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
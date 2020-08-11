// pages/supply-demand/index.js
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
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    noData:false,
    noMore:false,
    loading:false,
    page:1,
    swiperList: [],
    tabIndex: 1,
    tabList: [{
        title: '供应',
        id: 1
      },
      {
        title: '需求',
        id: 2
      }
    ],
    listData: []
  },
  goBack() {
    wx.navigateBack()
  },
  //  切换tab
  handleChangeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabIndex: id,
      noData:false,
      noMore:false,
      loading:false,
      listData:[]
    })

    this.getLists();
  },
  jumpPage() {
    wx.navigateTo({
      url: '/pages/news-detail/index',
    })
  },
  // 轮播图跳转
  handleSwiperJump(e){
    console.log(e.currentTarget.dataset.id);
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
    this.getLists();
  },

  // 获取轮播图信息
  getSlideshow(){
    const that = this;
    App.request({
      url:api.supply.slideshow,
      method:'post',
      success:function(res){
        console.log(res);
        if(res.code == 200){
          that.setData({
            swiperList:res.data.list
          })
        }
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  // 获取供需列表
  getLists(){
    const that = this;
    that.setData({
      loading:true
    })
    App.request({
      url:api.supply.lists,
      method:'post',
      data:{
        type:that.data.tabIndex,
        page:that.data.page
      },
      success:function(res){
        that.setData({
          loading:false
        })
        console.log(res);
        if(res.code == 200){
          let listData = res.data.list ? res.data.list : [];
          let is_next = res.data.is_next;

          if(listData.length == 0 && that.data.page == 1){
            that.setData({
              listData:[],
              noData:true
            })
            return;
          }

          if(listData.length != 0 && !is_next){
            that.setData({
              listData:that.data.listData.concat(listData),
              noMore:true
            })
            return;
          }

          if(listData.length != 0 && is_next){
            that.setData({
             listData:that.data.listData.concat(listData),
             page:that.data.page + 1
            })
          }

        }

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
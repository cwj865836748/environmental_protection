// pages/supply-demand/index.js
const App = getApp();
import {
  navigateTo
} from '../../utils/wx.js';
const utils = require('../../utils/util.js');
const api = require('../../request/api.js');
import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 500,
    noData:false,
    noMore:false,
    loading:false,
    page:1,
    swiperList: [],
    slideshow_id:'',
    tabIndex: 0,
    tabList: [{
        title: '供应',
        id: 0
      },
      {
        title: '需求',
        id: 1
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
  jumpPage(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news-detail/index?id=' + id + '&&type=0',
    })
  },
  // 跳转轮播图详情
  handleJumpSlide(e){
    let jump = e.currentTarget.dataset.jump;
    let id = e.currentTarget.dataset.id;
    if(jump == 1){
      wx.navigateTo({
        url: '/pages/slideshow/index?id='+id +'&&type=1',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // this.getSlideshow();
    // this.getLists();
  },

  // 获取轮播图信息
  getSlideshow(){
    const that = this;
    request({ url: api.supply.slideshow }).then(res=>{
         if (res.code == 200) {
         that.setData({
              swiperList:res.data.list
          })
        }
   })
  },
  // 获取供需列表
  getLists(){
    const that = this;
    that.setData({
      loading:true
    })
     request({ url: api.supply.lists,
      data:{
        type:that.data.tabIndex,
        page:that.data.page
      } }).then(res=>{
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
            for(let i=0;i<listData.length;i++){
              console.log(utils.formatTimeTwo(listData[i].createtime,'Y-M-D h:m')) 
              listData[i].createtime = utils.formatTimeTwo(listData[i].createtime,'Y-M-D h:m')
            }
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
   })
  },
  // 轮播图详情页
  getSlideDetail(){
    const that = this;
     request({ url: api.supply.slideshowDetail,
      data:{
        slideshow_id:that.data.slideshow_id
      } }).then(res=>{
       console.log(res);
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
      noData:false,
      noMore:false,
      loading:false,
      page:1,
      listData:[]
    })
    this.getSlideshow();
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
    if(this.data.noMore){
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
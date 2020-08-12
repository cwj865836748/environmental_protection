// pages/produce-library/index.js
const App=getApp();
var utils = require('../../utils/util.js');
import {navigateTo} from '../../utils/wx.js';
const api = require('../../request/api.js');
import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:'',
    subTabIndex:1,
    subTabList:[{title:'全部',id:1},{title:'水处理类',id:2},{title:'泵闸类',id:3},{title:'空气清新类',id:4},{title:'固废气类',id:5},],
    produceList:8,
    noData:false,
    noMore:false,
    loading:false,
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory();
    this.getEqupmentList();
  },
  handleChangeTab(e){
    console.log(this.data. subTabIndex)
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex:id,
      produceList:[],
      page:1,
      noMore:false,
      noData:false
    })
    this.getEqupmentList();
  },
  onConfirm(e){
    this.setData({
      search:e.detail,
      produceList:[],
      page:1,
      noData:false,
      noMore:false
    })
    this.getEqupmentList()
  },
  // 获取产品库分类
  getCategory(){
    const  that = this;
    request({ url: api.equipment.category }).then(res=>{
         if (res.code == 200) {
         that.setData({
            subTabList:res.data.list
          })
        }
   })
  },
  // 获取设备列表
  getEqupmentList(id){
    const that = this;
    that.setData({
      loading:true
    })
       request({ url: api.search.equipment,
      data:{
        cate_id:that.data.subTabIndex,
        name:that.data.search,
        page:that.data.page
      } }).then(res=>{
       that.setData({
          loading:false,
        })
        console.log("设备列表",res);
        if(res.code == 200){
          let produceList = res.data.list ? res.data.list : [];
          let is_next = res.data.is_next;
          if(produceList.length == 0 && that.data.page == 1){
            that.setData({
              produceList:[],
              noData:true,
            })
            return;
          }

          if(!is_next){
            that.setData({
              produceList:produceList,
              noMore:true
            })
            return;
          }
        }

        if(is_next){
          that.setData({
            produceList:that.data.produceList.concat(produceList),
            page:that.data.page + 1
          })
          return;
        }
   })
  },
  // 跳转设备详情页
  handleJump(e){
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/equipment-detail/index?id='+id,
    })
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
    wx.showNavigationBarLoading();
    this.setData({
      page:1,
      noMore:false,
      noData:false,
      loading:false,
      search:'',
      subTabIndex:1
    })
    this.getEqupmentList();
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
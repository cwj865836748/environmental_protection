// pages/activity/index.js
import {request} from '../../request/index.js'
const api = require('../../request/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    activityList:[],
    page:1,
    noData:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSlideshow()
    this.activityList()
  },
  getSlideshow(){
   request({url:api.activity.slideshow}).then(res=>{
     this.setData({
      swiperList:res.data.list
     })
   })
  },
  activityList(){
    request({url:api.activity.lists,data:{page:this.data.page}}).then(res=>{
      this.setData({
        activityList:[...res.data.list,...this.data.activityList],
        is_next:res.data.is_next
      },()=>{
        if(this.data.activityList.length){
          return
        }
        this.setData({
        noData:!this.data.activityList.length
        })
      })
     
    })
  },
  goSwiperDetail(e){
   const {item} = e.target.dataset
   if(item.jump_type==0){
     return
   }else if(item.jump_type==1){
     wx.navigateTo({
       url: `/pages/slideshow/index?id=${item.id}&&type=5`,
     })
   }else {
    wx.navigateTo({
      url: `/pages/activity-detail
      /index?id=${item.active_id}`,
    })
   }
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
    if(this.data.is_next){
      this.data.page++
      this.activityList()
    }
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
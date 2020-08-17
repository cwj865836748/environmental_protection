// pages/my-info/index.js
import {request} from '../../request/index.js'
const api = require('../../request/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getPhone: false,
    form:null,
  },
  handleGetPhone() {
    this.setData({
      getPhone: true
    })
  },
  getPhoneNumber: function(e) {
    const {iv,encryptedData}=e.detail
    wx.showLoading({
      title: "正在获取",
      mask: true
    });
    wx.login({
      success(res) {
        if (res.code) {
          request({url:api.login.userPhone,data:{
              code: res.code,
              iv,
              encrypted_data:encryptedData
          }}).then(res=>{
            wx.hideLoading();
            if (res.code == 200) {
               
            }
          })
        } else {
          console.log('获取失败！' + res.errMsg)
        }
      }
    })

  },
  onChange(event){
  // event.detail 为当前输入的值
    const {detail} =event
    const {key} =event.target.dataset
    this.data.form[key]=detail
    this.setData({
      form:{
        ...this.data.form
      }
    })
  },
  saveUser(){
    const {realname,company_name,position,email} = this.data.form
    if(!realname){
      return  wx.showToast({
        title: '姓名不能为空',
        icon:none
      })
    }
    const addForm = {
      realname,
      company_name,
      position,
      email
    }
    request({url:api.user.update,data:addForm}).then(res=>{
      if(res.code==200){
        wx.showToast({
          title: res.msg
        })
        var pages =getCurrentPages()
        if (pages.length >1) {
          var beforePage = pages[pages.length- 2];//获取上一个页面实例对象
          beforePage.getMine();//触发父页面中的方法
        }
        wx.navigateBack({
          delta:1
        })
      }
    })
  },
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      form:app.globalData.userInfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
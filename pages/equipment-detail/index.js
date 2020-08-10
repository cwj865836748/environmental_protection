// pages/equipment-detail/index.js
const App = getApp();
var utils = require('../../utils/util.js');
import {
  navigateTo
} from '../../utils/wx.js';
const api = require('../../request/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteShow: false,
    showPoster: false,
    postImg: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/79bffc54-d65a-4c76-8592-810c7c3c5e54.png',
    qrImg: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/272d2398-e2ee-4119-8694-e33c43f765fe.png',
    saveImg: '',
    id: '',
    is_collect:false,
    info:'',
    company:''
  },
  // 显示弹框
  handleShowPopup() {
    this.setData({
      inviteShow: true
    })
  },
  onClose() {
    this.setData({
      inviteShow: false
    })
  },
  // 生成海报
  producePoster() {
    this.setData({
      inviteShow: false,
      showPoster: true
    })
    this.createCanvas()
  },
  onClickPoster() {
    this.setData({
      showPoster: false
    })
  },
  noop() {},
  // 生成Canvas 
  createCanvas() {
    let that = this;
    const ctx = wx.createCanvasContext('myCanvas');
    let postPath = this.data.postImg;
    let qrImg = this.data.qrImg;
    wx.getImageInfo({
      src: qrImg,
      success: function (res) {
        console.log(res)
        ctx.drawImage(res.path, 230, 270, 82, 82);
      }
    })
    wx.getImageInfo({
      src: postPath,
      success: function (res) {
        console.log(res);
        ctx.drawImage(res.path, 0, 0, 315, 315);
        // 设备名称
        ctx.setFillStyle('#333333');
        ctx.setFontSize(15);
        ctx.fillText('ADA系列全金属管道换气扇', 20, 325);
        ctx.stroke();
        // 企业名称
        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(0, 375, 315, 30);
        ctx.setFillStyle('#999999');
        ctx.setFontSize(12);
        ctx.setTextAlign('center');
        ctx.fillText('春晓环保集团', 155, 395);
        ctx.draw(false, setTimeout(function () {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 630,
            height: 810,
            destHeight: 630 * 2,
            destWidth: 810 * 2,
            canvasId: 'myCanvas',
            success: function (res) {
              console.log(res.tempFilePath);
              that.setData({
                saveImg: res.tempFilePath
              })
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }, 2000))
      }
    })
  },
  // 保存图片
  handleSave() {
    const that = this;
    wx.downloadFile({
      url: that.data.saveImg,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            wx.showToast({
              title: '保存成功',
              icon: 'none',
            })
            this.setData({
              showPlace: false
            })
          }
        })
      }
    })
  },
  // 判断用户是否授权
  checkAuthorize() {
    console.log('调用保存按钮')
    wx.getSetting({
      success: res => {
        console.log('用户授权信息', res)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          // 未授权情况
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              this.handleSave()
            },
            fail: () => {
              // 用户拒绝授权
              wx.openSetting({
                success: () => {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: () => {
                      this.handleSave()
                    }
                  })
                }
              })
            }
          })
        } else {
          this.handleSave()
        }
      }
    })
  },
  // 跳转企业详情页
  handleJump() {
    wx.navigateTo({
      url: '/pages/enterprise-detail/index',
    })
  },
  // 点击是否收藏
  handleCollect(){
    if(this.data.is_collect){
      this.getDel();
      this.setData({
        is_collect:false
      })
    }else{
      this.getAdd();
      this.setData({
        is_collect:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('设备id', options.id);
    this.setData({
      id: options.id
    })
    this.getEquipmentInfo();
  },
  // 获取设备详情信息
  getEquipmentInfo() {
    console.log('设备详情')
    const that = this;
    App.request({
      url:api.equipment.detail,
      method:'post',
      data:{
        equipment_id:that.data.id
      },
      success:function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  // 添加收藏
  getAdd(){
   const that = this;
   App.request({
    url:api.equipment.addCollect,
    method:'post',
    data:{
      equipment_id:that.data.id
    },
    success:function(res){
      console.log(res)
    },
    fail:function(res){
      console.log(res)
    }
   })
  },
  // 删除收藏
  getDel(){
    const that = this;
    App.request({
      url:api.equipment.delCollect,
      method:'post',
      data:{
        id:that.data.id
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
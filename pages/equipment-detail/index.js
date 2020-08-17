// pages/equipment-detail/index.js
const App = getApp();
var utils = require('../../utils/util.js');
import {
  navigateTo
} from '../../utils/wx.js';
const api = require('../../request/api.js');
import {
  request
} from '../../request/index.js'
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    canvasWidth: '',
    canvasHeight: '',
    inviteShow: false,
    showPoster: false,
    postImg: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/79bffc54-d65a-4c76-8592-810c7c3c5e54.png',
    qrImg: 'https://img02.mockplus.cn/idoc/xd/2020-07-30/272d2398-e2ee-4119-8694-e33c43f765fe.png',
    saveImg: '',
    id: '',
    info: '',
    company: '',
    posterInfo: '',
    show: ''
  },
  // 显示弹框
  handleShowPopup() {
    this.setData({
      inviteShow: true,
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
    let postPath = this.data.info.pic;
    let qrImg = this.data.qrImg;
    wx.getImageInfo({
      src: postPath,
      success: function (res) {
        console.log(res);
        ctx.drawImage(res.path, 0, 0, that.data.canvasWidth, that.data.canvasWidth);
      }
    })
    wx.getImageInfo({
      src: qrImg,
      success: function (res) {
        console.log(res)
        ctx.drawImage(res.path, that.data.canvasWidth - 82, that.data.canvasWidth - 20, 82, 82);
        // 设备名称
        ctx.setFillStyle('#333333');
        ctx.setFontSize(15);
        // ctx.fillText(that.data.info.name, 20, 325);
        utils.drawText(ctx, that.data.info.name, 20, that.data.canvasWidth, 200);
        ctx.stroke();
        // 企业名称
        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(0, that.data.canvasHeight - 32, that.data.canvasWidth, 32);
        ctx.setFillStyle('#999999');
        ctx.setFontSize(12);
        ctx.setTextAlign('center');
        ctx.fillText(that.data.company.name, that.data.canvasWidth / 2, that.data.canvasHeight - 16);
        ctx.draw(false, setTimeout(function () {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: that.data.canvasWidth,
            height: that.data.canvasHeight,
            destHeight: that.data.canvasWidth * 2,
            destWidth: that.data.canvasHeight * 2,
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
    console.log('success')
    wx.downloadFile({
      url: that.data.posterInfo,
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
    // console.log('调用保存按钮');
    const that = this;
    wx.getSetting({
      success: res => {
        // console.log('用户授权信息', res)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          // 未授权情况
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              that.handleSave()
            },
            fail: () => {
              // 用户拒绝授权
              wx.openSetting({
                success: () => {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success: () => {
                      that.handleSave()
                    }
                  })
                }
              })
            }
          })
        } else {
          that.handleSave()
        }
      }
    })
  },
  // 跳转企业详情页
  handleJump(e) {
    let id = e.currentTarget.dataset.id;
    console.log('展示',this.data.show);
    let show = this.data.show;
    if (this.data.show) {
      wx.navigateTo({
        url: '/pages/enterprise-detail/index?id=' + id + '&&show=' + show,
      })
    } else {
      wx.navigateTo({
        url: '/pages/enterprise-detail/index?id=' + id,
      })
    }
    // console.log(id)

  },
  // 点击是否收藏
  handleCollect(e) {
    // console.log(e.currentTarget.dataset.collect);
    let collect = e.currentTarget.dataset.collect;
    if (collect == 0) {
      this.getAdd()
    } else {
      this.getDel()
    }

    this.getEquipmentInfo();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('设备id', options.id);
    let myCanvasWidth = '';
    let myCanvasHeight = '';
    wx.getSystemInfo({
      success: function (res) {
        myCanvasWidth = res.windowWidth - 60
        myCanvasHeight = (res.windowWidth - 60) * 1.29
      },
    })
    this.setData({
      id: options.id,
      show: options.show,
      canvasWidth: myCanvasWidth,
      canvasHeight: myCanvasHeight
    })
    this.getEquipmentInfo();
    // this.getPoster();
    this.getPosterInfo();
  },
  // 获取设备详情信息
  getEquipmentInfo() {
    // console.log('设备详情')
    const that = this;
    request({
      url: api.equipment.detail,
      data: {
        equipment_id: that.data.id
      }
    }).then(res => {
      if (res.code == 200) {
        that.setData({
          info: res.data.info,
          company: res.data.company
        })
        WxParse.wxParse('content', 'html', res.data.info.introduce, that);
      }
    })
  },
  // 添加收藏
  getAdd() {
    const that = this;
    request({
      url: api.equipment.addCollect,
      data: {
        equipment_id: that.data.id
      }
    }).then(res => {
      // console.log(res);
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
  },
  // 删除收藏
  getDel() {
    const that = this;
    request({
      url: api.equipment.delCollect,
      data: {
        id: that.data.id
      }
    }).then(res => {
      // console.log(res)
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
  },
  // 获取分享海报
  getPoster() {
    const that = this;
    request({
      url: api.configInfo.poster
    }).then(res => {
      // console.log(res);
      that.setData({
        posterInfo: res.data.info
      })
    })
  },
  // 获取海报内容相关信息
  getPosterInfo() {
    const that = this;
    request({
      url: api.equipment.qrcode,
      data: {
        id: that.data.id
      }
    }).then(res => {
      console.log(res);
      that.setData({
        posterInfo: res.data.info
      })
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
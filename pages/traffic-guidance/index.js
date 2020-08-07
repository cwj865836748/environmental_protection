// pages/traffic-guidance/index.js
const app=getApp()
var utils = require('../../utils/util.js')
import {navigateTo} from '../../utils/wx.js'
var qqmap = require('../../plugin/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min.js');
var  demo = new qqmap({
  key:app.globalData.qqKey
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '113.324520',
    latitude: '23.099994',
    markers: [{
      iconPath: "/images/map_location@2x.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 44,
      height: 54
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 判断用户是否拒绝地理位置信息授权，拒绝的话重新请求授权
  getUserLocation: function () {
    let that = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      that.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          that.getLocation();
        } else {
          //调用wx.getLocation的API
          that.getLocation();
        }
      }
    })
  },
  // 获取定位当前位置的经纬度
  getLocation: function () {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        // app.globalData.lat = res.latitude; //
        // app.globalData.lng = res.longitude; //把onload定位时候的经纬度存到全局
        // wx.setStorageSync('lat', res.latitude)
        // wx.setStorageSync('lng', res.longitude)
        // that.getUserInfo();
        wx.chooseLocation({
          success(res) {
            console.log(res)
            that.setData({
              address: res.address,
              addressName: res.name,
              latitude: res.latitude,
              longitude: res.longitude
            })
            demo.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: function (res) {
                console.log(res);
                var res = res.result;
                that.setData({
                  province: res.address_component.province,
                  city: res.address_component.city,
                  district: res.address_component.district
                })

              },
              fail: function (res) {
                // console.log(res);
              },
              complete: function (res) {
                if (res.status != 0) { //提示用户失败可开启定位服务
                  wx.showModal({
                    title: '定位失败',
                    content: '定位失败，未授权获取当前位置或服务错误',
                  });
                }
              }
            });
          }
        })
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
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
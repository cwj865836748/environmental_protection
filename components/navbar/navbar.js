// components/navbar/index.js
import {
  navigateBack
} from '../../utils/wx.js'
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headColor: {
      type: String,
      value: '#fff'
    },
    title: {
      type: String,
      value: '导航条'
    },
    back: {
      type: Boolean,
      value: true
    },
    home: {
      type: Boolean,
      value: false
    },
    titleColor: {
      type: String,
      value: '#333333'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: null,
    statusBarHeight: null
  },

  attached() {
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
    this.triggerEvent('getNavHeight', {
      navHeight: this.data.navHeight
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      let pages = getCurrentPages();
      if (pages.length == 1) {
       wx.reLaunch({
         url: '/pages/index/index',
       })
      } else {
        navigateBack(1)
      }

    },
    goHome() {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },

  }
})
// pages/my-sign/index.js
import api from '../../request/api.js'
import {
  request
} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    tabList: [{
        title: '展会',
        id: 1
      },
      {
        title: '活动',
        id: 2
      }
    ],
    exhibitionData: [],
    exhibitionNext: false,
    exhibitionPage: 1,
    activityData: [],
    activityNext: false,
    activityPage: 1,
    noData: false
  },
  //  切换tab
  handleChangeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabIndex: id,
      noData: false
    })
    if (id == 1) {
      this.data.exhibitionData = []
      this.exhibitionPage = 1
      this.getExhibition()
    } else {
      this.data.activityData = []
      this.activityPage = 1
      this.getActivity()
    }
  },
  getExhibition() {
    request({
      url: api.user.exhibition,
      data: {
        page: this.data.exhibitionPage
      }
    }).then(res => {
      this.setData({
        exhibitionData: [...res.data.list, ...this.data.exhibitionData],
        exhibitionNext: res.data.is_next,
      }, () => {
        if (this.data.exhibitionData.length) {
          return
        }
        this.setData({
          noData: !this.data.exhibitionData.length
        })
      })
    })
  },
  getActivity() {
    request({
      url: api.user.activity,
      data: {
        page: this.data.activityPage
      }
    }).then(res => {
      this.setData({
        activityData: [...res.data.list, ...this.data.activityData],
        activityNext: res.data.is_next,
      }, () => {
        if (this.data.activityData.length) {
          return
        }
        this.setData({
          noData: !this.data.activityData.length
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExhibition()
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
    if (this.data.tabIndex == 1) {
      if (this.data.exhibitionNext) {
        this.data.exhibitionPage++
        this.getExhibition()
      }
    } else {
      if (this.data.activityNext) {
        this.data.activityPage++
        this.getActivity()
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
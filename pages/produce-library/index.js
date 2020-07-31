// pages/produce-library/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:1,
    tabList:[{title:'全部',id:1},{title:'水处理类',id:2},{title:'泵闸类',id:3},{title:'空气清新类',id:4},{title:'固废气类',id:5},],
    produceList:8
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleChangeTab(e){
    console.log(this.data.tabIndex)
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabIndex:id
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
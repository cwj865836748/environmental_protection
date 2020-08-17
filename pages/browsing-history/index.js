// pages/browsing-history/index.js
import {request} from '../../request/index.js'
import api from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    tabList: [{
        title: '资讯',
        id: 1
      },
      {
        title: '企业',
        id: 2
      }
    ],
    browsingList: [],
    browsingNext:false,
    browsingPage:1,
    enterpriseList: [],
    enterpriseNext:false,
    enterprisePage:1,
    noData:false
  },
  //  切换tab
    //  切换tab
    handleChangeTab(e) {
      let id = e.currentTarget.dataset.id;
      this.setData({
        tabIndex: id,
        noData:false
      })
      if(id==1){
        this.data.browsingList=[]
        this.browsingPage=1
        this.getBrowsing()
      }else {
        this.data.enterpriseList=[]
        this.enterprisePage=1
        this.getEnterprise()
      }
    },
    getBrowsing(){
      request({url:api.user.browsingArticle,data:{page:this.data.browsingPage}}).then(res=>{
         this.setData({
          browsingList:[...res.data.list,...this.data.browsingList],
          browsingNext:res.data.is_next,
         },()=>{
          if(this.data.browsingList.length){
            return 
          }
           this.setData({
            noData:!this.data.browsingList.length
           })
         })
      })
    },
    getEnterprise(){
      request({url:api.user.browsingCompany,data:{page:this.data.enterprisePage}}).then(res=>{
        this.setData({
          enterpriseList:[...res.data.list,...this.data.enterpriseList],
          enterpriseNext:res.data.is_next,
         },()=>{
          if(this.data.enterpriseList.length){
            return
          }
          this.setData({
            noData:!this.data.enterpriseList.length
           })
         })
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getBrowsing()
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
    if(this.data.tabIndex==1){
      if(this.data.browsingNext){
        this.data.browsingPage++
        this.getBrowsing()
      }
    }else {
       if(this.data.enterpriseNext){
      this.data.enterprisePage++
      this.getEnterprise()
    }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
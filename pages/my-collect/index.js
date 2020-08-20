// pages/my-collect/index.js
import {request} from '../../request/index.js'
import api from '../../request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    tabList: [{
        title: '设备列表',
        id: 1
      },
      {
        title: '企业列表',
        id: 2
      }
    ],
    produceList: [],
    enterpriseList:[],
    producePage:1,
    enterprisePage:1,
    produceIs_Next:false,
    enterpriseIs_Next:false,
    noData:false,
    navHeight:null
  },
  getNavHeight(e){
    const {navHeight} = e.detail
    this.setData ({
     navHeight
    })
   },
  //  切换tab
  handleChangeTab(e) {
    let {id} = e.currentTarget.dataset;
    this.setData({
      tabIndex: id,
      noData:false
    })
    if(id==1){
      this.data.producePage=1
      this.data.produceList=[]
      this.getEquipMentList()
    }else{
      this.data.enterprisePage=1
      this.data.enterpriseList=[]
      this.getCompanyList()
    }
    
  },
  getEquipMentList(){
    request({url:api.user.equipment,data:{page:this.data.producePage}}).then(res=>{
      if(res.code==200){
        this.setData({
          produceList:[...res.data.list,...this.data.produceList],
          produceIs_Next:res.data.is_next
        },()=>{
          if(this.data.produceList.length){
            return
          }
           this.setData({
            noData:!this.data.produceList.length
           })
        })
      }
    })  
  },
  getCompanyList(){
    request({url:api.user.company,data:{page:this.data.enterprisePage}}).then(res=>{
      if(res.code==200){
        this.setData({
          enterpriseList:[...res.data.list,...this.data.enterpriseList],
          enterpriseIs_Next:res.data.is_next
        },()=>{
          if(this.data.enterpriseList.length){
            return
          }
          this.setData({
           noData:!this.data.enterpriseList.length
          })
       })
      }
    })  
  },
  handleCollect(e){
       let {id} = e.currentTarget.dataset
       this.delCollect(id)
  },
  delCollect(id){
    request({url:api.company.deCollect,data:{company_id:id}}).then(res=>{
      if(res.code==200){
        
          wx.showToast({
            title: '取消收藏成功',
            icon:'none'
            
          })
          this.changeCollect(id)
      }
    })
  },
  changeCollect(id){
    const List  = this.data.enterpriseList
    const index = List.findIndex(item=>item.company_id==id)
    List.splice(index,1)
    this.setData({
      enterpriseList:[...List]
    })
  },
  handleJumpCompany(e){
    let {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/enterprise-detail/index?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getEquipMentList()
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
    this.setData({
      noData:false,
      produceList:[],
    })
    this.getEquipMentList();
    // this.getCompanyList();
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
      if(this.data.produceIs_Next){
        this.data.producePage++
        this.getEquipMentList()
      }
    }else {
       if(this.data.enterpriseIs_Next){
      this.data.enterprisePage++
      this.getCompanyList()
    }
    }
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
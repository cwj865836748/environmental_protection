// pages/apply/index.js
import {request} from '../../request/index.js'
const api = require('../../request/api.js');
import {checkEmail,checkPhone} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addForm:{
      active_id:null,
      type:1,//登记类型:0=个人,1=企业,2=协会,3=院校
      name:'',
      sex:'1',//性别:1=男,2=女
      company_name:'',//公司/院校/协会名称
      position:'',
      email:'',
      mobile:'',
      company_url:'',
      industry:''
    },
    selectList: [{
        name: '企业',
        type:1
      }, {
        name: '院校',
        type:3
      },
      {
        name: '协会',
        type:2
      },
      {
        name: '个人',
        type:0
      }
    ],
    readyType:'企业',
    show:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.data.addForm.active_id=options.id
  },
  showSelect(){
   this.setData({
      show:true
   })
  },
  onSelect(event){
    const {name,type} = event.detail
    this.setData({
      show:false,
      addForm:{
       ...this.data.addForm, type
      },
      readyType:name
   })
  },
  onCancle(){
    this.setData({
      show:false
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    const {detail} =event
    const {key} =event.target.dataset
    this.data.addForm[key]=detail
    this.setData({
      addForm:{
        ...this.data.addForm
      }
    })
  },
  submit(){
    if(this.data.readyType!=='个人'){
     
      if(!this.data.addForm.company_name){
          return wx.showToast({
          title: `${this.data.readyType}名称不能为空`,
          icon:'none'
        })
      
      }
    
    if(!this.data.addForm.name){
      return  wx.showToast({
        title: '负责人不能为空',
        icon:'none'
      })
    }
    if(!this.data.addForm.position){
      return  wx.showToast({
        title: '职位不能为空',
        icon:'none'
      })
    }
  }
  else {
    if(!this.data.addForm.name){
    return  wx.showToast({
      title: '姓名不能为空',
      icon:'none'
    })
   }
  }
  if(!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.data.addForm.email))){
    return  wx.showToast({
      title: '邮箱格式有误',
      icon:'none'
    })
  }
  if(!(/^1[3456789]\d{9}$/.test(this.data.addForm.mobile))){ 
    return  wx.showToast({
      title: '手机号格式有误',
      icon:'none'
    })
  }
  request({url:api.activity.add,data:this.data.addForm}).then(res=>{
    if(res.code==200){
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
      wx.navigateBack({
       delta: 1
      });
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
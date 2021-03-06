// pages/publish/index.js
const App = getApp();
var utils = require('../../utils/util.js');
import {
  navigateTo
} from '../../utils/wx.js';
const api = require('../../request/api.js');
import {
  request
} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexName: '男',
    sexIndex: 1,
    arrowFlag: false,
    selectList: [],
    selectedIndex: 1,
    typeIndex: 0,
    typeName: '供应',
    name: '',
    company_name: '',
    position: '',
    email: '',
    mobile: '',
    company_info: '',
    remark: '',
    category: '',
    // jumpType = 0 表示从供应跳转 jumpType = 1 表示从需求跳转
    jumpType: ''
  },
  onChangeName(e) {
    this.setData({
      name: e.detail
    })
  },
  onChangeCName(e) {
    this.setData({
      company_name: e.detail
    })
  },
  onChangePosition(e) {
    this.setData({
      position: e.detail
    })
  },
  onChangeEmail(e) {
    this.setData({
      email: e.detail
    })
  },
  onChangeMoblie(e) {
    this.setData({
      mobile: e.detail
    })
  },
  onChangeCInfo(e) {
    this.setData({
      company_info: e.detail
    })
  },
  onChangeRemark(e) {
    this.setData({
      remark: e.detail
    })
  },
  // 选择类型
  handleChooseCategory(e) {
    let typeName = e.currentTarget.dataset.typename;
    let typeIndex = e.currentTarget.dataset.typeindex;
    this.setData({
      typeName: typeName,
      typeIndex: typeIndex
    })
  },
  handleChooseType() {
    this.setData({
      arrowFlag: !this.data.arrowFlag
    })
  },
  // 选择类别
  handleSelectTitle(e) {
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    this.setData({
      selectedIndex: id,
      category: name,
      arrowFlag: false
    })
  },
  // 选择性别
  handleChooseSex(e) {
    // console.log(e)
    let sexName = e.currentTarget.dataset.sexname;
    let sexIndex = e.currentTarget.dataset.sexindex;
    // console.log(sexName);
    // console.log(sexIndex);
    this.setData({
      sexName: sexName,
      sexIndex: sexIndex
    })
  },
  // 点击取消弹框
  handleDelChoose(){
    this.setData({
      arrowFlag:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTypeList();
    let jumpType = options.type;
    this.setData({
      jumpType: jumpType,
    })
    if(jumpType == 0){
      this.setData({
        typeIndex:jumpType,
        typeName:'供应'
      })
    }else{
      this.setData({
        typeIndex:jumpType,
        typeName:'需求'
      })
    }
  },
  // 获取类别分类列表
  getTypeList() {
    const that = this;
    request({
      url: api.company.category
    }).then(res => {
      if (res.code == 200) {
        that.setData({
          selectList: res.data.list
        })
      }
    })
  },
  // 供需发布
  handlePublish() {
    const that = this;
    let regEmail = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    let regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (that.data.name == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: "none"
      })
      return;
    } else if (that.data.company_name == '') {
      wx.showToast({
        title: '公司名称不能为空',
        icon: "none"
      })
      return;
    } else if (that.data.category == '') {
      wx.showToast({
        title: '请选择类别',
        icon: "none"
      })
      return;
    } else if (that.data.position == '') {
      wx.showToast({
        title: '职位不能为空',
        icon: "none"
      })
      return;
    } else if (that.data.email == '') {
      wx.showToast({
        title: '邮箱不能为空',
        icon: "none"
      })
      return;
    } else if (!regEmail.test(that.data.email)) {
      wx.showToast({
        title: '邮箱有误，请重新输入',
        icon: "none"
      })
      that.setData({
        email: ''
      })
      return;
    } else if (this.data.mobile == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: "none"
      })
      return;
    } else if (!regMobile.test(that.data.mobile)) {
      wx.showToast({
        title: '手机号码有误，请重新输入',
        icon: "none"
      })
      this.setData({
        mobile: ''
      })
      return;
    } else {
      request({
        url: api.supply.add,
        data: {
          type: that.data.typeIndex,
          name: that.data.name,
          sex: that.data.sexIndex,
          company_name: that.data.company_name,
          cat_id: that.data.selectedIndex,
          postition: that.data.position,
          email: that.data.email,
          mobile: that.data.mobile,
          company_info: that.data.company_info,
          remark: that.data.remark
        }
      }).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '成功',
            icon: "none"
          })
        }
        that.setData({
          type: 0,
          name: '',
          sex: 1,
          company_name: '',
          position: '',
          email: '',
          mobile: '',
          company_info: '',
          remark: ''
        })
        setTimeout(res => {
          var jumpType = that.data.jumpType;
          var typeIndex = that.data.typeIndex
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            typeIndex:jumpType,
            tabIndex:typeIndex
          })
          wx.navigateBack()
        }, 1000)
      })
    }



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
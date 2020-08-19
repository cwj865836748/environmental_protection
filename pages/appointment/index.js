// pages/appointment/index.js
const app = getApp();
var utils = require('../../utils/util.js');
import {
  navigateTo
} from '../../utils/wx.js';
import {
  request
} from '../../request/index.js';
const api = require('../../request/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrowFlag: false,
    selectList: [{
      title: '企业参展',
      id: 1
    }, {
      title: '个人参展',
      id: 0
    }],
    selectedIndex: 1,
    sexName: '男',
    sexIndex: 1,
    typeName: '供应',
    typeIndex: 1,
    type: '企业参展',
    name: '',
    company_name: '',
    exhibition_id: '',
    position: '',
    email: '',
    mobile: '',
    company_url: '',
    industry: ''
  },
  handleChooseType() {
    this.setData({
      arrowFlag: !this.data.arrowFlag
    })
  },
  // 选中参展类型
  handleSelectTitle(e) {
    let id = e.currentTarget.dataset.id;
    let title = e.currentTarget.dataset.title
    console.log(id);
    this.setData({
      selectedIndex: id,
      typeIndex:id,
      type: title,
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
  onChangeCName(e) {
    this.setData({
      company_name: e.detail
    })
  },
  onChangeName(e) {
    this.setData({
      name: e.detail
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
  onChangeMobile(e) {
    this.setData({
      mobile: e.detail
    })
  },
  onChangeUrl(e) {
    this.setData({
      company_url: e.detail
    })
  },
  onChangeIndustry(e) {
    this.setData({
      industry: e.detail
    })
  },
  // 提交
  handleGit() {
    this.postAppointment();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      exhibition_id: id
    })
  },
  // 提交预约登记
  postAppointment() {
    const that = this;
    let regEmail = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
    let regMobile = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (this.data.selectedIndex == 1) {
      if (this.data.type == '') {
        wx.showToast({
          title: '请选择参展类型',
          icon: 'none'
        })
        return;
      } else if (this.data.company_name == '') {
        wx.showToast({
          title: '公司名称不能为空',
          icon: 'none'
        })
        return;
      } else if (this.data.name == '') {
        wx.showToast({
          title: '负责人姓名不能为空',
          icon: 'none'
        })
        return;
      } else if (this.data.position == '') {
        wx.showToast({
          title: '职位不能为空',
          icon: 'none'
        })
        return;
      } else if (this.data.email == '') {
        wx.showToast({
          title: '邮箱不能为空',
          icon: 'none'
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
          url: api.exhibition.add,
          data: {
            type: that.data.typeIndex,
            name: that.data.name,
            sex: that.data.sexIndex,
            company_name: that.data.company_name,
            exhibition_id: that.data.exhibition_id,
            position: that.data.position,
            email: that.data.email,
            mobile: that.data.mobile,
            company_url: that.data.company_url,
            industry: that.data.industry
          }
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            wx.showToast({
              title: '成功',
              icon: 'none'
            })
            that.setData({
              type: '企业参展',
              name: '',
              sex: 1,
              company_name: '',
              position: '',
              email: '',
              mobile: '',
              company_url: '',
              industry: ''
            })
            setTimeout(res => {
              wx.navigateBack()
            }, 1000)
          }
        })
      }
    } else {
      if (this.data.type == '') {
        wx.showToast({
          title: '请选择参展类型',
          icon: 'none'
        })
        return;
      } else if (this.data.name == '') {
        wx.showToast({
          title: '姓名不能为空',
          icon: 'none'
        })
        return;
      } else if (this.data.company_name == '') {
        wx.showToast({
          title: '公司名称不能为空',
          icon: 'none'
        })
        return;
      } else if (this.data.position == '') {
        wx.showToast({
          title: '职位不能为空',
          icon: 'none'
        })
        return;
      } else if (this.data.email == '') {
        wx.showToast({
          title: '邮箱不能为空',
          icon: 'none'
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
          url: api.exhibition.add,
          data: {
            type: that.data.typeIndex,
            name: that.data.name,
            sex: that.data.sexIndex,
            company_name: that.data.company_name,
            exhibition_id: that.data.exhibition_id,
            position: that.data.position,
            email: that.data.email,
            mobile: that.data.mobile,
            company_url: that.data.company_url,
            industry: that.data.industry
          }
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            wx.showToast({
              title: '成功',
              icon: 'none'
            })
            that.setData({
              type: '企业参展',
              name: '',
              sex: 1,
              company_name: '',
              position: '',
              email: '',
              mobile: '',
              company_url: '',
              industry: ''
            })
            setTimeout(res => {
              wx.navigateBack()
            }, 1000)
          }
        })
      }
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
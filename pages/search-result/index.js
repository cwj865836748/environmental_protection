// pages/search-result/index.js
const App = getApp();
var utils = require('../../utils/util.js');
import {
  navigateTo
} from '../../utils/wx.js';
const api = require("../../request/api.js");
import {
  request
} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    tabIndex: 1,
    noData: false,
    noMore: false,
    loading: false,
    page: 1,
    tabList: [{
        title: '设备',
        id: 1
      },
      {
        title: '企业',
        id: 2
      }
    ],
    listData: [],
    subTabIndex: 1,
    subTabList: [],
    produceList: [],
    etpTabIndex: 0,
    etpTabList: [{
      title: '全部',
      id: 0
    }, {
      title: '企业名录',
      id: 1
    }, {
      title: '客商名录',
      id: 2
    }],
    enterpriseList: [],
    id: '',
    type: ''
  },
  // 获取一级 tab 信息 
  handleChangeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabIndex: id,
      noMore: false,
      noData: false,
      loading: false,
      page: 1,
      produceList: [],
      enterpriseList: []
    })
    if (this.data.type == 1) {
      if (id == 1) {
        this.getEqupmentList()
      } else {
        this.getComponyList();
      }
    } else {
      if (id == 1) {
        this.getEqupmentList1()
      } else {
        this.getList1();
      }
    }

  },
  // 获取 设备 二级 tab 信息
  handleChangeSubTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex: id,
      noData: false,
      noMore: false,
      loading: false,
      page: 1,
      produceList: []
    })
    if (this.data.type == 1) {
      this.getEqupmentList()
    } else {
      this.getEqupmentList1();
    }

  },
  // 获取企业二级 tab 信息
  handleChangeEtpTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      etpTabIndex: id,
      noData: false,
      noMore: false,
      loading: false,
      page: 1,
      enterpriseList: [],
    })
    // if (id == 1) {
    //   this.getComponyList(0)
    // } else if (id == 2) {
    //   this.getComponyList(1)
    // } else {
    //   this.getComponyList(2);
    // }
    if (this.data.type == 1) {
      this.getComponyList()
    } else {
      this.getList1();
    }

  },
  // 搜索结果
  handleConfirm(e) {
    this.setData({
      search: e.detail
    })
    if (this.data.type == 1) {
      if (this.tabIndex == 1) {
        this.getEqupmentList()
      } else {
        this.getComponyList();
        // if (this.etpTabIndex == 1) {
        //   this.getComponyList(0)
        // } else if (this.etpTabIndex == 2) {
        //   this.getComponyList(1)
        // } else {
        //   this.getComponyList(2)
        // }
      }
    } else {
      if (this.tabIndex == 1) {
        this.getEqupmentList1()
      } else {
        this.getList1()
      }
    }

  },
  // 跳转设备详情页
  handleJump(e) {
    console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    if (this.data.type == 1) {
      wx.navigateTo({
        url: '/pages/equipment-detail/index?id=' + id,
      })
    } else if (this.data.type == 2) {
      wx.navigateTo({
        url: '/pages/equipment-detail/index?id=' + id + '&&show=true',
      })
    }

  },
  // 企业详情跳转
  handleJumpCompany(e) {
    let id = e.currentTarget.dataset.id;
    if (this.data.type == 1) {
      wx.navigateTo({
        url: '/pages/enterprise-detail/index?id=' + id,
      })
    } else if (this.data.type == 2) {
      wx.navigateTo({
        url: '/pages/enterprise-detail/index?id=' + id + '&&show=true',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('传递过来的数据', options.search);
    console.log('类型type', options.type);
    console.log('展会id', options.id)
    this.setData({
      search: options.search,
      type: options.type,
      id: options.id
    })
    this.getCategory();
    if (this.data.type == 1) {
      this.getEqupmentList();
    } else {
      this.getEqupmentList1()
    }



  },
  // 获取产品库分类
  getCategory() {
    const that = this;
    request({
      url: api.equipment.category
    }).then(res => {
      if (res.code == 200) {
        that.setData({
          subTabList: res.data.list
        })
      }
    })
  },
  // 获取设备列表 - 首页
  getEqupmentList() {
    const that = this;
    that.setData({
      loading: true
    })
    request({
      url: api.search.equipment,
      data: {
        cate_id: that.data.subTabIndex,
        name: that.data.search,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        loading: false,
      })
      console.log("设备列表", res);
      if (res.code == 200) {
        let produceList = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;
        if (produceList.length == 0 && that.data.page == 1) {
          that.setData({
            produceList: [],
            noData: true,
          })
          return;
        }

        if (!is_next) {
          that.setData({
            produceList: produceList,
            noMore: true
          })
          return;
        }
      }

      if (is_next) {
        that.setData({
          produceList: that.data.produceList.concat(produceList),
          page: that.data.page + 1
        })
        return;
      }
    })
  },
  // 获取设备列表 - 展会
  getEqupmentList1() {
    const that = this;
    that.setData({
      loading: true
    })
    request({
      url: api.exhibition.equipment,
      data: {
        exhibition_id: that.data.id,
        cate_id: that.data.subTabIndex,
        name: that.data.search,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        loading: false,
      })
      console.log("设备列表", res);
      if (res.code == 200) {
        let produceList = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;
        if (produceList.length == 0 && that.data.page == 1) {
          that.setData({
            produceList: [],
            noData: true,
          })
          return;
        }

        if (produceList.length != 0 && !is_next) {
          that.setData({
            produceList: produceList,
            noMore: true
          })
          return;
        }
      }

      if (produceList.length != 0 && is_next) {
        that.setData({
          produceList: that.data.produceList.concat(produceList),
          page: that.data.page + 1
        })
        return;
      }
    })
  },
  // 获取企业列表 - 首页
  getComponyList() {
    const that = this;
    that.setData({
      loading: true
    })
    request({
      url: api.search.company,
      data: {
        type: this.data.etpTabIndex,
        name: that.data.search,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        loading: false
      })
      if (res.code == 200) {
        let enterpriseList = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;

        if (enterpriseList.length == 0 && that.data.page == 1) {
          that.setData({
            enterpriseList: [],
            noData: true
          })
          return;
        }

        if (enterpriseList.length != 0 && !is_next) {
          that.setData({
            enterpriseList: that.data.enterpriseList.concat(enterpriseList),
            noMore: true,
          })
          return;
        }

        if (enterpriseList.length != 0 && is_next) {
          that.setData({
            enterpriseList: that.data.enterpriseList.concat(enterpriseList),
            page: that.data.page + 1
          })
          return;
        }
      }
    })
  },
  // 获取企业列表 - 展会详情
  getList1() {
    const that = this;
    that.setData({
      loading: true
    })
    request({
      url: api.exhibition.company,
      data: {
        type: that.data.etpTabIndex,
        exhibition_id: that.data.id,
        name: that.data.search,
        cat_id: '',
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        loading: false,
      })
      if (res.code == 200) {
        let enterpriseList = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;

        if (enterpriseList.length == 0 && that.data.page == 1) {
          that.setData({
            enterpriseList: [],
            // noMore:false,
            noData: true
          })
          return;
        }

        if (enterpriseList.length != 0 && !is_next) {
          that.setData({
            enterpriseList: that.data.enterpriseList.concat(enterpriseList),
            noMore: true,
          })
          return;
        } else {
          that.setData({
            enterpriseList: that.data.enterpriseList.concat(enterpriseList),
            page: that.data.page + 1,
          })
          return;
        }

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
    if (this.data.noMore) {
      return false;
    }
    if (this.data.type == 1) {
      if (this.dat.tabIndex == 1) {
        this.getEqupmentList()
      } else {
        this.getComponyList();
        // if (this.data.subTabIndex == 1) {
        //   this.getComponyList(0)
        // } else if (this.data.subTabIndex == 2) {
        //   this.getComponyList(1)
        // } else {
        //   this.getComponyList(2)
        // }
      }
    } else {
      if (this.dat.tabIndex == 1) {
        this.getEqupmentList1()
      } else {
        this.getList1();
      }
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
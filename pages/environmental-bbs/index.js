// pages/environmental-bbs/index.js
const App = getApp();
import api from '../../request/api.js';
import {
  request
} from '../../request/index.js'
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    noData: false,
    noMore: false,
    loading: false,
    page: 1,
    swiperList: [],
    tabIndex: 1,
    tabList: [{
        title: '专家智库',
        id: 1
      },
      {
        title: '高峰论坛',
        id: 2
      }
    ],
    listData: [],
    subTabIndex: 1,
    subTabList: [],
    titleList: [],
    selectList: [],
    titleFlag: false,
    idList: []
  },
  goBack() {
    wx.navigateBack()
  },
  // 跳转轮播图详情
  handleJumpSlide(e) {
    let jump = e.currentTarget.dataset.jump;
    let id = e.currentTarget.dataset.id;
    if (jump == 1) {
      wx.navigateTo({
        url: '/pages/slideshow/index?id=' + id,
      })
    }
  },
  // 获取一级 tab 信息 
  handleChangeTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      tabIndex: id,
      noData: false,
      noMore: false,
      loading: false,
      listData: []
    })
    if (id == 1) {
      this.getExpertsCategory();
      this.getExpertsList();
    } else {
      this.getForumCategory();
      this.getForumList();
    }
  },
  // 获取二级 tab 信息
  handleChangeSubTab(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      subTabIndex: id,
      noData: false,
      noMore: false,
      loading: false,
      listData: []
    })
    this.getForumList();
  },
  // 下拉框显示与隐藏
  handleChooseTitle() {
    this.setData({
      titleFlag: !this.data.titleFlag
    })
  },
  // 选择专家类型
  handleSelectTitle(e) {
    let id = e.currentTarget.dataset.item.id;
    let checked = e.currentTarget.dataset.item.checked;
    let index = e.currentTarget.dataset.index;
    let name = e.currentTarget.dataset.item.name;
    let selectList = this.data.selectList;
    let titleList = this.data.titleList;
    let idList = this.data.idList;
    if (checked) {
      selectList[index].checked = false;
      if (titleList.length != 0) {
        titleList.pop()
      }
      titleList.pop(name);
      idList.pop(id)
    } else {
      selectList[index].checked = true;
      titleList.push({
        name: name,
        id: id
      });
      idList.push(id);
    }
    titleList = util.unique(titleList);
    idList = util.unique(idList);
    this.setData({
      selectList: selectList,
      titleList: titleList,
      idList: idList,
      noData: false,
      noMore: false,
      loading: false,
      listData: []
    })
    wx.setStorageSync('titleList', titleList);
    wx.setStorageSync('idList', idList);
    // console.log(titleList)
    this.getExpertsList();
  },
  // 删除专家类型
  handleDelTile(e) {
    let id = e.currentTarget.dataset.id;
    let titleList = this.data.titleList;
    let idList = this.data.idList;
    let selectList = this.data.selectList;
    let arr = [];
    let arrId = [];
    for (let i = 0; i < titleList.length; i++) {
      if (titleList[i].id != id) {
        arr.push(titleList[i]);
      }
    }
    // console.log("选中的id", id)
    for (let i = 0; i < selectList.length; i++) {
      if (selectList[i].id == id) {
        selectList[i].checked = false;
      }
    }
    for (let i = 0; i < idList.length; i++) {
      if (idList[i] != id) {
        arrId.push(idList[i])
      }
    }
    this.setData({
      titleList: arr,
      idList: arrId,
      selectList: selectList,
      noData: false,
      noMore: false,
      loading: false,
      listData: []
    })

    wx.setStorageSync('titleList', arr);
    wx.setStorageSync('idList', arrId);

    this.getExpertsList();
  },
  // 跳转专家详情页面
  handleEJump(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/professor-detail/index?id=' + id,
    })
  },
  handleFJump(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news-detail/index?id=' + id + '&&type=1',
    })
  },
  // 跳转轮播图详情
  handleJumpSlide(e) {
    let jump = e.currentTarget.dataset.jump;
    let id = e.currentTarget.dataset.id;
    if (jump == 1) {
      wx.navigateTo({
        url: '/pages/slideshow/index?id=' + id + '&&type=2',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      titleList: wx.getStorageSync('titleList') || [],
      idList: wx.getStorageSync('idList') || []
    })
    this.getSlideshow();
    this.getExpertsCategory();
    this.getExpertsList();
  },
  // 获取轮播图
  getSlideshow() {
    const that = this;
    request({
      url: api.forum.slideshow
    }).then(res => {
      if (res.code == 200) {
        that.setData({
          swiperList: res.data.list
        })
      }
    })
  },
  // 高峰论坛分类
  getForumCategory() {
    const that = this;
    request({
      url: api.forum.forumCategory
    }).then(res => {
      if (res.code == 200) {
        that.setData({
          subTabList: res.data.list
        })
      }
    })
  },
  // 专家智库分类
  getExpertsCategory() {
    const that = this;
    let titleList = wx.getStorageSync('titleList') || [];
    request({
      url: api.forum.expertsCategory
    }).then(res => {
      if (res.code == 200) {
        let selectList = res.data.list;
        console.log(selectList)
        if (selectList.length != 0) {
          for (let i = 0; i < selectList.length; i++) {
            selectList[i].checked = false;
            // console.log('接口中的title', titleList);
          }
          if (titleList.length != 0 && titleList.length < selectList.length) {
            let name = ''
            for (let i = 0; i < titleList.length; i++) {
              name = titleList[i].name
              for (let j = 0; j < selectList.length; j++) {
                if (selectList[j].name == name) {
                  selectList[j].checked = true;
                  break
                }
              }
              name = '';
            }

          }
        }
        console.log(selectList)
        that.setData({
          selectList: selectList
        })
      }
    })
  },
  // 高峰论坛列表
  getForumList() {
    const that = this;
    that.setData({
      loading: false
    })
    request({
      url: api.forum.forumLists,
      data: {
        cat_id: that.data.subTabIndex,
        page: that.data.page
      }
    }).then(res => {
      if (res.code == 200) {
        let listData = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;

        if (listData.length == 0 && that.data.page == 1) {
          that.setData({
            listData: [],
            noData: true
          })
          return;
        }

        if (listData.length != 0 && !is_next) {
          for (let i = 0; i < listData.length; i++) {
            listData[i].createtime = util.formatTimeTwo((listData[i].createtime) * 1000, 'Y-M-D h:m')
          }
          that.setData({
            listData: that.data.listData.concat(listData),
            noMore: true
          })
          return;
        }

        if (listData.length != 0 && is_next) {
          for (let i = 0; i < listData.length; i++) {
            listData[i].createtime = util.formatTimeTwo((listData[i].createtime) * 1000, 'Y-M-D h:m')
          }
          that.setData({
            listData: that.data.listData.concat(listData),
            page: that.data.page + 1
          })
          return;
        }
      }
    })
  },
  // 专家智库列表
  getExpertsList() {
    const that = this;
    that.setData({
      loading: false
    })
    let idList = that.data.idList;
    let id = '';
    if (idList.length != 0) {
      for (let i = 0; i < idList.length; i++) {
        id += idList[i] + ',';
      }
      id = id.slice(0, id.length - 1)
    }
    request({
      url: api.forum.expertsLists,
      data: {
        cat_id: id,
        page: that.data.page
      }
    }).then(res => {
      that.setData({
        loading: false
      })
      // console.log('专家智库列表', res);
      if (res.code == 200) {
        let listData = res.data.list ? res.data.list : [];
        let is_next = res.data.is_next;

        if (listData.length == 0 && that.data.page == 1) {
          that.setData({
            listData: [],
            noData: true
          })
          return;
        }

        if (listData.length != 0 && !is_next) {
          that.setData({
            listData: that.data.listData.concat(listData),
            noMore: true
          })
          return;
        }

        if (listData.length != 0 && is_next) {
          that.setData({
            listData: that.data.listData.concat(listData),
            page: that.data.page + 1
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
    if (this.data.tabList == 1) {
      this.getExpertsList();
    }else{
      this.getForumList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
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
    scrollTop: null,
    headColor: 'transparent',
    titleColor: '#fff',
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
    subTabIndex: 0,
    subTabList: [],
    titleList: [],
    selectList: [],
    titleFlag: false,
    idList: []
  },
  //滚动条监听
  scroll: function (e) {
    if (e.detail.scrollTop < 50) {
      this.setData({
        headColor: 'transparent',
        titleColor: '#fff'
      })
      // 设置导航条背景色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ffffff'
      })
    } else {
      this.setData({
        headColor: '#fff',
        titleColor: '#333333'
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#000000'
      })
    }
    this.setData({
      scrollTop: e.detail.scrollTop
    })
    if (e.detail.scrollTop > 1700 & this.data.isCir) {
      this.animate()
      this.setData({
        isCir: false
      })
    }
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
      titleFlag:false,
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
      titleFlag:false,
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
    let arr = [];
    // console.log('是否被选中',checked);
    // console.log('选中的id为',id);
    // console.log('选中的名字',name)
    if (checked) {
      for (let i = 0; i < selectList.length; i++) {
        if (selectList[i].id == id) {
          selectList[i].checked = false;
        }
      }
      var index1 = '';
      if (titleList.length != 0) {
        console.log(titleList)
        for (let i = 0; i < titleList.length; i++) {
          if (titleList[i].name == name) {
            console.log('hahha')
            index1 = i
          }
        }
        console.log('下标', index1)
        for (let i = 0; i < titleList.length; i++) {
          if (i != index1) {
            arr.push(titleList[i])
          }
        }
        this.setData({
          titleList: arr
        })
      }
    } else {
      for (let i = 0; i < selectList.length; i++) {
        if (selectList[i].id == id) {
          selectList[i].checked = true;
        }
      }
      titleList.push({
        name: name,
        id: id
      });
      this.setData({
        titleList: titleList
      })
    }
    this.setData({
      selectList: selectList,
      noData: false,
      noMore: false,
      loading: false,
      listData: [],
      titleFlag: false
    })
    wx.setStorageSync('titleList', titleList);
    // wx.setStorageSync('idList', idList);
    // console.log(titleList)
    this.getExpertsList();
  },
  // 删除专家类型
  handleDelTile(e) {
    this.setData({
      titleFlag: false
    })
    let id = e.currentTarget.dataset.id;
    console.log('删除的id', id)
    let titleList = this.data.titleList;
    let selectList = this.data.selectList;
    let arr = [];
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
    this.setData({
      titleList: arr,
      // idList: arrId,
      selectList: selectList,
      noData: false,
      noMore: false,
      loading: false,
      listData: []
    })

    wx.setStorageSync('titleList', arr);
    // wx.setStorageSync('idList', arrId);

    this.getExpertsList();
  },
  // 跳转专家详情页面
  handleEJump(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      titleFlag:false
    })
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

    // this.setData({
    //   titleList: wx.getStorageSync('titleList') || [],
    //   idList: wx.getStorageSync('idList') || []
    // })
    // this.getSlideshow();
    // this.getExpertsCategory();
    // this.getExpertsList();

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
    let tabFirst = {
      id: 0,
      name: '全部'
    };
    request({
      url: api.forum.forumCategory
    }).then(res => {
      if (res.code == 200) {
        let list = res.data.list;
        list.unshift(tabFirst)
        that.setData({
          subTabList: list
        })
      }
    })
  },
  // 专家智库分类
  getExpertsCategory() {
    const that = this;
    let titleList = wx.getStorageSync('titleList');
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
            listData[i].createtime = util.formatTimeTwo((listData[i].createtime) * 1000, 'Y-M-D')
          }
          that.setData({
            listData: that.data.listData.concat(listData),
            noMore: true
          })
          return;
        }

        if (listData.length != 0 && is_next) {
          for (let i = 0; i < listData.length; i++) {
            listData[i].createtime = util.formatTimeTwo((listData[i].createtime) * 1000, 'Y-M-D')
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
    let idList = [];
    for (let i = 0; i < this.data.titleList.length; i++) {
      idList.push(that.data.titleList[i].id);
    }
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
    this.setData({
      titleList: wx.getStorageSync('titleList') || [],
      idList: wx.getStorageSync('idList') || [],
      noMore: false,
      noData: false,
      loading: false,
      page: 1,
      titleFlag:false,
      listData: []
    })
    this.getSlideshow();
    if (this.data.tabIndex == 1) {
      this.getExpertsCategory();
      this.getExpertsList();
    }else{
      this.getForumCategory();
      this.getForumList();
    }
  

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
    } else {
      this.getForumList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
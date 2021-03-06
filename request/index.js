import {showToast} from '../utils/wx'
// 后台url
//  const baseUrl = "https://enviorapi.galaxy1234.com";
const baseUrl = 'https://api.stlinknet.com';
 
// 同时发送异步代码的次数
let ajaxTimes = 0;

export const request = (params) => {

  let header = { ...params.header };
  if(wx.getStorageSync("token")){
     header["token"] = wx.getStorageSync("token");
       
  }
  // header["token"] = '1111';
  header['Content-Type']= header['Content-Type']? header['Content-Type']:"application/x-www-form-urlencoded"
  
  ajaxTimes++;
  // 显示加载中 效果
  // wx.showLoading({
  //   title: "加载中",
  //   mask: true
  // });

  return new Promise((resolve, reject) => {
    wx.request({
      method: 'post',
      ...params,
      header: header,
      url: baseUrl + params.url,
      success: (res) => {
        if (res.data.code == 201 ) {
          wx.clearStorageSync();
          wx.navigateTo({ url: '/pages/authorization/index'}) 
              }
        else{
                resolve(res.data);
              }
      },
      fail: (res) => {
        showToast(res.errMsg)
        reject(res);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          //  关闭正在等待的图标
          wx.hideLoading();
        }
      }
    });
  })
}
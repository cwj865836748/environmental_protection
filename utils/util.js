import {
  getSetting,
  openSetting,
  showModal,
  showToast,
  getLocation
} from './wx.js'
const App = getApp()
var QQMapWX = require('../plugin/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: App.globalData.qqKey
});
//时间过滤
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获取当前位置
const getAuth = () => {
  return new Promise((resolve, reject) => {
    getSetting().then(re => {
      if (!re.authSetting['scope.userLocation']) {
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            inLocation().then(result => {
              return resolve(result)
            })
          },
          fail() {
            showModal({
              title: '请求授权当前位置',
              content: '检测到您没打开此小程序的定位权限，是否去设置打开'
            }).then(res => {
              if (res.cancel) {
                return showToast({
                  title: '拒绝授权'
                })
              }
              openSetting().then(auth => {
                if (!auth.authSetting["scope.userLocation"]) {
                  return showToast({
                    title: '授权失败'
                  })
                }
                showToast({
                  title: '授权成功'
                })
                inLocation().then(result => {
                  return resolve(result)
                })
              })
            })
          }
        })
      } else {
        inLocation().then(result => {
          return resolve(result)
        })
      }
    })
  })

}
const inLocation = () => {
  return new Promise((resolve, reject) => {
    getLocation().then(res => {
      const latitude = res.latitude
      const longitude = res.longitude
      getCity(latitude, longitude).then(result => {
        return resolve(result)
      })
    }).catch(error => {
      console.log(error)
    })
  })
}
const getCity = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: function (res) {
        return resolve(res)
      },
      fail: function (err) {
        showToast({
          title: '获取城市失败'
        })
      }
    });
  });
}
/**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */
const wxPromisify = fn => {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

// 数组去重
function unique(arr) {
  console.log(arr)
  const res = new Map();
  return arr.filter((item) => !res.has(item) && res.set(item, 1))
}

// 时间戳 转 日期
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var num = number
  var date = new Date(number);
  console.log(new Date(num))
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}


function formatDate(value) { // 时间戳转换日期格式方法
  if (value == null) {
    return '';
  } else {
    let date = new Date(value);
    let y = date.getFullYear(); // 年
    let MM = date.getMonth() + 1; // 月
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate(); // 日
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours(); // 时
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes(); // 分
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds(); // 秒
    s = s < 10 ? ('0' + s) : s;
    console.log(value)
    console.log(date)
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
  }
}

module.exports = {
  formatTime: formatTime,
  getAuth: getAuth,
  wxPromisify: wxPromisify,
  unique: unique,
  formatTimeTwo: formatTimeTwo,
  formatDate:formatDate
}
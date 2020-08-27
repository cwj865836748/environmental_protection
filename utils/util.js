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
  if (number && number.toString().length == 10) {
    number *= 1000
  }
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var num = number
  var date = new Date(number);
  // console.log(new Date(num))
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

// canvas 文字换行
function drawText(context, t, x, y, w) {

  var chr = t.split("");
  var temp = "";
  var row = [];

  context.font = "15px Source Han Sans SC, Source Han Sans SC-Normal";
  context.fillStyle = "#333333";
  context.textBaseline = "middle";

  for (var a = 0; a < chr.length; a++) {

    if (context.measureText(temp).width < w && context.measureText(temp + (chr[a])).width <= w) {
      temp += chr[a];
    } //context.measureText(text).width  测量文本text的宽度
    else {
      row.push(temp);
      temp = chr[a];
    }
  }
  row.push(temp);

  for (var b = 0; b < row.length; b++) {
    context.fillText(row[b], x, y + (b + 1) * 24); //字体20，间隔24。类似行高
  }

  // 只显示2行，加...
  // for (var b = 0; b < 2; b++) {
  //   var str = row[b];
  //   if (b == 1) {
  //     str = str.substring(0, str.length - 1) + '...';
  //   }
  //   context.fillText(str, x, y + (b + 1) * 24);
  // }
}


function checkPhone(phone) {
  if (!(/^1[3456789]\d{9}$/.test(phone))) {
    return false;
  }
}

function circleImg(ctx, img, x, y, r) {
  ctx.save();
  var d = 2 * r;
  var cx = x + r;
  var cy = y + r;
  ctx.arc(cx, cy + 1.3 * r, r, 0, 2 * Math.PI);
  ctx.setFillStyle('#fff');
  ctx.clip();
  ctx.drawImage(img, x, y + 1.3 * r, d, d);
  ctx.restore();
  ctx.strokeStyle = '#fff';
  ctx.stroke();
}

function checkEmail(email) {
  var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!reg.test(email)) {
    return false;
  }
}


module.exports = {
  formatTime: formatTime,
  getAuth: getAuth,
  wxPromisify: wxPromisify,
  unique: unique,
  formatTimeTwo: formatTimeTwo,
  drawText: drawText,
  checkPhone,
  checkEmail,
  circleImg
}
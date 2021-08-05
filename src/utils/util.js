/*
 * 工具类
 */

let util = {};

/*
* 日期格式化
  @param  date: Date()对象
          fmt: 'yyyy-MM-dd' ,'MM-dd'等格式
  @return
*/
util.formatDate = (date, fmt) => {
  fmt = fmt ? fmt : "yyyy/MM/dd hh:mm:ss";
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds() //秒
    // "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    // "S": this.getMilliseconds() //毫秒
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

/**
 *  判断传入参数的类型，以字符串的形式返回
 *  @obj：数据
 **/
util.dataType = function(obj) {
  if (obj === null) return "Null";
  if (obj === undefined) return "Undefined";
  return Object.prototype.toString.call(obj).slice(8, -1);
};

/**
 * 处理对象参数值，排除对象参数值为''、null、undefined，并返回一个新对象
 **/
util.dealObjectValue = function(obj) {
  let param = {};
  if (obj === null || obj === undefined || obj === "") return param;
  for (let key in obj) {
    if (util.dataType(obj[key]) === "Object") {
      param[key] = util.dealObjectValue(obj[key]);
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      param[key] = obj[key];
    }
  }
  return param;
};

/*
 * 随机生成32位的UUID
 */
util.uuid = () => {
  //随机生成4位的16进制数
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
};

/**
 * 数组或对象的深拷贝
 * @param {*} data
 */
util.deepClone = data => {
  // 判断数据类型
  function getType(data) {
    if (Object.prototype.toString.call(data) === "[object Array]") {
      return "array";
    } else if (Object.prototype.toString.call(data) === "[object Object]") {
      return "object";
    } else {
      return "others";
    }
  }

  var type = getType(data);
  // console.log("type: ", type);

  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    //不再具有下一层
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(util.deepClone(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      obj[key] = util.deepClone(data[key]);
    }
  }

  return obj;
};

/**
 * 判断是否为手机访问
 */
util.isMobile = function() {
  let userAgentInfo = navigator.userAgent;

  let mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

  let mobileFlag = false;

  //根据userAgent判断是否是手机
  for (let v = 0; v < mobileAgents.length; v++) {
    if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
      mobileFlag = true;
      break;
    }
  }
  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;

  //根据屏幕分辨率判断是否是手机
  if (screenWidth < 500 && screenHeight < 800) {
    mobileFlag = true;
  }

  return mobileFlag;
};

export default util;

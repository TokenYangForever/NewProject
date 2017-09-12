function stopScroll() {
    $("body").on("touchmove", function (a) {
        a.preventDefault();
    });
    $("html").css({'overflow':'hidden'});
}
function startScroll() {
    $("body").off("touchmove");
    $("html").css({'overflow':'auto'});
}
/**
 * 获得url中的queryString OBJ
 */
function getRequest() {
    var searchString = window.location.search.substring(1),
        params = searchString.split("&"),
        hash = {};
    if (searchString == "") return {};
    for (var i = 0; i < params.length; i++) {
        var pos = params[i].indexOf('=');
        if (pos == -1) { continue; }
        var paraName = params[i].substring(0, pos),
            paraValue = params[i].substring(pos + 1);
        hash[paraName] = paraValue;
    }
    return hash;
}
//获取客户端类型
var envi = {
        hasTouch: 'ontouchstart' in window,
        isAndroid: false,
        isIOS: false,
        isIPhone: false,
        isIPad: false,
        isPC: false,
        isInWeixin: false,
        isInQQ: false,
        deviceType: null,
        deviceModel: null,
        osVersion: null,
        //获取网络类型
        getNetType: function () {
            if (navigator.connection) return navigator.connection.type;
            return 0;
        },
        //获取客户端类型 ios android等
        init: function () {
            var av = window.navigator.appVersion;
            if (/Android /.test(av)) this.isAndroid = true;
            else if (/iPhone;/.test(av)) this.isIPhone = true;
            else if (/iPad;/.test(av)) this.isIPad = true;
            else this.isPC = true;
            if (/MicroMessenger/.test(av)) this.isInWeixin = true;
            else if (/MQQBrowser/.test(av)) this.isInQQ = true;
            this.deviceType = this.isAndroid ? "Android" : (this.isIPhone ? "iPhone" : (this.isIPad ? "iPad" : "Other"));
            if (this.isAndroid) this.osVersion = /Android (\d+[^;]+)?;/.exec(av)[1], this.deviceModel = /; ([^;\)]+)\)/.exec(av)[1];
            else if (this.isIPhone || this.isIPad) this.osVersion = / OS (\d+[^ ]+)? /.exec(av)[1].replace(/_/g, '.');

            this.isIOS = /Mac OS X/.test(av);
        },
    }
envi.init();
/**
 * 获取移动终端浏览器版本信息
 */
var browser = {
    versions: function () {
        var u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
(function (S) {
    S.prototype.tTrim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
    S.prototype.tstartWith = function (s) {  
        return this.indexOf(s) == 0  
    }  
    S.prototype.tEndWiths = function (str) {
        return this.lastIndexOf(str) == this.length - str.length&&(this.length - str.length)>0;
    };
    S.prototype.tGetByteLength = function () {
        return this.replace(/[\u4e00-\u9fa5]+/g,"**").length;
    };
    S.prototype.treplaceAll = function (s1, s2) {  
        return this.replace(new RegExp(s1, "g"), s2)  
    }  
})(String);
  /**
   * 计算两个日期时间的时间差
   * @param {Date, Date}  date1 date2
   * @return {object | null} 
   * @example
   * getDiff(new Date('2017-09-08'), new Date())
   */
function getDiff(date1, date2) {
     if (!date1.getTime || !date2.getTime) return null
     var ms = (date1.getTime() - date2.getTime());
     var day1 = Math.round(ms / 24 / 3600 / 1000),
         hh1 = Math.round((ms / 3600 / 1000) % 24),
         mm1 = Math.round((ms / 1000 / 60) % 60),
         ss1 = Math.round((ms / 1000) % 60);
     return {
         day: day1,
         hour: hh1,
         minute: mm1,
         second: ss1
      };
}
function setTitle(title) {
            document.title = title;
            if (envi.isIOS) {
                //兼容ios微信中无法修改document.title的情况
                var ifr = $('<iframe src="/favicon.ico"></iframe>');
                ifr.on('load', function () {
                    setTimeout(function () {
                        ifr.off('load').remove();
                    }, 0);
                }).appendTo($('body'));
            }
}
//根据滚动更新进度条
(function() {
      var $w = $(window);
      var $prog2 = $('.progress-indicator-2');
      var wh = $w.height();
      var h = $('body').height();
      var sHeight = h - wh;
      $w.on('scroll', function() {
        window.requestAnimationFrame(function(){
          var perc = Math.max(0, Math.min(1, $w.scrollTop() / sHeight));
          updateProgress(perc);
        });
      });

      function updateProgress(perc) {
        $prog2.css({width: perc * 100 + '%'});
        ditto.save_progress && store.set('page-progress', perc);
      }

    }());
  /**
   * 将canvas转化为image格式
   * @param {string}  cId
   * @return {object HTMLImageElement} 
   * @example
   * canvasToImg('canvas')  canvasToImg('#canvarsId')
   */
function canvasToImg(cId){
    let canvas = document.querySelector(cId)
    if (!canvas || !canvas.toDataURL) return new Image()
    let imgData = canvas.toDataURL('image/png'),
        imgs= new Image();
        imgs.src=imgData;
    return imgs
}

Date.prototype.format = function(b) {
    var c = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds(),
        "w+": Date.getWeek(this.getDay())
    };
    if (/(y+)/.test(b)) {
        b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var a in c) {
        if (new RegExp("(" + a + ")").test(b)) {
            b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length))
        }
    }
    return b
}
Date.getWeek = function(a) {
    this.aWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return this.aWeek[a]
}
  /**
   * 生成一个唯一的guid
   * @return {string}
   * @example
   * // 7f603b20-17ff-4f47-aeb9-e7996de04939
   * util.guid();
   * @see http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */
  function guid () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
let jsLimit

  function loadScript (url, success, error) {
    if (Lizard.isHybrid) {
      return
    }

    if (!jsLimit) {
      jsLimit = new Set()
    }

    if (jsLimit.has(url)) {
      return;
    }

    jsLimit.add(url);

    var node = document.createElement('script');
    node.addEventListener('load', success, false);
    node.addEventListener('error', function() {
      node.parentNode.removeChild(node);
      jsLimit.delete(url);
      if (error) {
        error();
      }
    }, false);

    if (url.includes('lechebang')) {
      node.crossOrigin = 'anonymous';
    }
    
    
    node.src = url;

    document.querySelector('head').appendChild(node);

    return node;
  }
  function pick (obj, keys) {
    let result = {}

    if (!obj) {
      return result
    }

    keys.forEach((item) => {
      if (obj.hasOwnProperty(item)) {
        result[item] = obj[item]
      }
    })

    return result
  }
  function getCurrentYear () {
    var now = new Date(Date.now());

    return now.getFullYear();
  }

  function isLeapYear (year) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      }
    } else if (year % 4 === 0) {
      return true;
    }
    return false;
  }

  function getDaysInMonth (year, month) {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }
  /**
   * 深度clone
   * @example
   * util.noopPromise()
   */
  function cloneDeep (obj) {
    if (!_.isObject(obj)) return obj;

    let result

    if (Array.isArray(obj)) {
      result = []

      obj.forEach((item) => {
        result.push(cloneDeep(item))
      })
      return result
    }

    result = {}

    for (let key in obj) {
      let item = obj[key]
      
      if (_.isObject(item)) {
        result[key] = cloneDeep(item)
      } else {
        result[key] = item
      }
    }

    return result
  }

  /**
   * 获取两个高德坐标的距离, 后一个点，不传，默认为用户坐标
   * @return {null|number} 距离多少米，没有定位信息，返回null
   * @example
   * util.getDistance(31.282055633974, 121.379623888259)
   * util.getDistance(latGd, lonGd)
   */
  function getDistance (endLat, endLon, startLat, startLon) {
    if (!startLat) {
      let address = Lizard.state.address

      if (address && address.lat) {
        startLat = address.lat
        startLon = address.lon
      }
    }

    // 没有定位
    if (!startLat) {
      return null
    }

    const PI = Math.PI
    let lon1 = (PI / 180) * startLon
    let lon2 = (PI / 180) * endLon 
    let lat1 = (PI / 180) * startLat  
    let lat2 = (PI / 180) * endLat 
    // 地球半径  
    let R = 6378.137;  

    // 两点间距离 km，如果想要米的话，结果*1000就可以了  
    let d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * R;  

    return parseInt(d * 1000, 10)
  }
  /**
   * 追加url参数
   * @param {string} url url参数
   * @param {string|object} key 名字或者对象
   * @param {string} value 值
   * @return {string} 返回新的url
   * @example
   * util.appendQuery('lechebang.com', 'id', 3);
   * util.appendQuery('lechebang.com?key=value', { cityId:2,cityName: '北京'});
   */
  function appendQuery (url, key, value) {
    var options = key;

    if (typeof options == 'string') {
      options = {};
      options[key] = value;
    }

    options = $.param(options);

    if (url.includes('?')) {
      url += '&' + options
    } else {
      url += '?' + options
    }

    return url;
  }
  function deleteKey (obj, arr) {
    arr.forEach(function(item) {
      delete obj[item];
    });

    return obj
  }
  function loadImg (url) {
    return new Promise((resolve, reject) => {
      let img = new Image()

      img.addEventListener('load', function() {
        resolve([img.width, img.height])
      }, false)

      img.addEventListener('error', reject, false)

      img.src = url
    })
  }
  const repeat = (str, n) => {
    let res = ''
    while (n) {
      if (n % 2 === 1) res += str
      if (n > 1) str += str
      n >>= 1
    }
    return res
  }
/**
 * Parse simple path.
 */
const bailRE = /[^\w.$]/
export function parsePath (path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
/**
 * Check if a string starts with $ or _
 */
export function isReserved (str: string): boolean {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to: Object, from: ?Object): Object {
  if (!from) return to
  let key, toVal, fromVal
  const keys = Object.keys(from)
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal)
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

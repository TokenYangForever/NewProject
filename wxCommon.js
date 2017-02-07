Zepto.cookie = function (h, m, j) {
    if (typeof m != "undefined") {
        j = j || {};
        if (m === null) {
            m = "";
            j.expires = -1
        }
        var f = "";
        if (j.expires && (typeof j.expires == "number" || j.expires.toUTCString)) {
            var d;
            if (typeof j.expires == "number") {
                d = new Date();
                d.setTime(d.getTime() + (j.expires * 24 * 60 * 60 * 1000))
            } else {
                d = j.expires
            }
            f = "; expires=" + d.toUTCString()
        }
        var k = j.path ? "; path=" + j.path : "";
        var e = j.domain ? "; domain=" + j.domain : "";
        var l = j.secure ? "; secure" : "";
        document.cookie = [h, "=", encodeURIComponent(m), f, k, e, l].join("")
    } else {
        var c = null;
        if (document.cookie && document.cookie != "") {
            var b = document.cookie.split(";");
            for (var g = 0; g < b.length; g++) {
                var a = Zepto.trim(b[g]);
                if (a.substring(0, h.length + 1) == (h + "=")) {
                    c = decodeURIComponent(a.substring(h.length + 1));
                    break
                }
            }
        }
        return c
    }
};
/**
 * storage操作
 * SetStorage方法：设置存储storage的key和value值，如果storage存储失败，则将数据存储在cookie中
 * GetStorage方法：根据key值获取storage相对应的value值，获取失败则从cookie中获取，
 */
var StorageHelp = {
    SetStorage: function (e, g) {
        if (window.localStorage) {
            var h = window.localStorage;
            try {
                h.setItem(e, g)
            } catch (f) {
                $.cookie(e, g, { expires: 30 })
            }
        } else {
            $.cookie(e, g, { expires: 30 })
        }
    }, 
    GetStorage: function (d) {
        if (window.localStorage) {
            var f = window.localStorage;
            try {
                f = f.getItem(d);
                if (f == null || f == "") {
                    return $.cookie(d) == null ? "" : $.cookie(d)
                } else {
                    return f
                }
            } catch (e) {
                return $.cookie(d) == null ? "" : $.cookie(d)
            }
        } else {
            return $.cookie(d) == null ? "" : $.cookie(d)
        }
    },
    SetSessionStorage: function(e,g){
        if (window.sessionStorage) {
            var h = window.sessionStorage;
            try {
                h.setItem(e, g)
            } catch (f) {
                $.cookie(e, g, { expires: 30 })
            }
        } else {
            $.cookie(e, g, { expires: 30 })
        }
    },
    GetSessionStorage: function(d){
        if (window.sessionStorage) {
            var f = window.sessionStorage;
            try {
                f = f.getItem(d);
                if (f == null || f == "") {
                    return $.cookie(d) == null ? "" : $.cookie(d)
                } else {
                    return f
                }
            } catch (e) {
                return $.cookie(d) == null ? "" : $.cookie(d)
            }
        } else {
            return $.cookie(d) == null ? "" : $.cookie(d)
        }
    },
    ClearSessionStorage:function(arr){
        if(!(arr instanceof Array)){
            arr = ["defaultArrToClear"];
        }
        if (window.sessionStorage) {
            try{
                for(var i=0;i<arr.length;i++){
                    sessionStorage.removeItem(arr[i]);
                }
            }catch(e){
                for(var i=0;i<arr.length;i++){
                    $.cookie(arr[i], '', {expires:-1});
                }
            }
        }else{
            for(var i=0;i<arr.length;i++){
                $.cookie(arr[i], '', {expires:-1});
            }
        }
    }
};
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
        //isPC: false,
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
            //else this.isPC = true;
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
        var u = navigator.userAgent, app = navigator.appVersion;
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
// 计算两个时间戳之间的时间差返回相差的天数，小时数，分钟数，秒数
function getDiff(date1, date2) {
     var ms = (date1.getTime() - date2.getTime());
     var day1 = Math.floor(ms / 24 / 3600 / 1000),
         hh1 = Math.floor((ms / 3600 / 1000) % 24),
         mm1 = Math.floor((ms / 1000 / 60) % 60),
         ss1 = Math.floor((ms / 1000) % 60);
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

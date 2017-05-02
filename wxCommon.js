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
function canvasToImg(cId){
    var canvas = document.getElementsById(cId),
        imgData = canvas.toDataURL('image/png'),
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
function openCalendar(opts) {
    var dateForTips=(typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date();    

    var _tempDate = new Date(dateForTips.getFullYear(), dateForTips.getMonth(),dateForTips.getDate() + 59);

    var _tempfutureDate=new Date(_tempDate.getTime()+6 * 24 * 3600 * 1000);
    var monthEnd=(_tempDate.getMonth() + 1);
    var dayEnd=_tempDate.getDate();
    var futureMothEnd=(_tempfutureDate.getMonth() + 1);
    var futureDayEnd=_tempfutureDate.getDate();
    var isChangeOrder=getRequest().isChangeOrder==1?true:false;
    var type="";
    var tipsText="";
    type=isChangeOrder?"":"抢";
    //判断12月30日前后
    var judgeDate = new Date("2016/12/30").getTime();
    var nowDate = new Date().getTime();
    if(nowDate>=judgeDate){
        monthEnd = new Date(nowDate+29*24*60*60*1000).getMonth()+1;
        dayEnd = new Date(nowDate+29*24*60*60*1000).getDate();
        futureMothEnd = new Date(nowDate+75*24*60*60*1000).getMonth()+1;
        futureDayEnd = new Date(nowDate+75*24*60*60*1000).getDate();
    }else{
        monthEnd = new Date(nowDate+59*24*60*60*1000).getMonth()+1;
        dayEnd = new Date(nowDate+59*24*60*60*1000).getDate();
        futureMothEnd = new Date(nowDate+75*24*60*60*1000).getMonth()+1;
        futureDayEnd = new Date(nowDate+75*24*60*60*1000).getDate();
    }
    tipsText=isChangeOrder?"":"<br />可提前预约"+futureMothEnd+"月"+futureDayEnd+"日前的火车票，开售自动为您抢票</p>";
    var calendar=new Calendar({
        tips:{
            //text:"<p class='buyDate'>今天是{$month}月{$day}号，可购买"+monthEnd+"月"+dayEnd+"日的火车票"+tipsText
            text:"<p class = 'buyDate'>因铁路局列车运行图调整，火车票预售期调整为30天，建议您提前预约抢票，开售自动抢票。</p>"
        },
        type: type,
        count: opts.count || 4,
        days: opts.days || 59,
        dely: 250,
        date: opts.todayDate || ((typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date()),
        select: opts.select,
        range: opts.range || [],
        onCreate: function (dom) {
            new List({
                floatContainer: document.querySelector(".float-header"),
                Scroll: (function () {
                    var listeners = [];
                    var top;
                    var scroll = new iScroll("calendars", {
                        onScrollMove: function (e) {
                            top = -this.y;
                            listeners.forEach(function (fn) {
                                fn.call(window);
                            });
                        },
                        onScrollEnd: function () {
                            if (document.querySelector(".float-header")) {
                                document.querySelector(".float-header").style.opacity = 1;
                            }
                        }
                    });
                    return {
                        onscroll: function (fn) {
                            listeners.push(fn);
                        },
                        getScrollTop: function () {
                            return top;
                        },
                        getOffsetTop: function (target) {
                            return target.offsetTop;
                        }
                    }
                })(),
                targets: document.querySelectorAll(".calendars-wrapper h3")
            });
            function setHoliday(dataStr){
                if ($($(dom).find("a")[i]).attr('data-day') == dataStr) {
                    $($(dom).find("a")[i]).find("div:first-child").html('<div class="tag_rest"><span class="tag_content">假</span></div>'+zj.date.parse(dataStr).getDate());
                }
            }
            // 对部分法定假日提前放假的情况 调整
            for (var i = 0; i < $(dom).find("a").length; i++) {
                setHoliday("2016-4-30");
                setHoliday("2016-4-2");
                setHoliday("2016-4-3");
            }
            if (opts.onCreate) opts.onCreate();
        },
        canChange: function (date, el) {
            if ($(el).find('div').hasClass('disabled') || $(el).attr('data-day') == (null || "")) {
                /* 给可售期后的添加事件 */
                var p = $(el).attr('data-day');
                var policydate = new Date(zj.date.parse(p).setDate(zj.date.parse(p).getDate() - 59));
                var todayDate = (typeof SERVERTIME !== "undefined") ? new Date(SERVERTIME) : new Date();
                var appointDate=new Date((new Date(date.replace(/-/g, "/"))).getTime()-64*24*3600*1000);
                if (policydate.getTime() > todayDate.getTime()) {
                    var subMsg="您可在"+appointDate.format('yyyy年MM月dd日')+"提前预约抢票。";
                    if(isChangeOrder){
                        subMsg="";
                    }
                    mobileUtil.dialog("预售期为60天，您所选日期将在" + policydate.format('yyyy年MM月dd日') + "开售。"+subMsg, "body");
                }
                return false;
            }
            $(el).parent().parent().parent().find('a').find('div').removeClass('nian_select');
            return true;
        },
        onChange: function (value) {
            if (opts.onChange) opts.onChange(value);
        }
    });
}

openCalendar({
                    count: 4,
                    days: 69,
                    select: $("#Time").val(),
                    onChange: function(value) {
                        value = zj.date.parse(value).format("yyyy-MM-dd");
                        $("#Time").val(value);
                        StorageHelp.SetStorage("bDate", value);
                        var dates = zj.date.parse(value);
                        $("#tselect_Date").html("<span class=\"orange\">" + (dates.getMonth() + 1) + "月" + (dates.getDate()) + "日</span>");
                        //日期选择未变车次坐席不变
                        if(preTime!=StorageHelp.GetStorage("bDate")){
                            //日期选择和车站选择dom样式改变
                            domDisplay();
                        } 
                    }
                });

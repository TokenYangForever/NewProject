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
            arr=["OrderPage_12306PassengerList","OrderPage_PassengerList","OrderPage_HotelGiftVoucher","OrderPage_InsuranceIndex","OrderPage_SeatType","OrderPage_ProcessTimeIndex","OrderPage_VoucherIndex","OrderPage_AcceptSeat","searchKey"];
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

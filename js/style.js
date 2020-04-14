(function(d,c){var e=d.documentElement,a="orientationchange" in window?"orientationchange":"resize",b=function(){var g=e.clientWidth;var f=e.clientHeight;if(!g){return}if(g>=320&&g<=750){e.style.fontSize=g/7.5+"px"}else{if(g<320){e.style.fontSize=320/7.5+"px"}else{if(g>750){e.style.fontSize=750/7.5+"px"}}}};if(!d.addEventListener){return}c.addEventListener(a,b,false);d.addEventListener("DOMContentLoaded",b,false)})(document,window);

var shareData = {
    appid: 'wx6efefb50b46a6d1f',
    title: '',
    desc: '',
    link: '',
    imgUrl: '',
    success: function (res) {
    },
    cancel: function (res) {
    }
}, wxhideOptionMenu = 1;

var tmTimer = null, tmTag = true, tmNum = 60;
var appPara = {
    appid: 'wx6efefb50b46a6d1f',
    openid: null,
    mwurl: 'https://www.tonggangfw.com/',
    form_id: null,
    token: null,
    uid: null,
    nkname: null,
    realname: null,
    loginToken: null,
    phone: null,
    status: null,
    wximg:null,
    userid:128990,
    txje:null,
};

var bgm_flag = true;
var GJ = window.GJ || {};
GJ = {
    // 初始化
    init: function (){
        "use strict";
        // 微信授权
        if (typeof(wxUserInfo)!=='undefined'){
            if(wxUserInfo.openid!=='undefined'||wxUserInfo.openid!==""||wxUserInfo.openid!==null){
                appPara.openid = wxUserInfo.openid;
                appPara.wximg = wxUserInfo.headimgurl;
                appPara.nkname = wxUserInfo.nickname;
                appPara.loginToken = wxUserInfo.loginToken;
                console.log(wxUserInfo);
				// 获取当前页面名称
				appPara.pgname = $.trim(GJ.pageName());
				if (!appPara.pgname || appPara.pgname === "") {
					appPara.pgname = "index";
				} else {
					var pgn = (appPara.pgname).split("?v");
					if (pgn[1]) {
						appPara.pgname = "index";
					}
				}
				GJ.plugin();
            }
        } else {
            //window.location.reload();
        }

    },
    // 存入缓存
    set_cache:function (key,value) {
    if(key=='') return false;
    localStorage.setItem(key, value);
    },
    // 取缓存
    get_cache:function(key){
    return localStorage.getItem(key);
    },
    // 取当前页面名称(不带后缀名)
    pageName: function () {
        "use strict";
        var a = location.href;
        var b = a.split("/");
        var c = b.slice(b.length - 1, b.length).toString(String).split(".");
        return c.slice(0, 1);
    },
    // 获取url中的参数，可以是中文参数
    getUrlString: function (key) {
        "use strict";
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 隐藏消息框
    loadHide: function () {
        "use strict";
        $("#commonUILoading").hide();
    },
    // 显示消息框
    loadShow: function () {
        "use strict";
        $("#commonUILoading").show();
    },
    // 消息框
    msg: function (str, nstr) {
        "use strict";
        // $(".alertTop p").html(str);
        $(".tcce div").text(str);
        if(str){
            $(".tcce").show();
        }
        if(nstr){
            setTimeout(function () {
                $(".tcce").hide();
            }, nstr);
        }
        if(nstr==="tanqx"){
            $("#commonUIAlert1").show();
        }else{
            $("#commonUIAlert").show();
        }
        if (nstr) {
            $(".alertButton").attr('data-str', nstr);
        } else {
            $(".alertButton").attr('data-str', 'null');
        }
    },
    // 退出微信
    shutDown: function () {
        "use strict";
        WeixinJSBridge.call('closeWindow');
    },
    // 微信分享js
    printWxlink: function () {
        "use strict";
        var wxhm = document.createElement("script");
        wxhm.src = "http://open.aboutnew.net/api/weixin/jssdk/wx.mini.js?2018";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(wxhm, s);
    },
    // 加载弹框
    plugin: function () {
        "use strict";
        var load_str = '<!-- 加载 --><div id="commonUILoading" class="commonUI_loading_mask" style="display:none;"><div class="commonUI_loading"><div class="commonUI_loadingPic"></div><div class="commonUI_loadingText">加载中...</div></div></div><!-- /加载 -->',
            box_str = '<!-- 弹框 --><div id="commonUIAlert" class="commonUI_mask" style="display:none;"><div class="commonUI_alert"><div class="commonUI_alertTitle"><p>温馨提示</p></div><div class="commonUI_alertTop alertTop"><p></p></div><div class="commonUI_alertBottom"><button class="commonUI_alertButton alertButton" data-btn="OK" data-str="" style="display:inline-block;">知道了</button></div></div></div><!-- /弹框 -->',
            box_qxdd='<!-- 取消确定弹窗 --><div id="commonUIAlert1" class="commonUI_mask" style="display:none;"><div class="commonUI_alert"><div class="commonUI_alertTitle"><p>温馨提示</p></div><div class="commonUI_alertTop alertTop"><p></p></div><div class="commonUI_alertBottom"><button class="commonUI_alertButton alertButton1" data-btn="OK" data-str="cancel" style="display:inline-block;">取消</button><button class="commonUI_alertButton alertButton1" data-btn="OK" data-str="Determine" style="display:inline-block;">确定</button></div></div></div><!-- 取消确定弹窗 -->';
          let tishi_str=`<!--    提示弹出框--><div class="tcce" style="display: none"><div></div></div>`;
        // $("body").append(load_str + box_str+box_qxdd);
            $("body").append(tishi_str+load_str);
        setTimeout(function () {
            // 点击弹框按钮操作
            $(".alertButton").bind('click', function () {
                $("#commonUIAlert").hide();
                var str = $(this).attr('data-str');
                if (str === "reload") {
                    window.location.reload();
                } else if (str === 'shutdown') {
                    GJ.shutDown();
                }
            });

        }, 500);
        if (appPara.pgname === "center") {
            $('#userinfo img').attr('src', appPara.wximg);
            $('#nkname').html(appPara.nkname);
        }
    },
    // 验证手机号
    regPhone: function (phone) {
        "use strict";
        var regphone = new RegExp(/^((1[0-9][0-9]{1})+\d{8})$/);
        return regphone.test(phone);
    },
    // 生成随机字符串
    getFormid: function () {
        "use strict";
        var MathNum = "";
        for (var i = 0; i < 6; i++) {
            MathNum += Math.floor(Math.random() * 10);
        }
        var myDate = new Date();
        var mm = myDate.getMonth() + 1;
        var dd = myDate.getDate();
        var form_id = myDate.getFullYear().toString() + (mm > 10 ? mm.toString() : '0' + mm).toString() + (dd > 10 ? dd.toString() : '0' + dd).toString() + myDate.getTime() + MathNum;
        return form_id;
    },
    // 获取当前日期
    getNowTime: function () {
        "use strict";
        var date = new Date();
        var today = null,
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hh = date.getHours(),
            mm = date.getMinutes(),
            ss = date.getSeconds();
        if (month < 10) {
            month = '0' + (date.getMonth() + 1);
        }
        if (day < 10) {
            day = '0' + date.getDate();
        }
        if (hh < 10) {
            hh = '0' + date.getHours();
        }
        if (mm < 10) {
            mm = '0' + date.getMinutes();
        }
        if (ss < 10) {
            ss = '0' + date.getSeconds();
        }
        today = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss;
        return today;
    },
    // 上拉下拉动画
    shanglXia:function (data,top) {
        // console.log(data);
        let height='';
        var startX, startY, moveEndX, moveEndY, X, Y;
        $(`.${data}`).on("touchstart", function(e) {
            // e.preventDefault();
            startX = e.originalEvent.changedTouches[0].pageX;
            startY = e.originalEvent.changedTouches[0].pageY;
        });

        $(`.${data}`).on("touchend", function(e) {
            // e.preventDefault();
            height=$(`.${data}`).outerHeight();
                moveEndX = e.originalEvent.changedTouches[0].pageX;
                moveEndY = e.originalEvent.changedTouches[0].pageY;
                X = moveEndX - startX;
                Y = moveEndY - startY;
            if ( Math.abs(Y) > Math.abs(X) && Y > 50) {
                // console.log("下滑动");
                $(`.${data}`).animate({bottom:-(Number(height)-top)},400)
            }else if ( Math.abs(Y) > Math.abs(X) && Y < -30 ) {
                // console.log("上滑动");
                $(`.${data}`).animate({bottom:0},400)
            }
        });
    },
    // 当页面加载状态改变的时候执行function
};
GJ.loadShow();
setTimeout(function () {
	GJ.plugin();
}, 300);






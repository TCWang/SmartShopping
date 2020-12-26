var wishlistadd = 'F';
function get_cookie(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen){
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg){
			offset=j;
			var endstr = document.cookie.indexOf (";", offset);
			if (endstr == -1) endstr = document.cookie.length;
				return unescape (document.cookie.substring(offset, endstr));
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

//可訂購通知我
function wishlist(item){
    var now=new Date();
    var sec  = now.getTime().toString();
    if(wishlistadd=="F"){
    $.ajax({ url: "/exep/prod/itemtracker_new.php?item="+item+"&sec="+sec,type:"get", dataType:"html",
            success:function(msg){
                if(window.B && B.alert) {
                     B.alert(msg);
                } else {    //PC版
                    $("#wishlist").html(msg);
                    wishlistadd="T";
                }
            }
        });
    }
}

function CheckMemberLogin_page(itemurl) {
    var u_id = get_cookie("cid");
    var u_passwd = get_cookie("pd");
    if (u_id != null && u_passwd != null){
            location.href = itemurl;
    }else{
            location.href = "https://cart.books.com.tw/member/login?url="+itemurl;
    }
}

function pursue_item(item,ttype,itemurl){
    var now=new Date();
    var sec  = now.getTime().toString();
    $.ajax({ url: "/exep/list/pursue_info.php?item="+item+"&tag_type="+ttype+"&sec="+sec,type:"get", dataType:"html",
            success:function(msg){
                var msgtmp = msg.split("、");
                if(window.B && B.alert) {
                    if(msgtmp[0]==0){
                        B.alert('商品已加入您的下次再買清單，您可至會員專區中查詢！！');
                    }else if(msgtmp[0]=='overm'){
                        B.alert('您的下次再買清單中的品項已超過500筆，請清除後再加入。');
                    }else if(msgtmp[0]=='nologin'){
                       //CheckMemberLogin_page(itemurl); //直接跳轉登入畫面
                       B.alert('<a class="bt_alert gray mod_l" href="https://cart.books.com.tw/member/login?url='+itemurl+'">請先登入會員。</a> <a class="bt_alert" href="https://cart.books.com.tw/member/join_step1">還不是會員?</a>');
                    }
                } else { //PC版
                    if(msgtmp[0]==0){
                        alert('商品已加入您的下次再買清單，您可至會員專區中查詢！！');
                    }else if(msgtmp[0]=='overm'){
                        alert('您的下次再買清單中的品項已超過500筆，請清除後再加入。');
                    }else if(msgtmp[0]=='nologin'){
                        CheckMemberLogin_page(itemurl);
                    }
                }
        }
    });
}

function freeget(item){
    $.ajax({
        url: '/receive_ebooks/get_book',
        async: false,
        data: {item:item},
        type: 'post',
        dataType: 'json',
        success: function(data){
            alert(data.message);
        },
        error: function (data, status, e){
            //alert(e);
            alert('領用失敗');
        }
    });
}

//免費領用JS
function freegetUnMultClick(item, device){
     document.getElementById("cartBuy").href="javascript:;"; 
     //location.href="http://www.books.com.tw/receive_ebooks/freeget_book/"+item;
    var freeget_pop_p1 = '<!--免費領用--><div class="overlay" id= "div_freeget_overlay" style="display:block"></div><div class="book-free-win" id="div_freeget_win" style="display:block"><div class="wrap"><div class="winscroll" id="div_freeget_msg">';
    var freeget_pop_p2 = '</div><!--fbar--><div class="fbar" id="div_freeget_fbar">';
    var freeget_pop_p3 = '</div></div></div><!--end 免費領用-->';
    var freeget_pop_m1 = '<!--免費領用--><div class="overlay" id= "div_freeget_overlay" style="display:block;opacity:1 z-index:99999999" id="alert_0"><div class="alert_win aligner-box" id="div_freeget_win"><!--book-free-win--><div class="book-free-win"><div class="winscroll" id="div_freeget_msg">';
    var freeget_pop_m2 = '</div><div class="button_wrap clearfix" id="div_freeget_fbar">';
    var freeget_pop_m3 = '</div></div><!--End book-free-win--></div></div><!--end 免費領用-->';
    var buttontext;
    var msgfeedback;
    var hideJS = "javascript:hideFreegetWin('"+item+"','"+device+"')";
    var str_login = '登入';
    var str_wait = '稍後再領';
    var str_gotoshelf = '前往電子書櫃';
    var str_website = '繼續瀏覽網站';
    var str_close = '關閉';

    //因搜尋頁亦需免費領用按鈕，故用跨域呼叫jsonp
    $.ajax({ url: "//www.books.com.tw/receive_ebooks/freeget_book",type:"get", dataType:"jsonp", jsonp: "item",jsonpCallback:item,
        success:function(msg){
            if (msg.code === '102') { //未登入
                var url = 'https://cart.books.com.tw/member/login?url='+encodeURIComponent('//www.books.com.tw/products/'+item);
                msgfeedback = '<p>'+msg.message+'</p>';
                if (device === 'M') {
                    buttontext = '<a href="'+url+'" class="button">'+str_login+'</a><a href="'+hideJS+'" class="button">'+str_wait+'</a>';
                    $("body").prepend(freeget_pop_m1 + msgfeedback + freeget_pop_m2 + buttontext + freeget_pop_m3);
                } else {
                   buttontext = '<a href="'+url+'"><strong class="btn">'+str_login+'</strong></a><a href="'+hideJS+'"><strong class="btn">'+str_wait+'</strong></a>';
                   $("body").prepend(freeget_pop_p1 + msgfeedback + freeget_pop_p2 + buttontext + freeget_pop_p3);
                }
            } else if (msg.code === '000') { //領用成功
                //feedback message like 'c_title領用完成'
                var url = 'https://viewer-ebook.books.com.tw/viewer/index.html?readlist=all&MemberLogout=true';
                msgfeedback = '<p><i class="icon-ok-1"></i>'+msg.message+'</p>';
                if (device === 'M') {
                    buttontext = '<a href="'+url+'" class="button">'+str_gotoshelf+'</a><a href="'+hideJS+'" class="button">'+str_website+'</a>';
                    $("body").prepend(freeget_pop_m1 + msgfeedback + freeget_pop_m2 + buttontext + freeget_pop_m3);
                } else {
                   buttontext = '<a href="'+url+'"><strong class="btn">'+str_gotoshelf+'</strong></a><a href="'+hideJS+'"><strong class="btn">'+str_website+'</strong></a>';
                   $("body").prepend(freeget_pop_p1 + msgfeedback + freeget_pop_p2 + buttontext + freeget_pop_p3);
                }
            } else {
                msgfeedback = '<p>'+msg.message+'</p>';
                if (device === 'M') { 
                    buttontext = '<a href="'+hideJS+'" class="button">'+str_close+'</a>';
                    $("body").prepend(freeget_pop_m1 + msgfeedback + freeget_pop_m2 + buttontext + freeget_pop_m3);
                } else {
                    buttontext = '<a href="'+hideJS+'"><strong class="btn">'+str_close+'</strong></a>';
                    $("body").prepend(freeget_pop_p1 + msgfeedback + freeget_pop_p2 + buttontext + freeget_pop_p3);
                
                }
            }
        },
        error: function(xhr, ajaxOptions, thrownError){
            msgfeedback = '<p>免費商品領取未成功，請稍後再試或洽客服</p>';
            if (device === 'M') { 
                buttontext = '<a href="'+hideJS+'" class="button">'+str_close+'</a>';
                $("body").prepend(freeget_pop_m1 + msgfeedback + freeget_pop_m2 + buttontext + freeget_pop_m3);
            } else {
                buttontext = '<a href="'+hideJS+'"><strong class="btn">'+str_close+'</strong></a>';
                $("body").prepend(freeget_pop_p1 + msgfeedback + freeget_pop_p2 + buttontext + freeget_pop_p3);
            }
        }
    });
}

function hideFreegetWin(item, device){
    document.getElementById("cartBuy").href="javascript:freegetUnMultClick('"+item+"','"+device+"')"; 
    $('#div_freeget_overlay').hide();
    $('#div_freeget_win').hide();
}

// 相片沖印：是否為快找APP瀏覽器，是則跳alert建議使用原生瀏覽器
function editPrint(gainhow, isInApp){
    if (isInApp) {
        alert('為了提供您更好的編輯服務體驗，建議您使用電腦網頁，或手機瀏覽器編輯。謝謝您的配合。');
    } else {
        location.href = gainhow;
    }
}
$( document ).ready(function() {
    
    var header_id = $("#header_id").attr("data-attr");
    var trigger = $('.books_nav');
    if(header_id != 'home'){
        $("#home_menu_list").hide();
        $("#home,#home_menu_list,#flagship_menu_list").mouseenter(function(e){
            clearTimeout($(trigger).data('close_pop'));
                $(trigger).data('open_pop',setTimeout(function(){
                $('#home_menu_list').show();
                if(!$('#flagship').hasClass('here')){
                    $('#home').addClass('here');
                }else{
                    $('#flagship').addClass('here');
                }
            },100));
        });
        $(".books_nav").mouseleave(function(e){
            clearTimeout($(trigger).data('open_pop'));
            $(trigger).data('close_pop',setTimeout(function(){
                $('#home').removeClass('here');
                $('#flagship').removeClass('here');
                $('#home_menu_list').hide();
                $('#flagship_menu_list').hide();
                $('.type04_header .books_nav .menu li').find('.nav_popup').hide();
            },500));
        });
    }

    $("#search input").keypress(function(event){
        var key = $('#key').val();
        var msg = $('#key').attr("message");
        if (event.keyCode == 13 && $('#key').val() != ''){
            $("#search" ).submit();
        }else if(event.keyCode == 13 && $('#key').val() === ''){
             alert(msg);
             event.preventDefault();
        }
    });

    //頂天banner顯示
    HtopBanner(header_id);
    //語系顯示
    $('#header_a_lang_title').text(get_lang_title(getCookie("lang")));

    //取得小購物車的筆數
    if(header_id != 'simple' && header_id != 'group_cart' && header_id != 'group' && header_id != 'groupfull'){
        HshoppingCartNum();
    }

    $("#search_box").hover(function(){
        $(".search_popup").show();
    },function(){
        $(".search_popup").hide();
    });

    $(".search_popup a").click(function(){
        $("#cat").val($(this).attr('cat'));
        $("#query_type").val($(this).attr('cat'));
        $("#search_name").text($(this).text());
        $(".search_popup").hide();
    });

	
	var bday = getCookie("bday");
	if(bday != ''){ 
		$(".pop_tip_box").mouseenter(function(e){
			clearTimeout($(this).data('close_pop'));
			$(this).data('open_pop',setTimeout(function(){
				$('.pop_tip').show();
			},100));
		});
		$(".pop_tip_box").mouseleave(function(e){
			clearTimeout($(this).data('open_pop'));
			$(this).data('close_pop',setTimeout(function(){
				$('.pop_tip').hide();
			},500));
		});
        $("li.li_label_member_logout").hide();
        $("li.li_label_member_login").show();
	}
	

    //全站分類
    //$(".type04_header .books_nav .menu:eq(0) li").hover(function(){
    $(".type04_header .books_nav .menu:not(.style03) li").hover(function(){
        var adv_id = $(this).find(".box_ban").attr("data-adv");
        var source = $(this).find(".box_ban").attr("data-source");
        if(adv_id != 0){
            adv_set(adv_id, source,"V");
        }

        /*dav*/
        var list = $(this),
            list_top = $(list).offset().top,
            first_item_top = $('div.books_nav div.nav_box:not(:hidden) li:eq(0)').offset().top,
            scroll_top = $(window).scrollTop(),
            cart_height = $('.header_box1 ul:first').height();
            show_lag = 200,
            fadeOut_time = 300,
            scroll_fix = (scroll_top > first_item_top)?
                (scroll_fix = -1* list_top + scroll_top+cart_height):(scroll_fix = -1* list_top + first_item_top);
        clearTimeout($(list).data('close_pop'));
        $(list)
            .data('open_pop',setTimeout(function(){
                var is_load = $(list).attr('is_load'),
                    now_tab = $('.books_nav .tabs .here'),
                    tab_order = $(now_tab).parent().children('li').index(now_tab),//所在tab(全站分類or旗艦店)
                    list_order = $(list).parent().children('li').index($(list)); //所在選單項目的index;
                if(!is_load){//未載入過選單的情況
                    HgenDOM({//產生選單內容並塞入pop框
                        tab:tab_order,
                        idx:list_order,
                        box:list
                    }).init();
                    $(list).attr('is_load','1');
                }
                var pop_menu = $(list).find('.nav_popup');
                $(pop_menu)
                    .show()
                    .css('top',function(){
                        if(-1*scroll_fix > $(pop_menu).height()){//修正(過短的選單)彈出位置
                            scroll_fix -= scroll_fix + $(pop_menu).height() - $(list).height();
                        }
                        return scroll_fix;
                    });
                $(list)
                    .addClass('here')
                    .siblings().removeClass('here').find('.nav_popup').fadeOut(fadeOut_time);
            },show_lag));
        /*end dav*/

    },function(){

        /*dav*/
        var list = $(this),
        hide_lag = 400,
        fadeOut_time = 300;
        clearTimeout($(list).data('open_pop'));
        $(list)
        .data('close_pop',setTimeout(function(){
                $(list)
                    .removeClass('here')
                    .children('div').fadeOut(fadeOut_time);
            },hide_lag)
        );
        /*end dav*/
    });


    //舊版登入
    var is_login = $(".sb_logout div a").text();
    var log_name = $("#li_for_log_in_out").attr("data-attr");
    if(is_login != "undefined" && is_login != ""){
        if(header_id == "group" || header_id == "group_cart" || header_id == 'groupfull'){
            $("#li_for_join_member").hide();
        }
        $(".sb_logout div a").text(log_name);
    }

    $("#search").submit(function(e) {
        var key = $('#key').val();
        var msg = $('#key').attr("message");
        if(key == ''){
            alert(msg);
            e.preventDefault();
        }
    });

    //小購物車position:fixed修正
    /*dav*/
	(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
    if($.browser.mobile){
        $('.header_box1').css({
            position:'absolute',
            '-webkit-overflow-scrolling':'touch'
        });
        $(window).scroll(function(){
            if($('.type04_header_full .full_box').length)
                $('.type04_header_full .full_box', '.header_box1').css('top',$(window).scrollTop());
            else if($('#header_full .fix_box').length)
                $('.header_box1').css('top',0); // myaccount
            else
                $('.header_box1').css('top',$(window).scrollTop());
        });
    }
    /*end dav*/
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        if($('.type04_header_full .full_box').length)
            $('.type04_header_full .full_box').css('padding-top','0');
        if($('#header_full .fix_box').length)
            $('#header_full .fix_box').css('padding-top','0');
        $('.type04_header').css('padding-top','0');
        $('.header_box1').css('position', 'relative');
    }
});

function show_lang_panel(){
    var lang = getCookie("lang");
    lang = check_lang(lang);
    $('li[id^=header_li_change_lang_]').removeClass('here');
    $('#header_li_change_lang_'+lang).addClass('here');
    $('#div_language_overlay').show();
    $('#div_language_win').show();
}

function hide_lang_panel(){
    $('#div_language_overlay').hide();
    $('#div_language_win').hide();
}

function change_lang(lang){
    lang = check_lang(lang);
    document.cookie='lang='+lang+';path=/;domain=books.com.tw;';
    location.reload();
}

function check_lang(lang){
    if(lang != 'zh_TW' && lang != 'zh_CN' && lang != 'en') return 'zh_TW';
    return lang;
}

function get_lang_title(lang){
    if(lang == 'zh_TW') return '繁體';
    if(lang == 'zh_CN') return '简体';
    if(lang == 'en') return 'EN';
    return '繁體';
}

/**
 * 全站分類生DOM
 */
function HgenDOM(c){
    var tab = c.tab,
        idx = c.idx,
        box = c.box,
        src = HmenuSource;
    return {
        init: function(){
            var obj = this,
                pop = src[tab][idx];
            obj.createEl(pop,box);
        },
        createEl:function(arr,box){
            /*
            * @param o {arr} child list(DOM setting)
            * @param b {HTML object} container to be appendTo
            *
            * @config DOM setting
            * {
            *   n: {str} HTML tag name
            *   t: {str} text inside the element
            *   s: {arr} class(s)
            *   a: {obj} attributes including ID
            *   c: {arr} child element(s)
            * }
            *
            * */
            var obj = this,
                box = box;
            for(var i=0;i<arr.length;i++){
                if(!arr[i]){continue;}
                if(typeof arr[i].n !='string'){continue;}
                var o = arr[i],
                    el = document.createElement(o.n),
                    txt = o.t,
                    hook = o.s,
                    attr = o.a,
                    kids = o.c;
                $(el).text(txt);
                if(hook) {$(el).addClass(hook.join(' '));}
                if(attr) {$(el).attr(attr);}
                if(kids) {obj.createEl(kids,el);}
                $(el).appendTo(box);
            }
        }
    }
}

/**
 * 頂天banner
 */
function HtopBanner(id){

    var is_preview = $("#tbanner_data").attr("data-preview"), //是否為preview
        time = parseInt($("#tbanner_data").attr("data-sec")), //呈現的秒數
        s_key = $("#tbanner_data").attr("data-skey"),
        c_key = getCookie('home_tbanner'),
        o_key  = $("#tbanner_data").attr("data-okey"),
        isOpen = false,
	timer,
	showTime = (time * 1000);

    if((s_key != c_key || c_key == "" || is_preview == true) && id == 'home' && time != 0){
        isOpen = true;
        $('.flash_banner_pop').show("slow", function() {
            setCookie(s_key , c_key , o_key)
        });
        // 執行 close() 來啟動自動關閉計時器
        timer = close(timer , isOpen , showTime);
    }

    //展開大圖
    if($(".flash_banner_pop").css('background-image') != "undefined"){
        $('#open_top_banner').click(function(){
            isOpen = true;
            // 顯示大圖
            $('.flash_banner_pop').show("slow", function() {
                if(s_key != 0){
                    adv_set(s_key, o_key);
                }
            });
            // 執行 close() 來啟動自動關閉計時器
            timer = close(timer , isOpen , showTime);
        });
    }

    //關閉大圖
    $('#close_top_banner').click(function(){
        isOpen = false;
        clearTimeout(timer);
        $('.flash_banner_pop').hide("slow");
    });

    // image 加上 hover 事件
    $('.flash_banner_pop').hover(function(){
        clearTimeout(timer);
    }, function(){
	if(isOpen) timer = close(timer , isOpen , showTime);
    });
}

/**
 * 自動關閉計時器
 * @param {obj} timer
 * @param {bool} isOpen
 * @param {integer} showTime
 * @returns {obj}
 */
function close(timer , isOpen , showTime){
    timer = setTimeout(function(){
        // 若現在是展開時才進行關閉
        if(isOpen) $('#close_top_banner').click();
    }, showTime);

    return timer;
}

/**
 * 切換全站分類、旗鑑店
 * @param {string} flag
 */
function Hmenu(flag){
    if(flag == 'flagship'){
        $('#home').attr("class" , "first");
        $('#flagship').attr("class" , "last here");
        $('#flagship_menu_list').show();
        $('#home_menu_list').hide();
    }else{
        $('#home').attr("class" , "first here");
        $('#flagship').attr("class" , "last");
        $('#flagship_menu_list').hide();
        $('#home_menu_list').show();
    }
}

/**
 * 取得小購物車的筆數
 */
function HshoppingCartNum(){
    var header_crox = false;
    if(window.location.host!='www.books.com.tw'){
        header_crox = true;
    }
    var s_date = new Date(Date.UTC(2020, 8, 4, 2, 55, 0)); // 0=>1M, 5=>6M, 6=>7M
    var e_date = new Date(Date.UTC(2020, 8, 4, 3, 15, 0)); // 0=>1M, 5=>6M, 6=>7M
    var n_date = new Date();// 使用本機時間
    if(s_date < n_date && n_date < e_date){
        // stop ajax & hide
        $("#shopping_cart_num").text('');
        $("#member_class").hide();
        $(".pop_tip_box").hide();
        return true;
    }else{
      $.ajax({
        type: "GET",
        url: "//www.books.com.tw/webs/data_js/get_small_cart",
        dataType: "json",
        xhrFields: {withCredentials: header_crox},
        success:function(response){
            $("#shopping_cart_num").text(response.num);
            var birthday = getCookie("bday");
            if(birthday != ''){
                if(response && response.is_only_num && response.is_only_num===true){
                    $("#member_class").hide();
                    $(".pop_tip_box").hide();
                }else{
                    if($("#my_ecoupon_count").length && response.coupon_num) $("#my_ecoupon_count").text(response.coupon_num);
                    if($("#my_icoupon_count").length && response.icoupon_num) $("#my_icoupon_count").text(response.icoupon_num);
                    $("#shopping_cash").text(response.shipping_money);
                    $("#shopping_cash_show").text(response.shipping_money);
                    var welfare = response.welfare_amounts;
                    if(welfare && welfare.W) welfare = welfare.W;
                    else welfare = 0;
                    $("#benefit_cash").text(welfare);
                    $("#member_class").text(response.member_class);
                }

                // FOR OLD
                if($("#li_for_log_in_out").length){
                    $("#li_for_join_member").hide();
                    $("#left_brackets").show();
                    $("#right_brackets").show();
                    $("#li_for_log_in_out").show();
                    $("#a_for_log_in_out").text($("#li_for_log_in_out").attr("data-attr"));
                    if(window.location.host=='search.books.com.tw'){
                        $("#a_for_log_in_out").click(function(){
                            location.href='https://cart.books.com.tw/member/logout?loc=search_header_logout';
                        });
                    }
                }
            }else{
                if($("#li_for_log_in_out").length && window.location.host=='search.books.com.tw'){
                    $("#li_for_log_in_out").show();
                    $("#a_for_log_in_out").click(function(){
                        location.href='https://cart.books.com.tw/member/login?loc=search_header_logout&url=' + encodeURIComponent(window.location.href);
                    });
                }
            }
            var count = parseInt(response.num);
            if(count > 99){
               $("#shopping_cart_more").show();
            }
        },
        beforeSend: function(xhr){
            xhr.withCredentials = header_crox;
        }
      });
    }
}

function go_search(){
    if(document.getElementById('key').value){
        var s_key = document.getElementById('key').value;
        var s_cat = 'all';
        var s_ovs = '';
        var s_fclick = '';
        var s_fclick_key = '';
        if(document.getElementById('cat')){
            s_cat = document.getElementById('cat').value;
        }else{
            s_cat = document.getElementsByName('cat')[0].options[document.getElementsByName('cat')[0].selectedIndex].value;
        }
        s_key = s_key.replace(/[\\|\/|%]/g,' ');
        document.getElementById('key').value = s_key;
        s_key = encodeURIComponent(s_key);
        s_cat = encodeURIComponent(s_cat);
        if(document.getElementById('search_fclick')){
            s_fclick_key = document.getElementById('search_fclick').dataset.fkey;
            s_fclick_key = s_fclick_key.replace(/[\\|\/|%]/g,' ');
            s_fclick_key = encodeURIComponent(s_fclick_key);
            if(s_key == s_fclick_key){
                s_fclick = '/fclick/autocomp';
            }
            //if(document.getElementById('search_fclick').value != 0){
            //    s_fclick = '/fclick/autocomp';
            //}
        }
        if(s_cat=='OVS'){
            s_cat = 'all';
            s_ovs = '/ovs/1';
        }else{
            var search_id = get_now_ovs_search_id();
            if(search_id){
                s_ovs = '/ovs/'+search_id;
            }else if($("#header_id").attr("data-attr")=='ovs'){
                s_ovs = '/ovs/1';
            }
        }
        window.location.href='https://search.books.com.tw/search/query/key/'+s_key+'/cat/'+s_cat+s_ovs+s_fclick;
    }
}

function get_now_ovs_search_id(){
    var vars = window.location.pathname.split('/');
    var ovs_types = {"ovs":1, "ovshm":2, "ovssg":3, "ovsmy":4, "ovsus":5, "ovsna":6, "ovsjk":7};
    var search_id = '';
    if(vars[1] && vars[2] && vars[1] == 'web'){
        if(ovs_types[vars[2]]){
            search_id = ovs_types[vars[2]];
        }else if(vars[3] && vars[2]=='sys_ovsbotm' && vars[3].split('_').length>1){
            if(ovs_types[vars[3].split('_')[0]]){
                search_id = ovs_types[vars[3].split('_')[0]];
            }
        }
    }
    return search_id;
}

/**
 * 取得cookie
 * @param {type} cname
 * @returns {String|@exp;c@call;substring}
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = $.trim(ca[i]);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}


function setCookie(s_key,c_key,o_key,secure ){
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime( today.getTime() );
    // set AD display value
    if(s_key != 0){
        adv_set(s_key, o_key);
    }

    var expires = 1000 * 60 * 60 * 24;
    var expires_date = new Date( today.getTime() + (expires));

    if(s_key != c_key || c_key == ""){
        document.cookie = "home_tbanner=" +escape( s_key ) +
        (( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
        ";path=/;domain=.books.com.tw" +
        (( secure ) ? ";secure" : "" );
    }
}

function topMergin(){
//    $(window).load(function(){
//　　$(window).bind('scroll resize', function(){
//        var $this = $(this);
//        var $this_Top=$this.scrollTop();
//
//        //當高度小於100時，關閉區塊 
//        if($this_Top < 20){
//            $('.header_box1').css("position","relative");
//            $('.header_box1').stop().animate({top:"0"});
//        }
//        if($this_Top > 20){
//            $('.header_box1').stop().animate({top:"0px"});
//            $('.header_box1').css("position","fixed");
//        }
//　　}).scroll();
//　});
}

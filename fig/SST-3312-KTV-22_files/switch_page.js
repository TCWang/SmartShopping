function switch_page(opt_module_id,opt_set_rows,opt_page,opt_rowCount){
    var module_id = "";//模組編碼參數
    var set_rows = 0;//一頁幾個商品
    var arr_index = 0;//目前在第幾頁
    var arr_pages = 0;//共有幾頁
    var self = this;

    //翻頁效果
    this.play = function(key) {
        $("#li_"+module_id+"_page_"+arr_index).removeClass();
        switch (key){
            case "swleft":
                arr_index = (arr_index-1<=0) ? arr_pages : arr_index-1;
                break;
            case "swright":
                arr_index = (arr_index+1>arr_pages)?1:arr_index+1;
                break;
            default:
                arr_index = parseInt(key);
                break;
        }
        $("#li_"+module_id+"_page_"+arr_index).addClass("here");
        self.showProd();
    }

    //變動內容
    this.showProd = function(){
        var i = 0;
        var start = (arr_index-1) * set_rows;
        var expire = arr_index * set_rows;
        $(".li_"+module_id).hide();
        for(i=start;i<expire;i++){
            $("#li_"+module_id+"-"+i).show();
        }
        return;
    }

    //bind事件
    this.bindEvent = function(){
        $("."+module_id).bind("click", function(){
            var key = this.id.split("-");
            self.play(key[1]);
            return;
        });
    }

    //分頁清單頁次設定
    this.set_arr_pages=function(set_arr_pages){    	
    	arr_index = set_arr_pages;
    }
    //主程式
    this.main = function(opt_module_id,opt_set_rows,opt_page,opt_rowCount){
        module_id = opt_module_id;//取得參數
        set_rows = opt_set_rows;
        arr_pages = opt_page;
        for(var j=opt_set_rows;j<opt_rowCount;j++){
            $("#li_"+module_id+"-"+j).hide();
        }
        self.bindEvent();

    	//分頁清單頁次設定
    	arr_index = 1;//預設在第一頁
    }
    //執行主程式
    this.main(opt_module_id,opt_set_rows,opt_page,opt_rowCount);
}

function menu_fixed_p(menu_id){
    var $win = $(window),
        $menu = $('#'+menu_id),
        $menu_btn = $("#"+menu_id+" a"),
        menuOffset = $menu.offset(),
        self = this;
    this.menu_fix = function(){
        var fixed = $menu.hasClass('fixed');
        if ($win.scrollTop() >= menuOffset.top) {
            if (!fixed) {
                $menu.addClass('fixed');
            }
        } else {
            if (fixed) {
                $menu.removeClass('fixed');
            }
        }
    };
    this.menu_click = function(e){
        //20161128 hsinhui:加上選單記錄點擊率
        var anchor = $(e.currentTarget).attr("href").replace("#", ""); 
        $("<img/>").attr("src",'//mercury.books.com.tw/logs/happybuy/_bt.gif?menu='+anchor);
        
        var fixed = $menu.hasClass('fixed');
        var headerHeight = 50;
        var menuHeight = 40;
        var padding = 5;
        var offsetY = headerHeight + (fixed? menuHeight:menuHeight*2) +  (fixed? padding:padding*3); 
        e.preventDefault();
        var linkid = $(e.currentTarget).attr("href");
        var scrollTop = $(linkid).offset().top - offsetY;
        scrollTop = (scrollTop <=20) ? 0 : scrollTop;
        window.scrollTo(0 , scrollTop);
    };
    this.bindEvent = function(){
        $win.scroll(function() {
            self.menu_fix();
        });
        $menu_btn.click(function(e){
            self.menu_click(e);
        });    
    };
    this.main = function(){
        self.bindEvent();
    };    
    this.main();
}
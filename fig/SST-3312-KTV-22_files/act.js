function act(opt_module_id,opt){
    var module_id = "";//模組編碼參數
    var content = "";
    var self = this;

    this.fixPosition = function(hash){//設定交換禮物彈窗大小和位置
            $('.jqmWindow').css('height','450px');
            $('.jqmWindow').css('width','760px');
            var jqmWindowTop = (window.innerHeight-450)/2;
            if (jqmWindowTop<0){jqmWindowTop=0;}
            if (!$.browser.msie) {
                $('.jqmWindow').css('top',jqmWindowTop+'px');
            }else{
                $('.jqmWindow').css('top','105px');
            }
            $('.jqmWindow').css('left',($(document).width()/2-390)+'px');
            hash.w.fadeIn().show();
        };

    this.dialog_show = function(){
        if ($('#'+opt_module_id+'_dialog').length == 0){
            $('body').append(content);//彈窗內容
        }

        $('#'+opt_module_id+'_dialog').jqm({//按鈕觸發處
            modal: false, trigger: '#'+opt_module_id+'-xmas', onShow: this.fixPosition
        });
    }
    
   this.bindEvent = function(){           
        $('#yes').bind("click",function() {//已確定要參加的禮物團
            var url = "https://db.books.com.tw/shopping/cart.php";
            location.href=url+'?item='+document.getElementById('xmasitem').value+'&xmas_flag=T';
        });
        
        $('#no').bind("click",function() {//看怎麼參加
            location.href="//activity.books.com.tw/xmas2012";
        });
        
        $('.btn_closepop').bind("click",function() {//關閉視窗
            $('#'+opt_module_id+'_dialog').jqmHide();
        });
    }

    //主程式
    this.main = function(opt_module_id,opt){
        module_id = opt_module_id;//取得參數
        content = opt[0];//彈窗html
        self.dialog_show();        
        self.bindEvent();
    }
    //執行主程式
    this.main(opt_module_id,opt);
}
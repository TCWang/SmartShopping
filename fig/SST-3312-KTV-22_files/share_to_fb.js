function share_to_fb(){
    var self = this;
     //share to fb
    this.shareFb = function(){
        var u = location.href;
        var split_url = u.split("?");
        var t = document.title;
        $('#push_facebook').click(function(){
           var utm = shareurl_utm(split_url[0],'fb');
           if(utm != false){
                //?utm_source=www&utm_medium=share&utm_content=fb&utm_campaign=product&utm_term={item}
                u = split_url[0]+'?'+utm;
           }
                window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t));
                return false;
        });
        $('#push_plurk').click(function(){
            window.open('http://www.plurk.com/?qualifier=shares&status=' .concat(encodeURIComponent(u)) .concat(' ') .concat('(') .concat(encodeURIComponent(t)) .concat(')'));
            return false;
        });
        $('#push_twitter').click(function(){
            window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(t)) .concat(' ') .concat(encodeURIComponent(u)));
            return false;
        });
        $('#push_line').click(function(){    
            var utm = shareurl_utm(split_url[0],'line');
            if(utm != false){
                //?utm_source=www&utm_medium=share&utm_content=line&utm_campaign=product&utm_term={item}
                u = split_url[0]+'?'+utm;
            }
            window.open('http://line.naver.jp/R/msg/text/?'.concat(encodeURIComponent(t)) .concat(' ') .concat(encodeURIComponent(u)));
            return false;
        });
        
        $('#push_copy').click(function(){
            var url = copy_url = location.href;
            var split_url = url.split("?");
            var utm = shareurl_utm(split_url[0],'copy');
            if(utm != false){
                //?utm_source=www&utm_medium=share&utm_content=copy&utm_campaign=product&utm_term=0010859154
                copy_url = split_url[0]+'?'+utm;
            }
            
            if (navigator.userAgent.match(/ipad|iphone/i)) {
                var ta  = document.createElement('textArea');
                ta.readonly = false;
                ta.contenteditable = true;
                ta.value=copy_url;
                document.body.appendChild(ta);
                ta.focus();
                var range = document.createRange();
                range.selectNodeContents(ta);
                range.collapse(false);
                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                ta.setSelectionRange(0, 999999);
                document.execCommand('copy');
                document.body.removeChild(ta);
            } else {
                var input = document.createElement('input');
                input.setAttribute('readonly', 'readonly');
                input.setAttribute('value', copy_url);
                document.body.appendChild(input);
                //input.setSelectionRange(0, 9999);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
            }
        });
        
        
        
    }
      //主程式
    this.main = function(){
        self.shareFb();
    }
    //執行主程式
    this.main();
    
   shareurl_utm = function(url, type = ''){
        var copy_url = url;
        //console.log(url); //https://www.books.com.tw/products/0010859154
        var u = new URL(url);
        //console.log(u);
        var spl_source = u.host.split(".");
        var spl_path = u.pathname.split("/");
        
        if(u.host != "www.books.com.tw"){
            return false;
	}

	if(spl_path.length > 4){
            return false;
	}
        
        if(spl_path[1] != 'products'){
            return false;
	}
        
        if(spl_path[2].length != 10){
            return false;
	}        
        copy_url = 'utm_source='+spl_source[0]+'&utm_medium=share&utm_content='+type+'&utm_campaign=product&utm_term='+spl_path[2];
        
        return copy_url;
    };
}



if(typeof $ == "function" && typeof $("#key").autocomplete == "function"){
  $(document).ready(function(){
    $("#key").autocomplete('//www.books.com.tw/searchauto/query');
  });
}else if(typeof h_jQuery == "function"){
  h_jQuery(document).ready(function(){
    h_jQuery("#key").autocomplete('//www.books.com.tw/searchauto/query');// /search/autocomplete/
  });
}

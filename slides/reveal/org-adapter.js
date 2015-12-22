var container;

function revealjs_adapter(ctn){
    if(ctn == undefined){
	container="#main-container";
    }else {
	container = ctn;
    }

    $(container).append('<hr class="separator horizontal">');

    add_helper_line(['h1','h2','h3']);

    wrap_horizontal();
    wrap_vertical();

    cleanup();
}

function add_helper_line(heads){
    heads.forEach(function(head){
	var titles = $(container).find(head);
	titles.each(function(){ //head 上方辅助线
	    $(this).before(separator(this));
	});
    });
}

function wrap_horizontal(){
    $("hr.separator.horizontal").each(function(){
	$(this).nextUntil('hr.separator.horizontal')
	    .wrapAll('<section></section>');
    });
}

function wrap_vertical(){
    $(container).find("section:has(.vertical)").prepend("<hr class='separator vertical' />");
    // 原本的 h2 块需要重新套一层

    $("hr.separator.vertical").each(function(){
	$(this).nextUntil('hr.separator')
	    .wrapAll('<section></section>');
    });
}

function cleanup(){
    $(container).find("li").addClass("fragment"); // 让列表可以 one by one 的显示，和主逻辑无关
    $("hr.separator").remove();
    $("section:not(:has(*))").remove();
}

//private

// 生成分割线
function separator(head) {
    var direct = get_direct(head);
    return '<hr class="separator '+direct+'" />';
}

function get_direct(head){
    tag = head.localName;
    if(tag == "h1" || tag == "h2"){
	return "horizontal";
    }
    if(tag == "h3"){
	return "vertical";
    }
}

(function($){
	
	$.fn.fixedHeader = function (options){
		$('.fixed-header').remove();//清除固定表头
		var defaults = {
			theadClassName:'table-header'//默认表头的名字
		};
	    var options = $.extend({},defaults,options);
	    
	 	var oTable = $(this);

	 	function copyTableHeader(oTable){
	 		_width = oTable.width();
			oTable.find('thead').attr('class',options.theadClassName);
			$thead = oTable.find('thead').clone();//复制表头
			$thead.css({position:'fixed',zIndex:'100',top:'0',width:_width+2,display:'none'});
			$thead.addClass('fixed-header').removeClass(options.theadClassName);//复制后表头的名字
			oTable.append($thead);


			$('.'+options.theadClassName).find('th').each(function (i) {
				var computedStyle = window.getComputedStyle( this, null );
				var _borderWidth = computedStyle.borderWidth;
				var _borderColor = computedStyle.borderColor;
				var _borderStyle = computedStyle.borderStyle;
				var _padding = computedStyle.padding;
				var _width = computedStyle.width;
				$('.fixed-header').find('th').eq(i).css({width: _width, borderWidth:_borderWidth, borderColor:_borderColor,borderStyle:_borderStyle,padding: _padding});
			});
	 	}
		
	 	copyTableHeader(oTable);

		function showTableHeader(){
			var tableName = oTable.selector.replace(".","")
			if($('table').hasClass(tableName)){
			    windowScrollTop = $(window).scrollTop();
			    tableScrollTop = $(oTable.selector).offset().top;
			    tableScrollLeft = $(oTable.selector).offset().left;
				windowScrollLeft = $(window).scrollLeft();
				_left = tableScrollLeft-windowScrollLeft;

				$('.fixed-header').css({left:_left,display:'none'});
				
			    if(windowScrollTop>=tableScrollTop){
			    	$('.fixed-header').show();
			    	return true;
			    }
			    $('.fixed-header').hide();
			}
		}
		//滚动
		$(window).scroll(function(){
			showTableHeader();
		})
		//加载
		$(function() {
			showTableHeader()
		});
	}

})(jQuery);

// 调用格式
$(function(){
	window.onload = function(){
		$('.fixedHeadertable').fixedHeader();
	}
	window.onresize = function(){
		$('.fixedHeadertable').fixedHeader();
	}
});

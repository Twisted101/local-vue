$(document).ready(function() {
	var isClosed = false;
	var dropdown = $('.dropdown');
	$('[data-toggle="offcanvas"]').click(function() {
		$('#wrapper').toggleClass('toggled');
	});
	//阻止bootstrap的.dropdown冒泡
	$('.dropdown-menu').click(function(event) {
		event.stopPropagation();
	});
	$('.top-header>i.iconfont').click(function() { //点击关闭页面或者返回主页
		if(history.length <= 1) {
			window.close();
		} else {
			window.parent.SN.closeChildFrame();
		}
	})
	$('.modal').on('show.bs.modal', function(e) {
		$('#wrapper').css('position', 'static');
	})
	$('.modal').on('hidden.bs.modal', function(e) {
		$('#wrapper').css('position', 'fixed');
	})
})
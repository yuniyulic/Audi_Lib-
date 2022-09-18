/* 페이지 로딩 후 실행 */
$(document).ready(function(){
	$('.lili').click(function() {
		if ( $(this).hasClass('active') ) {
			$(this).find(' > ul').stop().slideUp(300);
			$(this).removeClass('active');
		}
		else {
			$(this).find(' > ul').stop().slideDown(300);
			$(this).addClass('active');
		}
	});
});

/* 함수선언 영역*/
(function($){
	

})(jQuery);

/* 페이지 로딩 후 실행 */ 
$(document).ready(function(){ 
	
    $('#fullpage').fullpage({
        //options here
//        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        autoScrolling:true,
        scrollHorizontally: true
    });
    
    //채팅
	$('.chattDiv').hide();
	
	let header = $('.topMenu');
	let page = $('.page-start');
	let pageOffsetTop = page.offset().top;
	
	$(window).resize(function(){
		pageOffsetTop = page.offset().top;
	});
	
	
	//스크롤 내려가도 top메뉴 고정&파랑색 바뀜
	$(".section").on('mousewheel',function(e){
			var wheel = e.originalEvent.wheelDelta;
			$('.topMenu').attr('class', 'topMenu offTop');
			
			//다시 맨위로 갔을때
			if($('body').attr('class') == 'fp-viewing-0'){
				$('.topMenu').attr('class', 'topMenu');
			}
			
	});


	// 선택한 모달이 닫힐 때 실행
	$('#loginModal').on('hidden.bs.modal', function(event) {
		$('#longinForm')[0].reset();
	});

	$(document).on('click', '#close', function() {  
		$('#pop').hide();
	}); 
	
	
	weather();

	
}); /*로딩화면 끝*/ 
	
 

/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/ 

 

/* 함수선언 영역*/ 
(function($){ 

	//채팅창
	 showChat = function(){
	      $('.chattDiv').show();
	      $('#chattingImg').hide();
	   }
	   
	   hiddenChat = function(){
	      $('.chattDiv').hide();
	      $('#chattingImg').show();
	   }

	   //날씨
		weather = function() {
			var apiURI = "http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=4c700425f11a96e92943a879a90e5b9f&units=metric";
			
		    $.ajax({
		        url: apiURI,
		        dataType: "json",
		        type: "GET",
		        async: "false",
		     
		        success: function(resp) {
	                var imgURL = "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
	                $(".weatherImg").attr("src", imgURL);
	                let str = '';
	                str += '<div>' + resp.name + '</div>';
	                str += '<div>' + resp.weather[0].description + '</div>';
	                str += '<div>' + resp.main.temp + '℃</div>';
	                $(".weatherImg").after(str);
	                
		        },
		        error: function(){
		            //ajax 실행 실패 시 실행되는 구간
		              alert('실패');
		           }
		
		    });
		}


})(jQuery); /*함수선언영역 끝*/ 

















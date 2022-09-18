
/* 페이지 로딩 후 실행 */
$(document).ready(function(){
	weather();
});

/* 함수선언 영역*/
(function($){
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


})(jQuery);
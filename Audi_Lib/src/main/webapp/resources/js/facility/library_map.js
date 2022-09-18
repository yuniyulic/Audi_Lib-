
/* 페이지 로딩 후 실행 */ 
$(document).ready(function(){ 
	   var container = document.getElementById('map'); //지도 표시 div
       var options = {
           center: new kakao.maps.LatLng(35.5350667164244, 129.31089237731078), //지도의 중심좌표 > 마커위치바꾸기
           level: 3 //지도의 확대 레벨
       };

       var map = new kakao.maps.Map(container, options);
       
       // 마커가 표시될 위치
       var markerPosition  = new kakao.maps.LatLng(35.5350667164244, 129.31089237731078); 

       // 마커 생성
       var marker = new kakao.maps.Marker({
           position: markerPosition
       });

       // 마커가 지도 위에 표시되도록 설정
       marker.setMap(map);

       // 아래 코드는 지도 위의 마커를 제거하는 코드
       // marker.setMap(null);  
       
	    
	    var iwContent = '<div style="padding:5px; text-align:center; opacity=0.9px;">우디 도서관<br><a href="https://map.kakao.com/link/map/Hello World!,35.5350667164244, 129.31089237731078" style="color:#014099" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/Hello World!,35.5350667164244, 129.31089237731078" style="color:#014099" target="_blank">길찾기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
	    iwPosition = new kakao.maps.LatLng(35.5350667164244, 129.31089237731078); //인포윈도우 표시 위치입니다
	
		// 인포윈도우를 생성합니다
		var infowindow = new kakao.maps.InfoWindow({
		    position : iwPosition, 
		    content : iwContent 
		});
	      
		// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
		infowindow.open(map, marker); 
       
		// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
		var mapTypeControl = new kakao.maps.MapTypeControl();

		// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
		// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
		map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

		// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
		var zoomControl = new kakao.maps.ZoomControl();
		map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
		
	

	
}); /*로딩화면 끝*/ 

 

/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/ 

 

/* 함수선언 영역*/ 

(function($){ 

 

 

})(jQuery); /*함수선언영역 끝*/ 
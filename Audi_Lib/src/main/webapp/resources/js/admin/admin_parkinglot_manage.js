/* 페이지 로딩 후 실행 */
$(document).ready(function() {
	
});

/* 함수선언 영역 */
(function($) {
	//선택한 날짜 정보 가져오기
	selectDate = function(parkingCode) {
		var parkingDate = $('#parkingDate').val();
			
		$.ajax({
			url : '/admin/selectParkingInfoForAdmin', // 요청경로
			type : 'post',
			data : {
				'parkingCode' : parkingCode
				, 'parkingDate' : parkingDate
			}, // 필요한 데이터
			success : function(result) {
				
				//초기화
				//아래 for문에서 addClass 및 text 변경하는 것 없앰
				$('.N').children().not('.color').removeClass("inUse");
				$('.N').children().not('.color').text("사용가능");
				$('.Y').children().not('.color').removeClass("inUse");
				$('.Y').children().not('.color').text("사용가능");
				
				//parkingLoc 일치하면 맞는 칸 찾아서 inUse클래스 주고 '예약완료'로 text 변경
				for(let i = 0 ; i < 11 ; i++) {
					for(let j = 0 ; j < 11 ; j++) {
						
						if(result[i].parkingLoc == 'PARKING_' + (j + 1)) {
							
							if(result[i].isAfternoon == 'N') {
								$('.N').children().eq(j + 1).addClass("inUse");
								$('.N').children().eq(j + 1).text(result[i].memberName);
							} else{
								$('.Y').children().eq(j + 1).addClass("inUse");
								$('.Y').children().eq(j + 1).text(result[i].memberName);
							}
						}
					}
				}
			

			},
			error : function() {
				// ajax 실행 실패 시 실행되는 구간
				alert('실패');
			}
		});
		
	}
	
})(jQuery);



/* 페이지 로딩 후 실행 */
$(document).ready(function() {

});

/* 함수선언 영역 */
(function($) {
	//스터디룸 별 조회
	selectRoomType = function(selectedTag) {
		
		$.ajax({
			url : '/admin/adminStudyroomManage', // 요청경로
			type : 'post',
			data : {
				'studyRoomType' : $(selectedTag).val()
			}, // 필요한 데이터
			success : function(result) {
				
				//선택한 태그의 안쪽 내용을 지운다.
            	$('.table-studyRoom').empty();//inner테이블은 살아있지만 안의 내용만 싹 사라짐. inner테이블까지 지우려면 .remove();
         
            	let str = '';
            	str += '<thead>';
            	str += '<tr>';
            	str += '<td scope="col">시설명</td>';
            	str += '<td scope="col">예약자명</td>';
            	str += '<td scope="col">예약인원</td>';
            	str += '<td scope="col">예약일</td>';
            	str += '<td scope="col">예약시간</td>';
            	str += '<td scope="col"></td>';
            	str += '</tr>';
            	str += '</thead>';
   
            	$(result).each(function(index, element) {
            		str += '<tbody>';
            		str += '<tr>';
            		str += '<td>' + element.studyRoomName + '</td>';
            		str += '<td>' + element.memberName + '</td>';
            		str += '<td>' + element.rentStu + '명</td>';
            		str += '<td>' + element.rentDate + '</td>';
            		str += '<td>' + element.rentTime + '</td>';
            		str += '<td><input type="button" value="예약취소" class="form-control cancelBtn" onclick="cancelStudyRoom(\'' + element.memberCode + '\', \'' + element.rentTime  + '\', this)"></td>';
            		str += '</tr>';
            		str += '</tbody>';
            	})
            	
            	//작성한 html코드를 다시 테이블에 붙인다.
            	$('.table-studyRoom').append(str);
            	
			},
			error : function() {
				// ajax 실행 실패 시 실행되는 구간
				alert('실패');
			}
		});
	}
	
	//예약 취소
	cancelStudyRoom = function(memberCode, rentTime, selectedTag) {
		if (confirm('예약을 취소하시겠습니까?')) {
			$.ajax({
				url : '/admin/cancelStudyRoom', // 요청경로
				type : 'post',
				data : {
					'memberCode' : memberCode
					, 'rentTime' : rentTime
				}, // 필요한 데이터
				success : function(result) {
					// '확인' 누르면 alert 뜨고 데이터 삭제됨.
					
					if (result == 1) {
						$(selectedTag).closest('tr').remove();
						alert('예약이 취소되었습니다.');
					}
				},
				error : function() {
					// ajax 실행 실패 시 실행되는 구간
					alert('실패');
				}
			});
		}
	}
	
	
})(jQuery);



/* 페이지 로딩 후 실행 */ 
$(document).ready(function(){ 
	$(document).on('click', '.lectureName', function() {
		let lectureCode = $(this).attr('id');
		detailLecture(lectureCode);
	}); 
	
	  $('[type="date"].min-today').prop('min', function(){
	        return new Date().toJSON().split('T')[0];
	    });
	

}); /*로딩화면 끝*/ 
/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/ 
/* 함수선언 영역*/ 
(function($){ 
	
	
	
	detailLecture = function(lectureCode){ 
            $.ajax({ 
            url: '/facility/selectDetailLecture', //요청경로, 어떤 controller로갈까 
            type: 'post', 
            data:{'lectureCode':lectureCode}, //필요한 데이터 
            success: function(result) { 
            	$('.detailHeadModal').empty();  
            	$('.detailBodyModal').empty();
               
				let str = '<div>' + result.lectureName + '</div>'; 
				$('.detailHeadModal').prepend(str);
				
				let body = '<div> 진행시간 : ' + result.lectureTime + '시간</div>'
				body += '<div> 강연자 : ' + result.lecturer + '</div>'
				if(result.lecturePlace == 'STUDY_ROOM_1'){
					body += '<div id="' + result.lecturePlace + '"> 강연장소 : 대토론실</div>'
				}
				else if(result.lecturePlace == 'STUDY_ROOM_2'){
					body += '<div id="' + result.lecturePlace + '"> 강연장소 : 미디어실1</div>'
				}
				$('.detailBodyModal').append(body);
				
				
            }, 
            error: function(){ 
             //ajax 실행 실패 시 실행되는 구간 
               alert('실패'); 
            } 
      }); //ajax 
     };//aaa() 

     selChange = function() {
		var sel = document.getElementById('cntPerPage').value;
		location.href="/facility/libEvent?nowPage=${paging.nowPage}&cntPerPage="+sel;
	}

})(jQuery); /*함수선언영역 끝*/ 
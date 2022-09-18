/* 페이지 로딩 후 실행 */
$(document).ready(function(){
	
	
	initValidationForAdmin5();
});

/* 함수선언 영역*/
(function($){
	//회원 삭제
	deleteLecture = function(lectureCode, selectedTag) {
		if (confirm('정말 삭제하시겠습니까?')) {
			$.ajax({
				url : '/admin/deleteLectureInfo',
				type : 'post',
				data : {
					'lectureCode' : lectureCode
				},
				success : function(result) {
					if (result == 1) {
						$(selectedTag).closest('tr').remove();
						alert('행사 정보가 삭제되었습니다.');
					}
				},
				error : function() {
					alert('실패');
				}
			});
		}
	}
	
	//회원 수정
	updateLecture = function(lectureCode) {
		var lectureName = $('.' + lectureCode).children().eq(1).children().val();
		var lectureDate = $('.' + lectureCode).children().eq(2).children().val();
		var lectureTime = $('.' + lectureCode).children().eq(3).children().val();
		var lecturer = $('.' + lectureCode).children().eq(4).children().val();
		var lectureState = $('.' + lectureCode).children().eq(5).children().val();
		var lecturePlace = $('.' + lectureCode).children().eq(6).children().val();

		
		if (confirm('정말 수정하시겠습니까?')) {
			
			$.ajax({
				url : '/admin/updateLectureInfoOfAdmin', // 요청경로
				type : 'post',
				data : {
					'lectureCode' : lectureCode
					, 'lectureName' : lectureName
					, 'lectureDate1' : lectureDate
					, 'lectureTime' : lectureTime
					, 'lecturer' : lecturer
					, 'lectureState' : lectureState
					, 'lecturePlace' : lecturePlace
				}, // 가져갈 데이터
				success : function(result) {
					
					if (result == 1) {
						alert('행사 정보가 수정되었습니다.');
					}
				},
				error : function() {
					// ajax 실행 실패 시 실행되는 구간
					alert('실패');
				}
			});
		}
	}
	
	initValidationForAdmin5 = function(lectureCode, selectedTag){
		
		//특수문자는 제외하는 정규식을 validation에 추가
		jQuery.validator.addMethod("alphanumeric", function(value, element) {
            return this.optional(element) || !/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/.test(value);
		});
		
		jQuery.validator.addMethod("onlyKorean", function(value, element) {
			return this.optional(element) || /^[가-힣]+$/.test(value);
		});
		
		jQuery.validator.addMethod("completeKorean", function(value, element) {
			return this.optional(element) || !/^[ㄱ-ㅎㅏ-ㅣ]+$/.test(value);
		});

		jQuery.validator.addMethod("secretNumber", function(value, element) {
			return this.optional(element) || /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(value);
		});

		jQuery.validator.addMethod("emailLogic", function(value, element) {
			return this.optional(element) || /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value);
		});
		
		
		$('#' + lectureCode).validate({
	        // 테스트를 위하여 유효성 검사가 완료되어도 submit을 처리하지 않음.
	        debug : false,//true or false -> 유효검사가 완료되면 false로 바꾼다.
	        //유효성 검사를 제외할 엘레먼트를 넣는다.
	        //ignore: ".ignore",
	        //포커스가 떠날 때 유효성 검사를 한다.
	        onfocusout: function(element) { 
	              $(element).valid(); 
	           },
	        //각각의 input태그에 필요한 검증 조건 나열
	        rules : {
	           /*
	           input tag의 name 속성 값 : {
	              required : true -> 필수 입력 값 지정
	              , digits : true -> 숫자만 입력했는지? (양의 정수)
	              , number : true -> 숫자만 (음수, 양수, 실수)
	              , email : true -> 이메일 형식으로 입력했는지?
	              , maxlength : 10 -> 글자수가 (숫자)개 이하인지?
	              , minlength : 5 -> 글자수가 최소 (숫자)개 인지?
	              , equalTo : 대상 요소의 id or '#대상 요소의 아이디' -> "id"의 value(?)와 입력 값이 일치하는지?
	           } 
	           */
	        	lectureName : {
	              required : true
	              , maxlength : 30
	              , completeKorean : true
	           },
	           lectureTime : {
	        	  required : true
	        	  , digits : true
	           },
	           lecturer : {
        	      required : true
	        	  , maxlength : 15
	        	  ,	alphanumeric : true
	        	  , completeKorean : true
	           }
	        },
	        
	        //검사를 충족하지 못할 경우 표시될 메시지의 나열                                                         
	        messages : {
	        	lectureName : {
	              required : '필수 입력'
	              , maxlength : '최대 {0} 글자'
	              , completeKorean : '정확히 입력해주세요.'
	           },
	           lectureTime : {
	        	  required : '필수 입력'
	        	  , digits : '정확히 입력해주세요.'
	           },
	           lecturer : {
	        	  required : '필수 입력'
	              , maxlength : '최대 {0} 글자'
	              , alphanumeric : '특수문자는 들어올 수 없습니다.'
	              , completeKorean : '정확히 입력해주세요.'
	           }
	        },
	        //조건 검사 후 검증 실패 시 실행되는 코드
	        //만약 작성하지 않으면 기본적으로 input태그의 우측에 에러 메시지를 나타낸다
//	        errorPlacement: function(error, element){
//	           alert(123);
//	        }//,
	        //validation처리가 성공하면 기본적으로 폼태그를 submit한다
	        //만약 검증 후 submit이 아닌 다른 기능을 수행하고자 할 때 아래의 영역에 필요한 소스를 구현
	        submitHandler: function(form) {
	        	updateLecture(lectureCode);
	        }
	     });
	}

	

})(jQuery);
/* 페이지 로딩 후 실행 */
$(document).ready(function(){
   //alert('자바스크립트 파일 로딩 성공');
	initValidation();
	
   //클릭 이벤트
   //$(document).on('click', '#btn', function(){
      //여기서 소스 작성
   //});
   
});

/* 함수선언 영역*/
(function($){
	openPostCode = function() {
		new daum.Postcode({
		       oncomplete: function(data) {
		          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
		          // 예제를 참고하여 다양한 활용법을 확인해 보세요.
		    	   var roadAddr = data.roadAddress;
		    	   $('#memberAddr').val(roadAddr);
		       }
		    }).open();
	}
	

	/*join = function() {
		//입력된 데이터의 유효성을 검증(Validation)
		//ID는 반드시 입력을 받아야 하고 15자가 초과하면 안 된다
		//연락처는 반드시 4자리 숫자만 들어와야 한다
		//정규식 -> 숫자만, 문자만, 특수기호 불가, 이메일, 주민번호
		
		const id = $('#id').val();
		const tel = $('#tel').val();
		//숫자만 들어오게 하는 정규식
		const regexp = /^[0-9]*$/;
		
		if(id == null || id == ''){
			alert('ID를 입력해 주세요');
			return ;
		}
		else if(id.length > 10){
			alert('ID는 10자를 초과할 수 없습니다.');
			return ;
		}
		else if(!regexp.test(tel)){
			alert('연락처는 숫자만 입력 가능합니다.');
			return;
		}

		$('#joinForm').submit();
	
	}*/
	
	
	
	initValidation = function(){
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
		
		
		$('#memberInfoForm').validate({
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
	           memberName : {
	        	  required : true
	        	  , onlyKorean : true
	        	  , maxlength : 20
	        	  , minlength : 2
	           },
	           memberPassword : {
	        	 required : true
	        	 , secretNumber : true
	        	 , maxlength : 12
	        	 , minlength : 6
	           },
	           memberPassword2 : {
		        	 required : true
		        	 , equalTo : '#memberPassword'
		       },
	           memberTel : {
	        	   required : true
	        	   , digits : true
	        	   , minlength : 11
	        	   , maxlength : 11
	           },
	           memberAddrDetail : {
	        	   alphanumeric : true
	        	   , maxlength : 30
	        	   , completeKorean : true
	           },
	           memberCarNum : {
	        	   digits : true
	        	   , minlength : 4
	        	   , maxlength : 4
	           }
	        },
	        
	        //검사를 충족하지 못할 경우 표시될 메시지의 나열                                                         
	        messages : {
	           memberName : {
	        	  required : '필수 입력'
	        	  , onlyKorean : '한글만 들어올 수 있습니다.'
	              , minlength : '최소 {0} 글자'
	           },
	           memberPassword : {
	        	   required : '필수 입력'
	        	  , secretNumber : '최소 여섯 자리, 각각 하나의 문자, 숫자, 특수문자가 포함되어야 합니다.'
	        	  , minlength : '최소 {0} 글자'
	           },
	           memberPassword2 : {
		        	 required : '필수 입력'
		        	 , equalTo : '비밀번호가 일치하지 않습니다.'
		       },
	           memberTel : {
	        	required : '연락처는 필수 입력입니다.'
	        	, digits : '연락처가 잘못 입력되었습니다.'
	        	, minlength : '연락처가 잘못 입력되었습니다.'
		       	, maxlength : '연락처가 잘못 입력되었습니다.'
	           },
	           memberAddrDetail : {
	        	   alphanumeric : '특수문자는 들어올 수 없습니다.'
	        	   , maxlength : '최대 {30} 글자'
	        	   , completeKorean : '자음이나 모음은 들어올 수 없습니다.'
	           },
	           memberCarNum : {
	   	           digits : '차량 번호가 잘못 입력되었습니다.'
	        	   , minlength : '차량 번호가 잘못 입력되었습니다.'
	   		       , maxlength : '차량 번호가 잘못 입력되었습니다.'
	           }
	        },
	        //조건 검사 후 검증 실패 시 실행되는 코드
	        //만약 작성하지 않으면 기본적으로 input태그의 우측에 에러 메시지를 나타낸다
//	        errorPlacement: function(error, element){
//	           alert(123);
//	        }//,
	        //validation처리가 성공하면 기본적으로 폼태그를 submit한다
	        //만약 검증 후 submit이 아닌 다른 기능을 수행하고자 할 때 아래의 영역에 필요한 소스를 구현
//	        submitHandler: function(form) {
//	           $('#joinForm').submit();
//	        }
	     });
	}
	
})(jQuery);
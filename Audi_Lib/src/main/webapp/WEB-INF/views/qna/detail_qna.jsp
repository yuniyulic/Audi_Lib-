<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
.Audi3040{
	margin: 180px 400px;
}
</style>
<script type="text/javascript">
$(document).ready(function(){ 

	$(document).on('click', '.deleteQna', function() {
		let qnaCode = $('.qnaCode').val();
		let isDelete = confirm('정말 삭제하시겠습니까?');
		if(isDelete){
			location.href='/qna/deleteQna?qnaCode=' + qnaCode;
		}
		
	});
	
	
	$(document).on('click', '.goNotice', function() {
		let qnaCode = $('.qnaCode').val();
		let qnaTitle = $('.qnaTitle').val();
		let qnaContent = $('.qnaContent').val();
		let regDate = $('.regDate').val();
		let memberName = $('.memberName').val();

		let isCheck = $('.isNotice').is(':checked');
		let isNotice = 0;
		if(isCheck){
			//체크했을경우 공지로
			isNotice = 1;
		}
		
		
		$.ajax({ 
            url: '/qna/updateQnaNotice', //요청경로, 어떤 controller로갈까 
            type: 'post', 
            data:{'qnaCode':qnaCode,
            	'qnaTitle':qnaTitle,
            	'qnaContent':qnaContent,
            	'regDate':regDate,
            	'regMember':memberName}, //필요한 데이터 
            success: function(result) {
            	if(result == 1){
	               alert('변경이 완료되었습니다.');
            	}
            }, 
            error: function(){ 
             //ajax 실행 실패 시 실행되는 구간 
               alert('실패'); 
            } 
          }); //ajax 	
		
	}); 

	 
}); /*로딩화면 끝*/ 
</script>
</head>
<body>
<div class="Audi3040">
<input type="hidden" value="${qna.qnaCode }" name="qnaCode" class="qnaCode">
<input type="hidden" value="${qna.qnaTitle }" name="qnaTitle" class="qnaTitle">
<input type="hidden" value="${qna.qnaContent }" name="qnaContent" class="qnaContent">
<input type="hidden" value="${qna.regDate }" name="regDate" class="regDate">
<input type="hidden" value="${qna.regMember }" name="regMember" class="regMember">
  <div class="form-group">
    <div class="row">
		<div class="col-3">
			${qna.qnaTitle }
		</div>
		<div class="offset-7 col-2">
			${qna.regDate } 
		</div>    
    </div>
    <div class="row">
    	<div class="col">
    		작성자 : ${qna.memberName }
    	</div>
    </div>
  </div>
  <hr>
  <div class="form-group">
  </div>
  <div class="form-group">
    ${qna.qnaContent }
  </div>
  <hr>
  <div class="row" style="text-align: center;">
  	<div class="col">
	  	<c:if test="${sessionScope.loginInfo.isAdmin.equals('Y') || sessionScope.loginInfo.memberCode eq qna.regMember}">
	  		<button class="btn btn-danger deleteQna" >삭제</button>
	  		<button class="btn btn-success" onclick="location.href='/qna/QnaBeforeupdateQna?qnaCode=${qna.qnaCode}'">수정</button>
	  	</c:if>
  	</div>
  </div>
  <div style="text-align: right;">
  	<c:if test="${sessionScope.loginInfo.isAdmin.equals('Y') && qna.isNotice eq 0}">
  		공지사항여부
  		<input type="checkbox" name="isNotice" class="isNotice" value="1" <c:if test="${qna.isNotice eq 1 }">checked</c:if>>
  		<button type="button" class="btn btn-warning goNotice" >등록/해제</button>
  	</c:if>
  	<button class="btn btn-warning" onclick="location.href='/home/qna';">
  		목록
  	</button>
  </div>
</div>
</body>
</html>
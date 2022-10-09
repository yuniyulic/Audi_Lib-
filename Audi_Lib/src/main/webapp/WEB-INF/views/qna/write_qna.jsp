<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
</head>
<body>
<div class="Audi3040">
<form action="/qna/insertQna" method="post">
  <div class="form-group">
    <label for="qnaTitle">제목</label>
    <input type="text" class="form-control" id="qnaTitle" value="${qnaVO.qnaTitle }" name="qnaTitle" required>
  </div>
  <div class="form-group">
    <label for="qnaContent">내용</label>
    <textarea class="form-control" id="qnaContent" name="qnaContent"  rows="8" required>${qnaVO.qnaContent }</textarea>
  </div>
  <div class="form-group">
  	<label for="isSecurity">비밀글</label>
  	<input type="checkbox" name="isSecurity" id="isSecurity" value="1">
  </div>
  <div class="submitBtn" style="text-align: center;">
	  <button class="btn btn-primary" type="submit">작성완료</button>
	  <button class="btn btn-secondary">취소</button>
  </div>
</form>
</div>
</body>
</html>
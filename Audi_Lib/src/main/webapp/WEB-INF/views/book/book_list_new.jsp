<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
.spanGrey{
	color: #777777;
}
.grey{
	color: #777777;
}
.grey:hover {
	text-decoration: underline;
}
.titleMargin{
	padding: 0;
	padding-bottom: 0.5rem;
	padding-top: 0.5rem;
}
.noMargin{
	margin: 0;
}
.textBlack{
	color: black;
}
.contentsDiv{
	padding-top: 0.5rem;
}
.oneBookDiv{
	margin-bottom: 0.3rem;
}
.clickable{
	color: #014099;
}
</style>
<script type="text/javascript">
(function($){
	makeBookRentForm = function(target){
		/* 대여를 위한 책 정보를 받아옴 */
		const bookCode = $(target).prev().val();
		const bookTitle = $(target).next().val();
		alert(bookCode + bookTitle);
		
		/* 대여 폼에 넣음 */
		$('#formBookCode').val(bookCode);
		$('#formBookTitle').val(bookTitle);
		
		/* form에 반드시 필요한 정보들이 들어있나 확인 */
		const checkBookCode = $('#formBookCode').val();
		const checkBookTitle = $('#formBookTitle').val();
		
		if(checkBookCode == null || checkBookCode == ''){
			alert('북코드 없음');
		}
		else if(checkBookTitle == null || checkBookTitle == ''){
			alert('책이름 없음');
		}
		else{
			$('#bookRentForm').submit();
		}
	}
})(jQuery);
</script>
</head>
<body>
<div class="Audi3040">
	<!-- jumbyton -->
	<div class="jumbotron jumbotron-fluid headJubmotron">
		<div class="container">
			<h1 class="display-4 h1Jumbotron">신착 도서</h1>
			<p class="lead pJumbotron" >가장 최근에 도착한 도서 10선</p>
		</div>
	</div>
	<hr style="margin-bottom: 30px;">
	<div class="row justify-content-center">
		<div class="col-8">
			<c:forEach items="${newCommerList }" var="bookInfo">
			<div class="col border-bottom border-right oneBookDiv">
				<div class="row">
					<div class="col-3 text-center" style="height: 12rem;">
						<c:choose>
							<c:when test="${empty bookInfo.bookImageName }">
								<a href="/book/bookDetail?bookCode=${bookInfo.bookCode }">
									<img src="/resources/image/book/no_image.jpg" style="height: 100%;">
								</a>
							</c:when>
							<c:otherwise>
								<a href="/book/bookDetail?bookCode=${bookInfo.bookCode }">
									<img src="/resources/image/book/${bookInfo.bookImageName }" style="height: 100%;">
								</a>
							</c:otherwise>
						</c:choose>
					</div>
					<div class="col">
						<a href="/book/bookList?bookClass=${bookInfo.bookClass }" class="grey">
							<span class="badge badge-secondary" style="font-size: 0.9rem;">${bookInfo.bookClassName }</span>
						</a>
						<div class="col font-weight-bold titleMargin" style="font-size: 1.2rem;">
							<a href="/book/bookDetail?bookCode=${bookInfo.bookCode }" class="textBlack">
								${bookInfo.bookTitle }
							</a>
						</div>
						<div class="contentsDiv">
							<a href="/book/bookList?author=${bookInfo.author }&bookClass=10">
								<span class="clickable">${bookInfo.author }</span> <span class="grey">지음</span>
							</a> 
						</div>
						<div class="contentsDiv">
							<a href="/book/bookList?publisher=${bookInfo.publisher }&bookClass=10">
								<span class="clickable">${bookInfo.publisher }</span><span class="grey">, ${bookInfo.bookPublicationDate }</span> 
							</a>
						</div>
						<div class="contentsDiv">
							<span class="spanGrey">
								${bookInfo.acquisitionDate } 입관
							</span>
						</div>
					</div>
					<div class="col-2 align-self-center text-center" style="line-height: 100%">
						<c:choose>
							<c:when test="${bookInfo.isAvailable eq 'N'}">
								<input type="button" value="대여중" class="btn btn-danger">
							</c:when>
							<c:otherwise>
								<c:choose>
									<c:when test="${empty sessionScope.loginInfo }">
										<input type="button" value="대여가능" class="btn btn-success">
									</c:when>
									<c:otherwise>
										<%-- <form action="/rent/bookRentForm" method="post">
											<input type="hidden" name="bookCode" value="${bookInfo.bookCode }" required>
											<input type="submit" value="책대여" class="btn btn-primary">
											<input type="hidden" name="bookTitle" value="${bookInfo.bookTitle }" required>
										</form> --%>
										<input type="hidden" value="${bookInfo.bookCode }">
										<input type="button" value="책대여" class="btn btn-primary" onclick="makeBookRentForm(this);">
										<input type="hidden" value="${bookInfo.bookTitle }">
									</c:otherwise>
								</c:choose>
							</c:otherwise>
						</c:choose>
					</div>
				</div>
			</div>
			</c:forEach>
		</div>
	</div>
</div>
<form action="/rent/bookRentForm" method="post" id="bookRentForm">
	<!-- 책 대여를 위한 인풋 -->
	<input type="hidden" name="bookCode" id="formBookCode" value="">
	<input type="hidden" name="bookTitle" id="formBookTitle" value="">
	
	<input type="hidden" name="comeFrom" value="new">
</form>
</body>
</html>
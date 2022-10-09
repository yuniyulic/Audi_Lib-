<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
table {
	text-align: center;
}
</style>
<script type="text/javascript">
	selChange = function() {
		var sel = document.getElementById('cntPerPage').value;
		location.href = "/home/qna?nowPage=${paging.nowPage}&cntPerPage="
				+ sel;
	}
</script>
</head>
<body>
	<div class="Audi3040">
		<!-- jumbyton -->
		<div class="jumbotron jumbotron-fluid headJubmotron">
			<div class="container">
				<h1 class="display-4 h1Jumbotron">참여마당</h1>
				<p class="lead pJumbotron">QnA</p>
			</div>
		</div>
		<hr style="margin-bottom: 30px;">

		<nav class="navbar navbar-expand-lg navbar-light">
			<!-- ~줄보기 -->
			<div style="float: right;">
				<select id="cntPerPage" name="sel" onchange="selChange()">
					<option value="5" <c:if test="${paging.cntPerPage == 5 }">selected</c:if>>5줄 보기</option>
					<option value="10" <c:if test="${paging.cntPerPage == 10 }">selected</c:if>>10줄 보기</option>
					<option value="15" <c:if test="${paging.cntPerPage == 15 }">selected</c:if>>15줄 보기</option>
					<option value="20" <c:if test="${paging.cntPerPage == 20 }">selected</c:if>>20줄 보기</option>
				</select>
			</div>
			<!-- 옵션선택 끝 -->
			<button class="navbar-toggler" type="button" data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">QnA
							<span class="sr-only">(current)</span>
						</a>
					</li>
					<li class="nav-item active"></li>
				</ul>
				<form class="form-inline my-2 my-lg-0" method="post" action="/home/qna">
					<input class="form-control mr-sm-2" name="keyword" type="search" value="${paging.keyword }" placeholder="제목을 입력하세요." aria-label="Search">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">검색</button>
				</form>
			</div>
		</nav>

		<hr>
		<table class="table">
			<colgroup>
				<col width="10%">
				<col width="50%">
				<col width="10%">
				<col width="10%">
				<col width="10%">
				<col width="10%">
			</colgroup>
			<thead
				style="background-color: #014099; color: white; font-weight: bold;">
				<tr>
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">작성자</th>
					<th scope="col">날짜</th>
					<th scope="col">조회수</th>
					<th scope="col">공개여부</th>
				</tr>
			</thead>
			<tbody>
				<c:forEach items="${qnaList }" var="qnaList">
					<tr>
						<th scope="row">${qnaList.rn }</th>
						<td>
							<a href="/qna/detailQna?qnaCode=${qnaList.qnaCode}">
								${qnaList.qnaTitle }
							</a>
						</td>
						<td>${qnaList.memberName }</td>
						<td>${qnaList.regDate }</td>
						<td>${qnaList.readCnt }</td>
						<td>
							<c:if test="${qnaList.isSecurity eq 1}">비밀 게시글</c:if>
							<c:if test="${qnaList.isSecurity ne 1}">전체공개</c:if>
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>

		<!-- 페이징 -->
		<div style="display: block; text-align: center;">
			<c:if test="${paging.startPage != 1 }">
				<a href="/home/qna?nowPage=${paging.startPage - 1 }&cntPerPage=${paging.cntPerPage }">&lt;</a>
			</c:if>
			<c:forEach begin="${paging.startPage }" end="${paging.endPage }" var="p">
				<c:choose>
					<c:when test="${p == paging.nowPage }">
						<b>${p }</b>
					</c:when>
					<c:when test="${p != paging.nowPage }">
						<a href="/home/qna?nowPage=${paging.endPage + 1 }&cntPerPage=${paging.cntPerPage }">${p }</a>
					</c:when>
				</c:choose>
			</c:forEach>
			<c:if test="${paging.endPage != pagine.lastPage }">
				<a href="/home/qna?nowPage=${paging.endPage + 1 }&cntPerPage=${paging.cntPerPage }">&gt;</a>
			</c:if>
		</div>


		<div class="row">
			<div class="offset-11 col-1">
				<!-- @@@@@ 기능 구현 -->
				<button class="btn btn-primary" onclick="location.href='/qna/writeQna';">글쓰기</button>
			</div>
		</div>


	</div>
	<!-- Audi3040 -->
</body>
</html>
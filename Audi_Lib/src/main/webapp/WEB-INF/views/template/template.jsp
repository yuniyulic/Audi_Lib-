                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 <%@page import="Audi_Lib.board.controller.BoardController"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<%@page import="java.net.URLEncoder"%>
<title><tiles:insertAttribute name="title"/></title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"> 
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/fullPage/jquery.fullPage.js?ver=13"></script> 
<link rel="stylesheet" href="/resources/css/home/common.css?ver=551" style="text/css">
<link rel="stylesheet" href="/resources/fullPage/jquery.fullPage.css?ver=21" style="text/css">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
<style>

</style>

</head>
<body>
<div class="container">


	<div class="topMenu">
		<tiles:insertAttribute name="topMenu"/>
	</div>
	<div class="content">
		<div class="main ">
			<tiles:insertAttribute name="main"/>
		</div>
		
		<!-- footer -->
		<div class="footer">
			<hr class="hr">
			<ul class="nav justify-content-center text-center align-items-center row" style="height: 40px;">
				<li class="nav-item">
					<a class="nav-link" href="/home/personalInfo" style="color:red; font-weight: bold;">????????????????????????</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">?????????????????????</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/facility/libraryMap">??????????????????</a>
				</li>
			</ul>
			<hr class="hr">
	
			
			<ul class="nav justify-content-center text-center align-items-center row linkUl">
				<li class="nav-item list listTitle">?????? ????????????</li>
				<li class="nav-item list">
					<a href="https://www.nl.go.kr/" target="_blank" class="aTag">
						?????????????????????
					</a>
				</li>
				<li class="nav-item list">
					<a href="/resources/video/home_movie.mp4" target="_blank"class="aTag">download</a>
						??????????????????
				</li>
	
				<li class="nav-item list">
					<a href="https://www.dlibrary.go.kr/" target="_blank" class="aTag">
						?????????????????????
					</a>
				</li>
				<li class="nav-item list">
					<a href="https://scienceon.kisti.re.kr/main/mainForm.do" target="_blank" class="aTag">
						Science ON
					</a>
				</li>
				<li class="nav-item list">
					<a href="https://scholar.google.co.kr/" target="_blank" class="aTag">
						Google Scholar
					</a>
				</li>
				<li class="nav-item list">
					<a href="http://www.rinfo.kr/" target="_blank" class="aTag">
						Rinfo(???????????????????????????)
					</a>
				</li>
			</ul>
	
			<div class="row">
				<div class="col" style="padding : 60px 100px;">
					?????? : (44677)?????? ?????? ?????????35?????? 19 2??? / (680-828)??????????????? ?????? ????????? 679-8<br>
					TEL : 052)0000-0000~1 / Fax : 052)0000-0002~3<br><br>
					Copyright 2021 Audi Library. All Rights Reserved.
				</div>
				<div class="col" style="padding : 60px 100px;  text-align: right;">
					<img alt="????????????" src="/resources/image/home/footerLogo.png" style="width: 15%;">
				</div>
			</div>
			
		</div>
		
		
	</div>
</div>

</body>
</html>
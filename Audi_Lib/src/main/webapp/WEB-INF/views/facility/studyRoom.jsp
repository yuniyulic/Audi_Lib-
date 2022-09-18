<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/resources/js/member/jquery.validate.js"></script>
<script type="text/javascript" src="/resources/js/facility/studyRoom.js"></script>
<link rel="stylesheet" href="/resources/css/facility/common.css?ver=1">
<link rel="stylesheet" href="/resources/css/facility/studyroom.css?ver=12332345">
</head>
<body>
<div class="Audi3040">
<!-- jumbotron -->
<div class="jumbotron jumbotron-fluid headJubmotron">
  <div class="container">
    <h1 class="display-4 h1Jumbotron">시설 이용</h1>
    <p class="lead pJumbotron" >스터디룸 이용</p>
  </div>
</div>
	<div class="row justify-content-around studyMenu">
		<div class="offset-2 col-4 studyMenu">
		<a href="/facility/studyRoomInfo">
			스터디룸 이용안내
		</a>
		</div>
		<div class="col-4 studyMenu">
			<a href="/facility/studyRoom">스터디룸 예약</a>
		</div>
	</div>
	<hr style="margin-bottom: 30px;">
<!-- jumbotron 끝 -->

    <p></p>
    <h3 align="left">스터디룸 예약 날짜를 클릭하세요.</h3>
    <div class="row">
       <div class="col">
          <table id="calendar">
             <tr class="calHeadTr"><!-- label은 마우스로 클릭을 편하게 해줌 -->
                 <td>
                 <label onclick="prevCalendar()" style="cursor: pointer;">
                    <
                 </label>
                 </td>
                 <td align="center" id="tbCalendarYM" colspan="5">
                    yyyy년 m월
                 </td>
                 <td>
                    <label onclick="nextCalendar()" style="cursor: pointer;">
                       >
                    </label>
                 </td>
             </tr>
             <tr class="calBodyTr">
                 <td align="center" style="color: red">일</td>
                 <td align="center">월</td>
                 <td align="center">화</td>
                 <td align="center">수</td>
                 <td align="center">목</td>
                 <td align="center">금</td>
                 <td align="center"  style="color: blue;">토</td>
             </tr> 
         </table>
       </div>
       <div class="col"> <!-- 예약 입력 -->
          예약 입력
          <div class="reser_form">
            <form id="reserveStudyRoom" method="post" action="/facility/reserveStudyRoom">
            <!-- 선택날짜 hidden태그 생기는 위치 -->
               <ul>
                  <li>
                     <label for="studyRoomCode">스터디룸선택</label>
                     <select name="studyRoomCode" id="studyRoomCode" class="choiceSRoom" required>
                        <option value="0">스터디룸을 선택하세요</option>
                        <c:forEach items="${studyRoomList }" var="studyRoom">
                           <option value="${studyRoom.studyRoomCode }">
                              ${studyRoom.studyRoomName }
                           </option>
                        </c:forEach>
                     </select>
                  </li>
                  <li>
                     <label for="rentTime" id="rentLi">사용시간</label>
                     <input type="text" name="rentTime2" id="rentTime" onclick="selectUseTime()" data-toggle=modal data-target=.modalBox2 placeholder="여기를 클릭하세요." required readonly>
                  </li>
                  <li>
                     <label for="rentStu">인원</label>
                     <input type="number" maxlength="2" max="10" min="1" name="rentStu" id="rentStu" placeholder="최대 : 10명(대토론실 : 50명)" required>
                  </li>
                  <li>
                     <!-- 사용시간 클릭 시 모달 -->
                     <div class="modal fade modalBox2" id=
                     "" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                       <div class="modal-dialog">
                         <div id="modal-content-studyRoom" class="modal-content-studyRoom">
                           <div class="modal-header" id="modalHead2">
                             <h5 class="modal-title"  id="modalHead3">
                                 <b style="font-size: 12px; color: black;">최대 4시간만 예약할 수 있습니다.</b><br>
                                <b style="font-size: 12px; color: black;">연속해서 시간을 선택해주세요.</b>
                             </h5>
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true">&times;</span>
                             </button>
                           </div>
                           <div id="modal-body">
                          
                               <div class="row usingTimeRow">
                              <div class="offset-1 col-9 checkTime">
                              <table id="timeTableModal">
                                 <tbody class="checkTable">
                                    <tr>
                                       <td class="checkTd"><input type="checkbox" class="rentTime" id="-0900" value="-0900" name="rentTime" style="width: 25px;">09:00 - 10:00</td>
                                       <td id="-09001" style="color: #014099; font-weight: bold;" class="reserveText">예약가능</td>
                                    </tr>
                                    <tr>
                                       <td class="checkTd"><input type="checkbox" class="rentTime" id="-1000" value="-1000" name="rentTime" style="width: 25px;">10:00 - 11:00</td>
                                       <td id="-10001" style="color: #014099; font-weight: bold;" class="reserveText">예약가능</td>
                                    </tr>
                                    <tr>
                                       <td class="checkTd"><input type="checkbox" class="rentTime" id="-1100" value="-1100" name="rentTime" style="width: 25px;">11:00 - 12:00</td>
                                       <td id="-11001" style="color: #014099; font-weight: bold;" class="reserveText">예약가능</td>
                                    </tr>
                                    <tr>
                                       <td class="checkTd"><input type="checkbox" class="rentTime" id="-1200" value="-1200" name="rentTime" style="width: 25px;">12:00 - 13:00</td>
                                       <td id="-12001" style="color: #014099; font-weight: bold;" class="reserveText">예약가능</td>
                                    </tr>
                                    <tr>
                                       <td class="checkTd"><input type="checkbox" class="rentTime" id="-1300" value="-1300" name="rentTime" style="width: 25px;">13:00 - 14:00</td>
                                       <td id="-13001" style="color: #014099; font-weight: bold;" class="reserveText">예약가능</td>
                                    </tr>
                                    <tr>
                                       <td class="checkTd"><input type="checkbox" class="rentTime" id="-1400" value="-1400" name="rentTime" style="width: 25px;">14:00 - 15:00</td>
                                       <td id="-14001" style="color: #014099; font-weight: bold;" class="reserveText">예약가능</td>
                                    </tr>
                                    <tr>
                                       <td class="checkTd"><input type="checkbox" class="rentTime" id="-1500" value="-1500" name="rentTime" style="width: 25px;">15:00 - 16:00</td>
                                       <td id="-15001" style="color: #014099; font-weight: bold;" class="reserveText">예약가능</td>
                                    </tr>
                                    <tr>
                                       <td class="checkTd"><input type="checkbox" class="rentTime" id="-1600" value="-1600" name="rentTime" style="width: 25px;">16:00 - 17:00</td>
                                       <td id="-16001" style="color: #014099; font-weight: bold;" class="reserveText">예약가능</td>
                                    </tr>
                                    <tr>
                                       <td class="checkTd"><input type="checkbox" class="rentTime" id="-1700" value="-1700" name="rentTime" style="width: 25px;">17:00 - 18:00</td>
                                       <td id="-17001" style="color: #014099; font-weight: bold;" class="reserveText">예약가능</td>
                                    </tr>
                                 </tbody>
                              </table>
                              </div>        
                                 </div>
                                 <div class="alreadyTime" id="makeInput">
                                 
                                 </div>
                           </div>   <!-- modal-body끝  -->
                           <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="insertTime('')">선택 완료</button>
                           </div>
                         </div>
                       </div>
                     </div>
                     <button type="submit" id="sec_check" class="btn btn-primary" value="예약">예약</button>
                  </li>
               </ul>
            </form>
         </div>
       </div><!-- 예약 입력col -->
    </div>
</div> <!-- Audi3040 -->



<script type="text/javascript">
    buildCalendar();
</script>
</body>
</html>
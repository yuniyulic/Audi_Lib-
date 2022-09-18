
/* 페이지 로딩 후 실행 */ 
$(document).ready(function(){ 


}); /*로딩화면 끝*/ 

 

/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/ 

 

/* 함수선언 영역*/ 

(function($){ 

	//날짜 클릭했을 때 함수
  	addEvent = function(i, year, month){
  		let parkingDate = year + '-' + month + '-' + i;
  		//모달창 열림
		$.ajax({ 
        url: '/facility/selectParkingOfParkingDate', //요청경로, 어떤 controller로갈까 
        type: 'post', 
        data:{'parkingDate':parkingDate}, //필요한 데이터 
        success: function(result) {
        	let num = 0;
       		$('.changeColor').css('color', 'black');
        	while(num < result.length){
        		let parkingLoc = result[num].parkingLoc;
        		let isAfternoon = result[num].isAfternoon;
        		$('.' + parkingLoc + ' .' + isAfternoon).css('color', 'red');
        		num ++;
        	}
           
        }, 
        error: function(){ 
         //ajax 실행 실패 시 실행되는 구간 
           alert('실패'); 
        } 
 		 }); //ajax       		
  		
  		$('.deleteDay').remove();
  		let str = '<div class="deleteDay" data-today="'+ year + '-' + month + '-' + i + '">' + year + '년 ' + month + '월 ' + i + '일 주차장 예약하기' + '</div>'; 
  		str += '<input type="hidden" name="parkingDate" value="'+ year + '-' + month + '-' + i + '" class="deleteDay" id="dateId">';
  		str += '<input type="hidden" name="selectParkingDate" value="'+ year + '' + month + '' + i + '" class="deleteDay">';
  		str += '<div class="deleteDay selectDate" id="selectDate2" value="'+ year + '' + month + '' + i +'">';
  		$('#modalHead').after(str); 
  	};
  	
  	//예약 취소
  	cancelReserve = function(){
  		$.ajax({ 
  	        url: '/facility/cancelReserve', //요청경로, 어떤 controller로갈까 
  	        type: 'post', 
  	        data:{'parkingDate':$('#dateId').val()}, //필요한 데이터 
  	        success: function(result) {
  	        	if(result == 1){
  	        		alert('예약취소가 완료되었습니다.');
  	        	}else{
  	        		alert('예약현황이 없습니다.');
  	        	}
  	        }, 
  	        error: function(){ 
  	         //ajax 실행 실패 시 실행되는 구간 
  	           alert('실패'); 
  	        } 
  	 		 }); //ajax
  		
  		
  	}
  	

  	//모달에서예약버튼 눌럿을때, 주차장,오전오후 선택했는지 확인 후 submit
  	reserveParking = function(){
  		//선택한날짜를 가져옴
  		
  		//선택한 날짜에 이사람이 예약햇는지 확인 후 예약
  		$.ajax({ 
  	        url: '/facility/isParkingTodayOfPerson', //요청경로, 어떤 controller로갈까 
  	        type: 'post', 
  	        data:{'parkingDate':$('.deleteDay').attr('data-today')}, //필요한 데이터 
  	        success: function(result) {
  	        	if(result == 1){
  	        		alert('해당일은 이미 예약하셨습니다.')
  	        	}
  	        	else if(result == 2){
  	        		location.href='/facility/uNeedLogin';
  	        	}
  	        	else{
  	        	//주차장선택했는지 확인
  	        		let is1 = $('#PARKING_1').is(':checked');
  	        		let is2 = $('#PARKING_2').is(':checked');
  	        		let is3 = $('#PARKING_3').is(':checked');
  	        		let is4 = $('#PARKING_4').is(':checked');
  	        		let is5 = $('#PARKING_5').is(':checked');
  	        		let is6 = $('#PARKING_6').is(':checked');
  	        		let is7 = $('#PARKING_7').is(':checked');
  	        		let is8 = $('#PARKING_8').is(':checked');
  	        		let is9 = $('#PARKING_9').is(':checked');
  	        		let is10 = $('#PARKING_10').is(':checked');
  	      		if(is1 == false && is2 == false && is3 == false && is4 == false && is5 == false && is6 == false && is7 == false && is8 == false && is9 == false && is10 == false){
  	      			alert('주차장을 선택해주세요.');
  	      			return;
  	      		}
  	      		
  	      		//오전 오후 선택했는지 확인
  	        		let isTrue = $('.afternoonN').is(':checked');
  	        		let isTrue2 = $('.afternoonY').is(':checked')
  	        		
  	      		if(isTrue == false && isTrue2 == false){
  	      			alert('오전 또는 오후를 선택해주세요.');
  	      			return;
  	      		}else{
  	      			//예약
  	      			$('#reserveParkingForm').submit();
  	      		}
  	        	}
  	        }, 
  	        error: function(){ 
  	         //ajax 실행 실패 시 실행되는 구간 
  	           alert('실패'); 
  	        } 
  	 		 }); //ajax   
  		
  		
  		
  		
  		
  	}
  	
})(jQuery); /*함수선언영역 끝*/ 






var today = new Date();//오늘 날짜//내 컴퓨터 로컬을 기준으로 today에 Date 객체를 넣어줌
var date = new Date();//today의 Date를 세어주는 역할

	//이전 달	
function prevCalendar() {
// 이전 달을 today에 값을 저장하고 달력에 today를 넣어줌
//today.getFullYear() 현재 년도//today.getMonth() 월  //today.getDate() 일 
//getMonth()는 현재 달을 받아 오므로 이전달을 출력하려면 -1을 해줘야함
 today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
 buildCalendar(); //달력 cell 만들어 출력 
}

	//다음 달
function nextCalendar() {
    // 다음 달을 today에 값을 저장하고 달력에 today 넣어줌
    //today.getFullYear() 현재 년도//today.getMonth() 월  //today.getDate() 일 
    //getMonth()는 현재 달을 받아 오므로 다음달을 출력하려면 +1을 해줘야함
     today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
     buildCalendar();//달력 cell 만들어 출력
}
	
	
	//현재 달 달력 만들기
function buildCalendar(){
    var doMonth = new Date(today.getFullYear(),today.getMonth(),1);
    //이번 달의 첫째 날,
    //new를 쓰는 이유 : new를 쓰면 이번달의 로컬 월을 정확하게 받아온다.     
    //new를 쓰지 않았을때 이번달을 받아오려면 +1을 해줘야한다. 
    //왜냐면 getMonth()는 0~11을 반환하기 때문
    
    
    var lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);
    //이번 달의 마지막 날
    //new를 써주면 정확한 월을 가져옴, getMonth()+1을 해주면 다음달로 넘어가는데
    //day를 1부터 시작하는게 아니라 0부터 시작하기 때문에 
    //대로 된 다음달 시작일(1일)은 못가져오고 1 전인 0, 즉 전달 마지막일 을 가져오게 된다
    
    var tbCalendar = document.getElementById("calendar");
    //날짜를 찍을 테이블 변수 만듬, 일 까지 다 찍힘
    
    var tbCalendarYM = document.getElementById("tbCalendarYM");
    //테이블에 정확한 날짜 찍는 변수
    //innerHTML : js 언어를 HTML의 권장 표준 언어로 바꾼다
    //new를 찍지 않아서 month는 +1을 더해줘야 한다. 
    tbCalendarYM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월"; 
    
     /*while은 이번달이 끝나면 다음달로 넘겨주는 역할*/
    while (tbCalendar.rows.length > 2) {
    //열을 지워줌
    //기본 열 크기는 body 부분에서 2로 고정되어 있다.
          tbCalendar.deleteRow(tbCalendar.rows.length-1);
          //테이블의 tr 갯수 만큼의 열 묶음은 -1칸 해줘야지 
        //30일 이후로 담을달에 순서대로 열이 계속 이어진다.
     }
     var row = null;
     row = tbCalendar.insertRow();
     //테이블에 새로운 열 삽입//즉, 초기화
     var cnt = 0;// count, 셀의 갯수를 세어주는 역할
    // 1일이 시작되는 칸을 맞추어 줌
     for (i=0; i<doMonth.getDay(); i++) {
     /*이번달의 day만큼 돌림*/
          cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
          cnt = cnt + 1;//열의 갯수를 계속 다음으로 위치하게 해주는 역할
     }
    /*달력 출력*/
     for (i=1; i<=lastDate.getDate(); i++) { 
     //1일부터 마지막 일까지 돌림
          cell = row.insertCell();//열 한칸한칸 계속 만들어주는 역할
          cell.innerHTML = i;//셀을 1부터 마지막 day까지 HTML 문법에 넣어줌
          cnt = cnt + 1;//열의 갯수를 계속 다음으로 위치하게 해주는 역할
      if (cnt % 7 == 1) {/*일요일 계산*/
          //1주일이 7일 이므로 일요일 구하기
          //월화수목금토일을 7로 나눴을때 나머지가 1이면 cnt가 1번째에 위치함을 의미한다
        cell.innerHTML = "<font color=#F79DC2><a onclick=addEvent(" + i + "," + year + "," + month + ") data-toggle=modal data-target=.modalBox1 class=cursorsun>" + i
        //1번째의 cell에만 색칠
  	  }
      else{
    	  //날짜 클릭
    	  var year = today.getFullYear();
    	  var month = today.getMonth() + 1;
    	  cell.innerHTML = "<a onclick=addEvent(" + i + "," + year + "," + month + ") class=cursor data-toggle=modal data-target=.modalBox1>" + i
      }
      if (cnt%7 == 0){/* 1주일이 7일 이므로 토요일 구하기*/
          //월화수목금토일을 7로 나눴을때 나머지가 0이면 cnt가 7번째에 위치함을 의미한다
          cell.innerHTML = "<font color=skyblue><a onclick=addEvent(" + i + "," + year + "," + month + ") data-toggle=modal data-target=.modalBox1 class=cursorsat>" + i
          //7번째의 cell에만 색칠
           row = calendar.insertRow();
           //토요일 다음에 올 셀을 추가
      }
      /*오늘의 날짜에 노란색 칠하기*/
      if (today.getFullYear()/*나와잇는 날짜 */ == date.getFullYear()//오늘날짜
         && today.getMonth() == date.getMonth()
         && i == date.getDate()) {
          //달력에 있는 년,달과 내 컴퓨터의 로컬 년,달이 같고, 일이 오늘의 일과 같으면
        cell.bgColor = "#FAF58C";//셀의 배경색을 노랑으로
        
        //오늘날짜값을 hidden으로 modal의 form태그 안에넣어준다.
        let todayDate = document.getElementById("isAfternoon2");
        todayDate.innerHTML = '<input type="hidden" value="' + date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '" name="todayDate">';

       }
     }
}
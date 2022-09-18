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
                cell.innerHTML = "<a onclick=addEvent(" + year + "," + month + "," + i + ")  class=cursorsun id="+ year + '-' + month + '-' + i + ">" + i
                //1번째의 cell에만 색칠
               }
              else{
                 //날짜 클릭
                 var year = today.getFullYear();
                 var month = today.getMonth() + 1;   /* data-toggle=modal data-target=.modalBox1 */
                 cell.innerHTML = "<a onclick=addEvent(" + year + "," + month + "," + i + ") class=cursor id="+ year + '-' + month + '-' + i + ">" + i
              }
              if (cnt%7 == 0){/* 1주일이 7일 이므로 토요일 구하기*/
                  //월화수목금토일을 7로 나눴을때 나머지가 0이면 cnt가 7번째에 위치함을 의미한다
                  cell.innerHTML = "<a onclick=addEvent(" + year + "," + month + "," + i + ") class=cursorsat id="+ year + '-' + month + '-' + i + ">" + i
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
                let todayDate = document.getElementById("makeInput");
                todayDate.innerHTML = '<input type="hidden" value="' + date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate() + '" name="todayDate">';
               }
             }
        }
         
         
         
         
         
        /* 페이지 로딩 시 실행 */
         $(document).ready(function(){ 
            //initValidation();   /* validation처리 */
            
            /* 체크박스 체크 최대갯수 4개로 제한 */
             $("input[name=rentTime]:checkbox").change(function() {// 체크박스들이 변경됬을때
                 if( 4 == $("input[name=rentTime]:checkbox:checked").length ) {
                     $(":checkbox:not(:checked)").attr('disabled", "disabled');
                 } else {
                  //4개 이dp s하가 되면 예약가능인것의 disabled를 삭제한다.                
                  if($('.reserveText').css('font-weight', 'bold')){
                           $('input[width=25px]').removeAttr('disabled');
                  }
                 }
             });
            
            //스터디룸이 바뀔때마다
             $(document).on('change', '#studyRoomCode', function() {  
					let studyRoomCode = $('.choiceSRoom').val();
					//대토론실이면 max 50
					if(studyRoomCode == 'STUDY_ROOM_1'){
						$('#rentStu').attr('max', '50');
					}else{
						$('#rentStu').attr('max', '10');
					}
            	});  
            
         }); /*로딩화면 끝*/     
            
            
         
            (function($) {
            //사용시간 select 후 선택완료클릭
                  insertTime = function(){
                     if($('#studyRoomCode').val() == 0){
                        alert('스터디룸을 먼저 선택하세요.');
                     }
                     let rentTime = "";
                     for (var i = 0; i < 9; i++) {
                        rentTime += $('.checkTable').children().eq(i).children().eq(0).children().eq(0).val();
                        rentTime += ',';
                     }
                     
                      const rentDate = $('#selectDay').val();
                     
                     if(rentDate == null){
                        alert('날짜를 먼저 선택해주세요.');
                     }
                     
                     $('.deleteTime').remove();   //hiden으로 만든 div없애줌(시간 다시선택 시)
                     $('#rentTime').val("");   //rentTIme의 value값 초기화
                     let sum = 0;   //총시간 초기화
                     
                     //선택되있는것 찾아서 div만들어줌
                     for (var i = 0; i < 9; i++) {   //br태그를 먹기땜시 +2씩 해준다.
                           if($('.checkTable').children().eq(i).children().eq(0).children().eq(0).is(':checked')){
                              let rentTime = $('.checkTable').children().eq(i).children().eq(0).children().eq(0).val();   //선택한 곳의 value값을 가져옴
                              let str = '<input type="hidden" name="rentTime" value="'+ rentTime + '" class="deleteTime">';   //hiden으로 post넘겨줄 준비
                               sum += 1;   //하나선택할때마다 1시간 추가
                           $('#reserveStudyRoom').append(str);   //form태그에 넣음
                           }
                  }
                     $('#rentTime').val("총 " + sum + "시간");
                  } //사용시간 선택 후 클릭 끝
                  
                  
                  
                  
                  //사용시간 클릭 시 모달 띄우기 전
                  selectUseTime = function(){
                     for (var i = 0; i < 9; i++) {
                     }
                     
                     studyRoomCode = $('#studyRoomCode').val();
                     $('#rentTime').attr('data-toggle', 'modal');
                     let rentTime = "";
                     for (var i = 0; i < 9; i++) {
                        rentTime += $('.checkTable').children().eq(i).children().eq(0).children().eq(0).val();
                        rentTime += ',';
                     }
                     
                      const rentDate = $('#selectDay').val();
                      
                     if(rentDate == undefined){
                        alert('날짜를 먼저 선택해주세요.');
                     //모달 실행안되게 하기
                     $('#rentTime').attr('data-toggle', 'none');
                        //함수에서 나가기
                        return; 
                     };
                     
                     //스터디룸 선택안되어있으면 스터디룸먼저 선택하게 한다.
                     if($('#studyRoomCode').val() == 0){
                        alert('스터디룸을 먼저 선택해주세요.');
                     //모달 실행안되게 하기
                     $('#rentTime').attr('data-toggle', 'none');
                        //함수에서 나가기
                        return; 
                     };
                     
                  //해당날짜 예약현황확인
                     $.ajax({ 
                        url: '/facility/isRentTime', //요청경로, 어떤 controller로갈까 
                        type: 'post', 
                        data:{'rentTime':rentTime, 'rentDate':rentDate, 'studyRoomCode':studyRoomCode}, //필요한 데이터 
                        success: function(result) {
                           
                           //예약현황이 있으면
                           if(result != ''){
                              let fullRentDate = $(result)[0].fullRentDate;
                              $('.deleteModalTitleDay').remove();
                              $('#modalHead2').before('<b style="margin: 0 auto; margin-top:5px;" class="deleteModalTitleDay">' + fullRentDate + '예약현황<b>')
                           }
                           //null이면 날짜를 안가져와서 다르게 가져와야될듯
                           

                           //색상 전부 초기화, 예약가능으로 바꾸기
                           for(var i = 0; i < 9; i++){
                              $('.reserveText').text('예약가능');
                              $('.rentTime').prop('disabled', false);
                              $('.rentTime').css('width', '25px');
                              $('.checkTable').children().eq(i).children().eq(1).css('color', '#014099');
                              $('.checkTable').children().eq(i).children().eq(1).css('font-weight', '#bold');
                              $('.rentTime').parent().css('background-color', '#FFFFFF');
                           }
                           
                           //select햇는데 암것도 없으면 예약현황이 없습니다.
                           if(result == ''){
                           }else{
                              //날짜와 장소에맞는 값을 가져온 갯수만큼 반복
                              for(var i in result){
                               if($('#' + $(result)[i].rentDate).val() == $(result)[i].rentDate){
                                  $('#' + $(result)[i].rentDate).prop('disabled', true);
                                  $('#' + $(result)[i].rentDate).css('width', '26px');
                                  //예약가능인 text를 비워준다.
                                  $('#' + $(result)[i].rentDate + '1').text('');
                                  $('#' + $(result)[i].rentDate + '1').append('<h5 style="color: #D50000; font-size:14px;">예약완료</h5>');
                                  $('#' + $(result)[i].rentDate).parent().css('background-color', '#F5F5F5');
                               }
                              }
                           }
                        }, 
                        error: function(){ 
                         //ajax 실행 실패 시 실행되는 구간 
                           alert('실패'); 
                        } 
                      }); //ajax 
                  }
               
               //날짜 클릭했을 때 함수
                  addEvent = function(year, month, i){
                     let tYear = date.getFullYear();
                     let tMonth = date.getMonth() + 1;
                     let tDay = date.getDate();
                  	 let today = tYear + '-' + tMonth + '-' + tDay;
                  
                     /* 일요일 css 원본으로 */
                     $('.cursorsun').css('color', 'red');
                     $('.cursorsun').css('font-size', '20px');
                     $('.cursorsun').css('background-color', 'white');
                     
                     /* 토요일 css 원본으로 */
                     $('.cursorsat').css('color', 'blue');
                     $('.cursorsat').css('font-size', '20px');
                     $('.cursorsat').css('background-color', 'white');
                     
                     /* 평일 css 원본으로 */
                     $('.cursor').css('color', 'black');
                     $('.cursor').css('font-size', '20px');
                     $('.cursor').css('background-color', 'white');
                     
                     /* 오늘 날짜 배경색 원본으로 */
                     $('#' + today).css('background-color', '#FAF58C');
                     
                     /* 클릭한날짜 */
                     let colorDate = year + '-' + month + '-' + i;
                     /* 클릭한 날짜의 스타일 */
                     $('#' + colorDate).css('color', 'white');
                     $('#' + colorDate).css('font-size', '1.7rem');
                     $('#' + colorDate).css('background-color', '#014099');
                     $('#' + colorDate).css('border-radius', '30px');
                     $('#' + colorDate).css('padding', '10px');
                     
                     
                     $('.deleteDay').remove();
                     let str = '<input type="hidden" name="rentDate" value="'+ year + '-' + month + '-' + i + '" class="deleteDay" id="selectDay"">';
                     str += '<input type="hidden" name="selectParkingDate" value="'+ year + '' + month + '' + i + '" class="deleteDay">';
                     
                      $('#reserveStudyRoom').append(str);
                     
                  };
               
               
               initValidation = function(){
                  
                   //특수 문자는 제외하는 정규식을 validation에 추가  
                   jQuery.validator.addMethod("alphanumeric", function(value, element) { 
                               return this.optional(element) || !/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/.test(value); 
                   });
                               
                   jQuery.validator.addMethod("onlyKorean", function(value, element) {
                      return this.optional(element) || /^[가-힣]+$/.test(value);
                   });
                   
                   
                   jQuery.validator.addMethod("secretNumber", function(value, element) {
                      return this.optional(element) || /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(value);
                   });
       
                   jQuery.validator.addMethod("emailLogic", function(value, element) {
                      return this.optional(element) || /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(value);
                   });
                   
                     $("#reserveStudyRoom").validate({
                      // 테스트를 위하여 유효성 검사가 완료되어도 submit을 처리하지 않음. 
                          debug : true, 
                          //유효성 검사를 제외할 엘레먼트를 넣는다. 
                          //ignore: ".ignore", 
                          //포커스가 떠날 때 유효성 검사를 한다. 
                          onfocusout: function(element) {  
                                $(element).valid();  
                             }, 
                          //onfocusout: false, 
                          //각각의 input태그에 필요한 검증 조건 나열 
                          rules : { 
                           studyRoomCode : { 
                                required : true 
                             }, 
                     memberTel : {         
                              required : true
                              , minlength : 11
                              , maxlength : 11
                           }, 
                           roomRentMember : { 
                                required : true 
                                , minlength : 2
                                 , alphanumeric : true 
                                 , onlyKorean : true
                             }, 
                           rentDate : { 
                              maxlength : 30
                             }, 
                           rentTime2 : { 
                                required : true 
                             }, 
                           rentStu : { 
                                required : true 
                                , alphanumeric : true
                                , max : 10
                                , maxlength : 2
                                , min : 2
                             } 
                          }, 
                          //검사를 충족하지 못할 경우 표시될 메시지의 나열                                                          
                          messages : { 
                           studyRoomCode : { 
                                required : '필수 선택' 
                             }, 
                      memberTel : {         
                         required : '필수 선택' 
                              , minlength : '올바른 번호를 입력해주세요.'
                              , maxlength : '올바른 번호를 입력해주세요.'
                           },                
                           roomRentMember : { 
                                required : '필수 입력'
                                , minlength : '최소 2글자 이상 입력해주세요.'
                                , alphanumeric : '특수문자는 들어올 수 없습니다.'
                                , onlyKorean : '한국이름을 입력하세요'
                             }, 
                           rentDate : { 
                              maxlength : '날짜 선택'
                             }, 
                           rentTime2 : { 
                                required : '필수 선택' 
                             }, 
                           rentStu : { 
                                required : '필수 입력' 
                               , alphanumeric : '특수문자는 들어올 수 없습니다.'
                               , max : '최대 10명 입니다.'
                               , maxlength : '최대 10명 입니다.'
                               , min : '최소 2명 이상입니다'
                             }
                          }, 
                          submitHandler: function(form) {
                              form.submit();
                          } 
                     }); 

                   }
            })(jQuery);
            
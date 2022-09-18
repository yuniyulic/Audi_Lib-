// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('252ec93ace848052c76aed5e5da9170b');

// SDK 초기화 여부를 판단합니다.
console.log(Kakao.isInitialized());

function loginFormWithKakao() {
  Kakao.Auth.loginForm({
    success: function(authObj) {

      Kakao.API.request({
	        url: '/v2/user/me',
	        success: function(res) {
	        	const accessToken = Kakao.Auth.getAccessToken();
	        	alert(accessToken);
	        	Kakao.Auth.setAccessToken(accessToken);
	        	
	        	console.log(JSON.stringify(res.kakao_account.email));
	        	
	        	const kakaoId = JSON.stringify(res.kakao_account.email);
	        	alert(kakaoId);
	        	
	        	location.href = '/member/showKakaoData?kakaoId=' + kakaoId;
	        	
	        },
	        fail: function(error) {
	          alert(JSON.stringify(error));
	        }
	      });
    
    },
    fail: function(err) {
      showResult(JSON.stringify(err))
    },
  })
}





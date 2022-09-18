function kakaoLogout(){
	
	// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
	Kakao.init('252ec93ace848052c76aed5e5da9170b');

	// SDK 초기화 여부를 판단합니다.
	console.log(Kakao.isInitialized());
	
	if(!Kakao.Auth.getAccessToken()){
		alert('Not logged in.');
		return;
	}
	
	Kakao.Auth.logout(function(){
		console.log(Kakao.Auth.getAccessToken());
		location.href = '/home/logout';
	});
}
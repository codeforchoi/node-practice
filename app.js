// express를 사용해 웹서버를 띄우고 브라우저가 요청한 경로로 이동해주는 라우팅 기능을 실습 (#3)

const express = require("express");     // require 명령어로 express 라는 모듈을 다운받아준다.
const app = express();                  // app 이라는 변수에 express를 실행시킴

app.get("/", (req, res) => {            // req는 요청 request, res는 응답 response
    res.send("여기는 루트입니다.");   
});

app.get("/login", (req, res) => {
    res.send("여기는 로그인 화면입니다.");
});

app.listen(3000, () => {                // listen이라는 명령어로 서버를 띄울 수 있음. (첫번째 매개변수: 3000번 포트로 열어주고, 두번째 매개변수: callback함수를 넘길 수 있음)
    console.log("서버 가동");            // 서버 콘솔에 서버가동 띄움.
});
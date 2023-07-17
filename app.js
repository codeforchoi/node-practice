// html 문서를 효율적으로 views 세팅을 하여 작성해준 코드 (# 6)

const express = require("express");     // require 명령어로 express 라는 모듈을 다운받아준다.
const app = express();                  // app 이라는 변수에 express를 실행시킴

// 앱 세팅
app.set("views", "./views");            // 앱 세팅에 views를  파일이 저장될 폴더임을 지정
app.set("view engine", "ejs");          // view engine을 ejs로 설정 (views폴더 안에 생성될 html코드들을 ejs엔진으로 해석하도록 정해줌)

app.get("/", (req, res) => {            // req는 요청 request, res는 응답 response
   res.render("home/index");            // 해당 경로로 이동할 수 있도록 해주는 기능
});

app.get("/login", (req, res) => {
    res.render("home/login");           // 해당 경로로 이동할 수 있도록 해주는 기능
});

app.listen(3000, () => {                // listen이라는 명령어로 서버를 띄울 수 있음. (첫번째 매개변수: 3000번 포트로 열어주고, 두번째 매개변수: callback함수를 넘길 수 있음)
    console.log("서버 가동");            // 서버 콘솔에 서버가동 띄움.
});
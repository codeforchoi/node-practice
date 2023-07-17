"use strict";                           // javascript 파일을 만들 때는 항상 이 문구를 넣어서 자바스크립트의 구문이 실행되는 환경을 설정하는 예약어 "엄격모드" 이다.

// 모듈
const express = require("express");     // require 명령어로 express 라는 모듈을 다운받아준다.
const app = express();                  // app 이라는 변수에 express를 실행시킴

// 라우팅
const home = require("./src/routes/home");  // home 변수에 폴더를 상대적으로 경로 명시해줌.

// 앱 세팅
app.set("views", "./src/views");            // 앱 세팅에 views를  파일이 저장될 폴더임을 지정
app.set("view engine", "ejs");          // view engine을 ejs로 설정 (views폴더 안에 생성될 html코드들을 ejs엔진으로 해석하도록 정해줌)

// 라우팅 연결 
app.use("/", home);                     // use는 미들웨어를 등록하는 메서드, 첫번째 매개변수: "/" 루트라는 경로로 들어오면 두번째 매개변수: home으로 보내줄 것이다.

module.exports = app;
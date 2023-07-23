"use strict";                                       // javascript 파일을 만들 때는 항상 이 문구를 넣어서 자바스크립트의 구문이 실행되는 환경을 설정하는 예약어 "엄격모드" 이다.

// 모듈
const express = require("express");                 // require 명령어로 express 라는 모듈을 다운받아준다.
const bodyParser = require("body-parser");          // req.body를 파싱해서 출력해줄 수 있도록 하는 모듈 
const dotenv = require("dotenv");                   // 환경변수를 관리하는 모듈

const app = express();                              // app 이라는 변수에 express를 실행시킴
dotenv.config();                                    // dotenv모듈을 동작시킴.

// 라우팅
const home = require("./src/routes/home");          // home 변수에 폴더를 상대적으로 경로 명시해줌

const logger = require("./src/config/logger");      // winston모듈(로그관리) 가져옴.
logger.info("로그 기록 테스트");

// 앱 세팅
app.set("views", "./src/views");                        // 앱 세팅에 views를  파일이 저장될 폴더임을 지정
app.set("view engine", "ejs");                          // view engine을 ejs로 설정 (views폴더 안에 생성될 html코드들을 ejs엔진으로 해석하도록 정해줌)
app.use(express.static(`${__dirname}/src/public`));     // static함수로 정적 경로를 추가해주는데 현재 디렉토리 이름(app.js파일이 있는 위치를 반환)을 가져와서 /src/public 경로를 지정해준다.
app.use(bodyParser.json());                             // body-parser가 json데이터를 파싱해올 수 있도록 미들웨어 등록
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));


// 라우팅 연결 
app.use("/", home);                                     // use는 미들웨어를 등록하는 메서드, 첫번째 매개변수: "/" 루트라는 경로로 들어오면 두번째 매개변수: home으로 보내줄 것이다.

module.exports = app;
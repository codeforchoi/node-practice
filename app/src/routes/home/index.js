"use strict";                           // javascript 파일을 만들 때는 항상 이 문구를 넣어서 자바스크립트의 구문이 실행되는 환경을 설정하는 예약어 "엄격모드" 이다.

const express = require("express");
const router = express.Router();        // 보통 라우터는 router를 쓰고 express의 Router를 받아옴.

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);          // home화면을 출력해주는 기능 (output)
router.get("/login", ctrl.output.login);    // login화면을 출력해주는 기능 (output)
router.post("/login", ctrl.process.login);  // login 데이터를 처리해주는 기능 (process)

module.exports = router;               // app.js에서 쓸 수 있도록 외부 내보내기를 해줌.
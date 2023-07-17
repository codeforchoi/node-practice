"use strict";                           // javascript 파일을 만들 때는 항상 이 문구를 넣어서 자바스크립트의 구문이 실행되는 환경을 설정하는 예약어 "엄격모드" 이다.

const express = require("express");
const router = express.Router();        // 보통 라우터는 router를 쓰고 express의 Router를 받아옴.

router.get("/", (req, res) => {         // req는 요청 request, res는 응답 response
    res.render("home/index");           // 해당 경로로 이동할 수 있도록 해주는 기능
 });
 
router.get("/login", (req, res) => {
     res.render("home/login");          // 해당 경로로 이동할 수 있도록 해주는 기능
 });

 module.exports = router;               // app.js에서 쓸 수 있도록 외부 내보내기를 해줌.
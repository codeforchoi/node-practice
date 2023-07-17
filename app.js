// html 문서를 하드코딩해서 비효율적으로 작성한 코드 (# 5)

const express = require("express");     // require 명령어로 express 라는 모듈을 다운받아준다.
const app = express();                  // app 이라는 변수에 express를 실행시킴

app.get("/", (req, res) => {            // req는 요청 request, res는 응답 response
    res.send( `
    <!DOCTYPE html>
    <html lang="ko">        <!--ko로 해주면 브라우저가 한글문서로 인식해서 번역하라는 기능을 제시해주지 않음, en이면 번역 기능을 제시해줌.-->
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        여기는 루트입니다.
    </body>
    </html>        
    `);  
});

app.get("/login", (req, res) => {
    res.send( `
    <!DOCTYPE html>
    <html lang="ko">        <!--ko로 해주면 브라우저가 한글문서로 인식해서 번역하라는 기능을 제시해주지 않음, en이면 번역 기능을 제시해줌.-->
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <input type="text" placeholder="아이디"><br>
        <input type="text" placeholder="비밀번호"><br>
        <button>로그인</button>
    </body>
    </html>        
    `);
});

app.listen(3000, () => {                // listen이라는 명령어로 서버를 띄울 수 있음. (첫번째 매개변수: 3000번 포트로 열어주고, 두번째 매개변수: callback함수를 넘길 수 있음)
    console.log("서버 가동");            // 서버 콘솔에 서버가동 띄움.
});
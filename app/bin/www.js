// 서버 가동 (서버 가동을 위한 명령어로 node ./bin/www.js 라고 해야함)
"use strict";

const app = require("../app");
const PORT = process.env.PORT || 3000;  // dotenv모듈로 환경변수를 관리, 앞에꺼 먼저 true인지 보고 false이면 뒤에를 실행, 즉 지정된 PORT값이 있으면 실행하고 없으면 기본으로 3000을 실행

app.listen(PORT, () => {                // listen이라는 명령어로 서버를 띄울 수 있음. (첫번째 매개변수: 3000번 포트로 열어주고, 두번째 매개변수: callback함수를 넘길 수 있음)
    console.log("서버 가동");            // 서버 콘솔에 서버가동 띄움.
});
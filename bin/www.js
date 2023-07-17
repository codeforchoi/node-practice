// 서버 가동 (서버 가동을 위한 명령어로 node ./bin/www.js 라고 해야함)
"use strict";

const app = require("../app");
const PORT = 3000;

app.listen(PORT, () => {                // listen이라는 명령어로 서버를 띄울 수 있음. (첫번째 매개변수: 3000번 포트로 열어주고, 두번째 매개변수: callback함수를 넘길 수 있음)
    console.log("서버 가동");            // 서버 콘솔에 서버가동 띄움.
});
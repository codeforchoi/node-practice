const fs = require("fs");                           // 파일시스템 모듈
const appRoot = require("app-root-path");           // 루트 경로에 접근할 수 있게 해주는 모듈

const accessLogStream = fs.createWriteStream(       // 데이터가 다니는 통로 지정, 로그가 기록될 파일 지정
    `${appRoot}/log/access.log`, 
    { flags: 'a' }
);

module.exports = accessLogStream;
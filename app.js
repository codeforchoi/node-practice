// express의 서버 프레임워크를 사용하지 않고 하는 방법 (express를 써야하는 이유) (#4)

const http = require("http");               // http는 내장모듈로 npm으로 설치받아줄 필요는 없다.
const app = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); // 한글 처리, text중에 html이고 charset은 utf-8이다로 지정해 해석하도록 응답해줌.
    if (req.url === '/') {
        res.end("여기는 루트 입니다.");
    } else if (req.url === "/login") {
        res.end("여기는 로그인 화면입니다.");
    }});

app.listen(3001, () => {
    console.log("http로 가동된 서버입니다.");
});
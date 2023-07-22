"use strict";     

const User = require("../../models/User"); // User.js파일을 사용할 수 있도록 가져와줌.

// 출력해준다는 의미
const output = {
    home: (req, res) => {
        res.render("home/index");          // 해당 경로로 이동할 수 있도록 해주는 기능
    },
    login: (req, res) => {
        res.render("home/login");          // 해당 경로로 이동할 수 있도록 해주는 기능
    },
    register: (req, res) => {
        res.render("home/register");
    },
};

// 처리해준다는 의미
const process = {
    login: (req, res) => {                  
        const user = new User(req.body);    // user변수에 User클래스를 인스턴스화하고 req.body를 파라미터로 줌.
        const response = user.login();      // response변수에 user.login()메서드를 실행해 반환값을 넣어줌. 로그인 성공여부에 대한 오브젝트가 반환.
        return res.json(response);          // 반환된 response값을 json형태로 변환해 클라이언트에 보냄.
    },
    register: (req, res) => {
        const user = new User(req.body);    // user변수에 User클래스를 인스턴스화하고 req.body를 파라미터로 줌.
        const response = user.register();   // response변수에 user.register()메서드를 실행해 반환값을 넣어줌. 회원가입 성공여부에 대한 오브젝트가 반환.
        return res.json(response);          // 반환된 response값을 json형태로 변환해 클라이언트에 보냄.
    },
}

module.exports = {
    output,
    process,
};
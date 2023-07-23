"use strict";     

const User = require("../../models/User");             // User.js파일을 사용할 수 있도록 가져와줌.
const logger = require("../../config/logger");         // 각 함수들 출력시에 로그를 출력해주도록 로그를 가져온다.

// 출력해준다는 의미
const output = {
    home: (req, res) => {
        logger.info(`GET / 304 "홈 화면으로 이동"`);    // 호출될 때 로그를 찍어준다.
        res.render("home/index");                      // 해당 경로로 이동할 수 있도록 해주는 기능
    },

    login: (req, res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login");                      // 해당 경로로 이동할 수 있도록 해주는 기능
    },

    register: (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register");
    },
};

// 처리해준다는 의미
const process = {
    login: async (req, res) => {                // await을 사용하기 위해 async로 함수 선언
        const user = new User(req.body);        // user변수에 User클래스를 인스턴스화하고 req.body를 파라미터로 줌.
        const response = await user.login();    // response변수에 user.login()메서드를 실행해 반환값을 넣어줌. 로그인 성공여부에 대한 오브젝트가 반환.,  await키워드 넣어줘서 기다리도록 실행
        
        const url = {                           // 가독성 좋게 하기 위해서 따로 오브젝트를 변수로 빼준다.
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,   // 에러가 있으면 400, 정상 응답이면 200을 준다. 
        };                                      // 200은 정상응답, 300은 페이지가 이동 되었을 경우, 400은 클라이언트에서 실수했을 경우, 500은 서버에서 실수했을 경우로 응답코드가 있다.
        
        log(response, url);                     // 가독성을 위해 log함수로 빼준다.
        return res.status(url.status).json(response);    // 반환된 response값을 json형태로 변환해 클라이언트에 보냄. 상태값도 실어서 보냄.
    },

    register: async (req, res) => {
        const user = new User(req.body);        // user변수에 User클래스를 인스턴스화하고 req.body를 파라미터로 줌.
        const response = await user.register(); // response변수에 user.register()메서드를 실행해 반환값을 넣어줌. 회원가입 성공여부에 대한 오브젝트가 반환.
        
        const url = {                           // 가독성 좋게 하기 위해서 따로 오브젝트를 변수로 빼준다.
            method: "POST",
            path: "/register",
            status: response.err ? 500 : 201,   // 에러가 있으면 500(서버측 에러(DB 등)가 발생할 경우) 정상 응답이면 201(새로운 데이터 생성이므로)을 준다.
        };
        
        log(response, url);                     // 가독성을 위해 log함수로 빼준다.
        return res.status(url.status).json(response);     // 반환된 response값을 json형태로 변환해 클라이언트에 보냄. 상태값도 실어서 보냄.
    },
}

module.exports = {
    output,
    process,
};

const log = (response, url) => {
    if (response.err) {                         // catch문으로 에러를 잡은 경우 에러 처리
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`       // success키값과 msg키값을 출력해준다.
        )
    }
    else{
        logger.info(                            // 로그를 찍어준다.
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg || ""}` // success키값과 msg키값을 출력해준다. msg가 없으면 빈문자열을 출력해준다.
        );   

    } 
};

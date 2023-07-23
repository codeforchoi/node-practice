"use strict";     

const User = require("../../models/User");             // User.js파일을 사용할 수 있도록 가져와줌.
const logger = require("../../config/logger");         // 각 함수들 출력시에 로그를 출력해주도록 로그를 가져온다.

// 출력해준다는 의미
const output = {
    home: (req, res) => {
        logger.info(`GET / 200 "홈 화면으로 이동"`);    // 호출될 때 로그를 찍어준다.
        res.render("home/index");                      // 해당 경로로 이동할 수 있도록 해주는 기능
    },
    login: (req, res) => {
        logger.info(`GET /login 200 "로그인 화면으로 이동"`);
        res.render("home/login");                      // 해당 경로로 이동할 수 있도록 해주는 기능
    },
    register: (req, res) => {
        logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
        res.render("home/register");
    },
};

// 처리해준다는 의미
const process = {
    login: async (req, res) => {                // await을 사용하기 위해 async로 함수 선언
        const user = new User(req.body);        // user변수에 User클래스를 인스턴스화하고 req.body를 파라미터로 줌.
        const response = await user.login();    // response변수에 user.login()메서드를 실행해 반환값을 넣어줌. 로그인 성공여부에 대한 오브젝트가 반환.,  await키워드 넣어줘서 기다리도록 실행
        if (response.err) {                     // catch문으로 에러를 잡은 경우 에러 처리
            logger.error(
                `POST /login 200 Response: "success: ${response.success}, ${response.err}"`    // success키값과 msg키값을 출력해준다.
            )
        }
        else{
            logger.info(                        // 로그를 찍어준다.
                `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`    // success키값과 msg키값을 출력해준다.
            );   

        } 
        return res.json(response);              // 반환된 response값을 json형태로 변환해 클라이언트에 보냄.
    },
    register: async (req, res) => {
        const user = new User(req.body);        // user변수에 User클래스를 인스턴스화하고 req.body를 파라미터로 줌.
        const response = await user.register(); // response변수에 user.register()메서드를 실행해 반환값을 넣어줌. 회원가입 성공여부에 대한 오브젝트가 반환.
        if (response.err) {                     // catch문으로 에러를 잡은 경우 에러 처리
            logger.error(
                `POST /register 200 Response: "success: ${response.success}, ${response.err}"`    // success키값과 msg키값을 출력해준다.
            )
        }
        else{
            logger.info(                        // 로그를 찍어준다.
                `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`    // success키값과 msg키값을 출력해준다.
            );   

        } 
        return res.json(response);              // 반환된 response값을 json형태로 변환해 클라이언트에 보냄.
    },
}

module.exports = {
    output,
    process,
};
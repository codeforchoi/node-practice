"use strict";     

const UserStorage = require("../../models/UserStorage");

// 출력해준다는 의미
const output = {
    home: (req, res) => {
        res.render("home/index");          // 해당 경로로 이동할 수 있도록 해주는 기능
    },
    login: (req, res) => {
        res.render("home/login");          // 해당 경로로 이동할 수 있도록 해주는 기능
    }
};

// 처리해준다는 의미
const process = {
    login: (req, res) => {
        const id = req.body.id,                     // 프론트엔드에서 받아온 id 데이터
            password = req.body.password;           // 프론트엔드에서 받아온 password 데이터
        
        const users = UserStorage.getUsers("id", "password");  // class getUsers를 static으로 선언해서 함수 사용이 가능, id와 password 데이터만 가져오도록 명시.
        
        // 로그인 인증 기능
        const response = {};                        // 코드 간결성을 위해 선언
        if (users.id.includes(id)) {                // id가 users.id에 포함된다면
            const idx = users.id.indexOf(id)        // id의 인덱스를 idx에 받아오고
            if (users.password[idx] === password) { // users.password의 해당 인덱스가 프론트엔드에서 받아온 password 데이터와 같은지 판단
                response.success = true;            // 같으면 success키에 true를 넣어 json으로 만들어서 res에 넘겨 프론트엔드에 응답한다.
                return res.json(response);                  
            }
        }
        
        response.success = false;
        response.msg = "로그인에 실패하셨습니다.";
        return res.json(response);                  // 실패하면 success키에 false를 넣고 msg키에 로그인 실패 메세지를 넣어 json으로 만들어서 res에 넘겨 프론트엔드에 응답한다.
    }
}

module.exports = {
    output,
    process,
};
"use strict";     

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
        console.log(req.body);
    }
}

module.exports = {
    output,
    process,
};
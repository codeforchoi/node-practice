"use strict";     

const home = (req, res) => {
    res.render("home/index");          // 해당 경로로 이동할 수 있도록 해주는 기능
}

const login = (req, res) => {
    res.render("home/login");          // 해당 경로로 이동할 수 있도록 해주는 기능
}

module.exports = {
    home,
    login,
};
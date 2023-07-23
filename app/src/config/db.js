"use strict";  

const mysql = require("mysql");

// DB설정값들을 적어주면 된다.
const db = mysql.createConnection({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,  
});

db.connect();        // 연결을 connect()매서드로 요청하게 된다.

module.exports = db; // db모듈을 외부에서 사용할 수 있도록 설정해준다.
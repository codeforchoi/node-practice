"use strict"; 

const db = require("../config/db");                 // db사용

// 유저 정보
class UserStorage {                                 // 파일명과 동일하게 해주는 것이 좋음.    
    // 해당 id의 user정보만 가져오는 메서드
    static getUserInfo(id) {        
        return new Promise((resolve, reject) => {                   // getUserInfo()메서드가 promise를 반환하도록 설정
            const query = "SELECT * FROM users WHERE id = ?;";      // 가독성 좋게 query변수 설정
            db.query(query, [id], (err, data) => {                  // 해당 id에 대한 정보만 가져오도록 쿼리 실행
                if (err) reject(`${err}`);                          // err가 나면 reject에 던져주고 err날때 `${err}`해야 오브젝트로 날라오지 않고 문자열로 받을 수 있음.
                resolve(data[0]);                                   // 성공하면 resolve에 data를 주고 반환한다. data가 배열에 둘러쌓여 있어 [0]을 해주면 안에 값만 보낼 수 있다.
            });
        });                                 
    }

    // 회원가입으로 입력된 정보를 users에 저장하는 메서드
    static async save(userInfo) {                                          
        return new Promise((resolve, reject) => {                                           // getUserInfo()메서드가 promise를 반환하도록 설정
            const query = "INSERT INTO users(id, name, password) VALUES(?, ?, ?);";      
            db.query(query, [userInfo.id, userInfo.name, userInfo.password], (err) => {     // 저장하는 것이므로 따로 data를 받아줄 필요는 없다.
                if (err) reject(`${err}`);                                                  // err가 나면 reject에 던져주고 err날때 `${err}`해야 오브젝트로 날라오지 않고 문자열로 받을 수 있음.
                resolve({ success: true });                                                 // 성공하면 resolve에 오브젝트로 success키에 true값을 넣어 보낸다.
            });
        });  
    }   
}

module.exports = UserStorage;
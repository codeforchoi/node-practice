"use strict"; 

const UserStorage = require("./UserStorage");           

// User클래스 (로그인이나 회원가입 기능을 하는 모델)
class User {
    constructor(body) {             // 생성자에 home.ctrl.js파일에서 생성시 받아온 req.body를 클래스 변수 body에 넣어줌.
        this.body = body;
    }

    login() {                       // login 인증 로직
        const body = this.body;     // 코드 간결성을 위해 생성 
        const { id, password } = UserStorage.getUserInfo(body.id);  // UserStorage클래스의 getUserInfo()메서드를 사용해 입력받은 id를 파라미터로 주어 그와 관련된 정보인 id와 password만 받아옴.

        if (id) {                                                   // 받아온 id가  유저정보에 있을 경우
            if ( id === body.id && password === body.password) {    // UserStorage의 id와 password가 입력받은 id와 password와 같을 경우
                return { success: true };                           // success키에 true를 넣고 오브젝트 반환
            }
            return { success: false, msg: "비밀번호가 틀렸습니다."};  // id는 같으나 비밀번호가 틀렸을 경우 success키에 false넣고 msg메세지 넣어 반환
        }
        return { success: false, msg: "존재하지 않는 아이디입니다."}; // 입력받은 id가 UserStorage에 없을 경우 success키에 false넣고 msg메세지 넣어 반환
    }
}

module.exports = User;
"use strict"; 

const UserStorage = require("./UserStorage");           

// User클래스 (로그인이나 회원가입 기능을 하는 모델)
class User {
    constructor(body) {             // 생성자에 home.ctrl.js파일에서 생성시 받아온 req.body를 클래스 변수 body에 넣어줌.
        this.body = body;
    }

    // login 인증 메서드
    async login() {                                                                  // await을 사용하기 위해 async(비동기)로 함수를 선언해준다.               
        const client = this.body;                                                    // 코드 간결성을 위해 생성 
        try {                                                                        // async, await은 try-catch문으로 에러를 처리해줄 수 있다.
            const user = await UserStorage.getUserInfo(client.id);                   // UserStorage클래스의 getUserInfo()메서드를 사용해 입력받은 id를 파라미터로 주어 그와 관련된 정보인 id와 password만 받아옴.
                                                                                                                            
            if (user) {                                                              // 받아온 user가 유저정보에 있을 경우
                if ( user.id === client.id && user.password === client.password) {   // UserStorage의 id와 password가 입력받은 id와 password와 같을 경우
                    return { success: true };                                        // success키에 true를 넣고 오브젝트 반환
                }
                return { success: false, msg: "비밀번호가 틀렸습니다."};               // id는 같으나 비밀번호가 틀렸을 경우 success키에 false넣고 msg메세지 넣어 반환
            }
            return { success: false, msg: "존재하지 않는 아이디입니다."};              // 입력받은 id가 UserStorage에 없을 경우 success키에 false넣고 msg메세지 넣어 반환
        } catch (err) {
            return { success: false, err };                                          // 키가 value가 같은 경우 하나만 쓰면 됨.
        }
        
    }

    // 회원가입 입력정보 저장 메서드
    async register() {
        const client = this.body;   
        try {                                                                   // async, await은 try-catch문으로 에러를 처리해줄 수 있다.
            const response = await UserStorage.save(client);                    // 회원가입 입력정보를 저장하는 save()메서드 호출
            return response;
        } catch (err) {                                                         
            return { success: false, err };                                // err에 문자열을 받아 보내면 정상 출력됨. Error(문자열)넣어서 err가 받으면 문제발생.
        }        
    }
}

module.exports = User;
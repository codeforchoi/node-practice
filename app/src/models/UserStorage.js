"use strict"; 

const fs = require("fs").promises;                  // 파일시스템의 promises를 사용한다.

// 유저 정보
class UserStorage {                                 // 파일명과 동일하게 해주는 것이 좋음. 
    // getUserInfo()메서드에 .then부분에 가독성을 위한 은닉화한 함수 (private한 변수나 메서드는 class 최상단에 올려준다.)
    static #getUserInfo(data, id) {                     
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);                                   // 파라미터로 받은 해당 id의 인덱스를 저장.
        const userInfo = Object.keys(users).reduce((newUser, info) => {     // userInfo변수에 users오브젝트의 키들만으로 배열을 만든 것에서 reduce()메서드를 사용해 순회
            newUser[info] = users[info][idx];                               // newUser[info]키 자리에 users의 해당키의 값을 넣음.
            return newUser;                                                 // newUser오브젝트를 reduce메서드의 newUser파라미터 초기값으로 넣고 반복
        }, {});

        return userInfo;                                                    // userInfo 오브젝트를 반환 (해당 id와 관련된 정보들이 들어있음)
    }

    // users 변수에 접근 메서드
    static getUsers(...fields) {                                // 데이터를 은닉화시켜주고 메서드화 해야한다. , ...fields라고 매개변수를 주면 파라미터로 들어온 값들이 배열 형태로 fields변수에 저장된다.
        // const users = this.#users;                           // users변수에 클래스 변수를 넣어주고
        const newUsers = fields.reduce((newUsers, field) => {   // newUsers에 reduce메서드를 사용해 newUsers매개변수에 초기값으로 빈 오브젝트 {}를 넣어주고 field매개변수에 fields변수에 배열로 받아온 값들을 순회하여 넣어주도록 한다. 
            if (users.hasOwnProperty(field)) {                  // 순회하여 넣어줄 때 if문을 통해 users에 field에 들어온 값이 해당 키값으로 있는지 확인하고 true이면 
                newUsers[field] = users[field];                 // newUsers에 키를 넣고 값도 넣어준다.
            }
            return newUsers;                                    // 이 newUsers오브젝트를 반환하고 reduce메서드를 통해 반복되면서 매개변수 newUsers에 반환된 newUsers가 초기값으로 들어가게 된다.
        }, {});                                                 // 맨 처음 초기값을 빈 오브젝트로 설정.
        return newUsers;                                        // getUsers()메서드의 반환값으로 newUsers오브젝트를 반환.
    }

    // 해당 id의 user정보만 가져오는 메서드
    static getUserInfo(id) {                                                        // 파라미터로 User.js파일의 body.id를 받을 것임. 
        return fs
            .readFile("./src/databases/sunghyun/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id);
            })
            .catch((err) => console.error(err));                                    // .catch(console.error); 라고 해도 됨. 함수를 실행시키는데 파라미터로 넘어온 변수를 실행시키는 함수로 넘기게 되면 생략이 가능하다. 
    }

    // 회원가입으로 입력된 정보를 users에 저장하는 메서드
    static save(userInfo) {
        // const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);
        return { success: true };
    }
    // 위와 같은 로직은 서버가 꺼졌다가 다시 가동되면 추가된 정보는 모두 지워지게 된다.
    // 이를 위해 user정보를 파일에 저장해야한다.
}

module.exports = UserStorage;
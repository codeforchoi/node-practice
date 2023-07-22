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

    // getUsers()메서드에 .then부분에 가독성을 위한 은닉화한 함수
    static #getUsers(data, isAll, fields) {                     
        const users = JSON.parse(data);
        if(isAll) return users;                                 // isAll 매개변수는 true이면 모든 필드를 받겠다는 의미

        const newUsers = fields.reduce((newUsers, field) => {   // newUsers에 reduce메서드를 사용해 newUsers매개변수에 초기값으로 빈 오브젝트 {}를 넣어주고 field매개변수에 fields변수에 배열로 받아온 값들을 순회하여 넣어주도록 한다. 
            if (users.hasOwnProperty(field)) {                  // 순회하여 넣어줄 때 if문을 통해 users에 field에 들어온 값이 해당 키값으로 있는지 확인하고 true이면 
                newUsers[field] = users[field];                 // newUsers에 키를 넣고 값도 넣어준다.
            }
            return newUsers;                                    // 이 newUsers오브젝트를 반환하고 reduce메서드를 통해 반복되면서 매개변수 newUsers에 반환된 newUsers가 초기값으로 들어가게 된다.
        }, {});                                                 // 맨 처음 초기값을 빈 오브젝트로 설정.
        return newUsers;                                        // getUsers()메서드의 반환값으로 newUsers오브젝트를 반환.
    }

    // users 변수에 접근 메서드
    static getUsers(isAll, ...fields) {                         // 데이터를 은닉화시켜주고 메서드화 해야한다. , ...fields라고 매개변수를 주면 파라미터로 들어온 값들이 배열 형태로 fields변수에 저장된다.
        return fs                                               // isAll 매개변수는 true이면 모든 필드를 받겠다는 의미, fs는 promise형태로 반환
            .readFile("./src/databases/sunghyun/users.json")    // 해당 경로의 파일을 읽고
            .then((data) => {                                   // promis형에 접근하기 위해서 data를 받아서 이를 은닉화 메서드에 전해줌.
                return this.#getUsers(data, isAll, fields);                
            })
            .catch((err) => console.error(err));                // .catch(console.error); 라고 해도 됨. 함수를 실행시키는데 파라미터로 넘어온 변수를 실행시키는 함수로 넘기게 되면 생략이 가능하다. 
    }

    // 해당 id의 user정보만 가져오는 메서드
    static getUserInfo(id) {                                    // 파라미터로 User.js파일의 body.id를 받을 것임. 
        return fs                                               // promise형태로 반환
            .readFile("./src/databases/sunghyun/users.json")    // 해당 경로의 파일을 읽고
            .then((data) => {                                   // promis형에 접근하기 위해서 data를 받아서 이를 은닉화 메서드에 전해줌.
                return this.#getUserInfo(data, id);
            })
            .catch((err) => console.error(err));                // .catch(console.error); 라고 해도 됨. 함수를 실행시키는데 파라미터로 넘어온 변수를 실행시키는 함수로 넘기게 되면 생략이 가능하다. 
    }

    // 회원가입으로 입력된 정보를 users에 저장하는 메서드
    static async save(userInfo) {                                           // await키워드를 사용할 수 있도록 async키워드를 준다.
        const users = await this.getUsers(true);                            // getUsers()메서드가 promise를 반환하므로 await키워드를 줘서 모두 다 받아오게 기다리도록 함, 파라미터가 true인 것은 모든 필드를 다 받아온다는 의미.
        if (users.id.includes(userInfo.id)) {                               // 현재 파일의 정보를 받아온 users의 id필드에 userInfo.id가 있다면
            throw "이미 존재하는 아이디입니다.";                              // User.js파일의 register부분의 try catch문의 err로 문자열을 보낸다. 
        }                                                                   // 현재 파일의 정보를 받아온 users의 id필드에 userInfo.id가 없다면 Error(문자열)로 보내면 User.js파일의 catch부분에서 오브젝트 안에 오브젝트가 들어가게 되서 문제발생.
        users.id.push(userInfo.id);                                         // users에 userInfo의 각 정보를 각 필드에 넣어준다.
        users.name.push(userInfo.name);                                     
        users.password.push(userInfo.password);                             
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));  // 첫번째 파라미터는 쓰고 저장할 파일 경로, 두번째 파라미터는 저장할 데이터(문자열이여야함). 파일에 덮어쓴다.
        return { success: true };                                           // wirteFile메서드는 저장이 완료되면 아무것도 반환x, 오류일 경우 에러를 던진다. 에러의 경우 처리는 user.js에 register에서 처리해준다.
    }   
}

module.exports = UserStorage;
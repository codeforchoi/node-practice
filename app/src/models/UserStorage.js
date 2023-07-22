"use strict"; 

// 유저 정보
class UserStorage {                                 // 파일명과 동일하게 해주는 것이 좋음.
    static #users = {                               // class안 에서는 const 같은 선언자 필요없음. (#은 public을 private로 class변수를 은닉화시켜주도록 하는 것이 좋음.)
        id: ["codeforchoi", "개발자", "최성현"],     // static으로 선언해야 외부에서 클래스의 변수에 직접접근이 가능하다.   
        password: ["1234", "12345", "123456"],
        name: ["초콜렛", "개발자", "최성현"],
    };

    // users 변수에 접근 메서드
    static getUsers(...fields) {                    // 데이터를 은닉화시켜주고 메서드화 해야한다. , ...fields라고 매개변수를 주면 파라미터로 들어온 값들이 배열 형태로 fields변수에 저장된다.
        const users = this.#users;                  // users변수에 클래스 변수를 넣어주고
        const newUsers = fields.reduce((newUsers, field) => {   // newUsers에 reduce메서드를 사용해 newUsers매개변수에 초기값으로 빈 오브젝트 {}를 넣어주고 field매개변수에 fields변수에 배열로 받아온 값들을 순회하여 넣어주도록 한다. 
            if (users.hasOwnProperty(field)) {                  // 순회하여 넣어줄 때 if문을 통해 users에 field에 들어온 값이 해당 키값으로 있는지 확인하고 true이면 
                newUsers[field] = users[field];                 // newUsers에 키를 넣고 값도 넣어준다.
            }
            return newUsers;                                    // 이 newUsers오브젝트를 반환하고 reduce메서드를 통해 반복되면서 매개변수 newUsers에 반환된 newUsers가 초기값으로 들어가게 된다.
        }, {});                                                 // 맨 처음 초기값을 빈 오브젝트로 설정.
        return newUsers;                                        // getUsers()메서드의 반환값으로 newUsers오브젝트를 반환.
    }
}

module.exports = UserStorage;
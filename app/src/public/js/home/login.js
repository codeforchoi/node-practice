"use strict";  

const id = document.querySelector("#id"),                   // DOM은 Document Object Model로 문서 객체 모델이고 일종의 인터페이스, html문서에서 데이터를 가져와서 js파일에서 제어할 수 있게 함
    password = document.querySelector("#password"),         // html문서 내의 선택자를 통해 값을 가져옴.
    loginBtn = document.querySelector("button");            // #은 id로 부여한 선택자, 없는 것은 태그가 하나라서 태그로 부여한 선택자

loginBtn.addEventListener("click", login);                  // login버튼이 click되는 이벤트가 발생하면 login함수를 실행

// login 함수
function login() {                              
    const req = {                                           // req 오브젝트에 id와 password의 value값들을 저장해준다.
        id: id.value,
        password: password.value,
    };    
}
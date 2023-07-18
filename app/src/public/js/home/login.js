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
  
    // fetch함수 (데이터 전달)
    fetch("/login", {                                       // 첫번째 매개변수: 데이터를 전달할 경로 지정, 두번째 매개변수: 전달할 데이터
        method: "POST",                                     // body를 통해 데이터를 전달할 때에는 http메서드 중 POST방법으로 전달해주어야함.
        headers: {                                          // headers키 값에 오브젝트 데이터 형태로 보낼 때 전달하는 데이터가 json데이터라고 명시적으로 알려주어야함.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),                          // body키값을 통해 req데이터를 JSON.stringify메서드를 사용해 오브젝트를 json형태의 문자열로 바꾸어줌.
    })
        .then((res) => res.json())                          // fetch로 전달하고 응답한 데이터를 받을려면 then메서드를 써야함. (res.json()은 Promise형태로 데이터를 받아옴)
        .then((res) => console.log(res));                   // .then(console.log); 해도 가능, Promise데이터에 접근하기 위해서 then메서드를 쓰고 res에 받아오면 앞서 만든 오브젝트 데이터를 받아올 수 있음.
}
"use strict";  

const id = document.querySelector("#id"),                   // DOM은 Document Object Model로 문서 객체 모델이고 일종의 인터페이스, html문서에서 데이터를 가져와서 js파일에서 제어할 수 있게 함
    name = document.querySeletor("#name"),                  
    password = document.querySelector("#password"),         // html문서 내의 선택자를 통해 값을 가져옴.
    confirmPassword = document.querySelector("#confirm-password"),      
    registerBtn = document.querySelector("#button");        // #은 id로 부여한 선택자, 없는 것은 태그가 하나라서 태그로 부여한 선택자

registerBtn.addEventListener("click", register);            // register버튼이 click되는 이벤트가 발생하면 register함수를 실행

// register 함수
function register() { 
    if (!id.value) return alert("아이디를 입력해주십시오.");  // 아이디를 입력하지 않았을 경우 에러메세지 출력
    if (password.value !== confirmPassword.value) return alert("비밀번호가 일치하지 않습니다."); // 비밀번호와 비밀번호 확인이 일치하지 않을 경우 에러메세지 출력

    const req = {                                           // req 오브젝트에 id와 name, password, confirmPassword의 value값들을 저장해준다.
        id: id.value,
        name: name.value,
        password: password.value,        
    };       
  
    // fetch함수 (데이터 전달)
    fetch("/register", {                                    // 첫번째 매개변수: 데이터를 전달할 경로 지정, 두번째 매개변수: 전달할 데이터
        method: "POST",                                     // body를 통해 데이터를 전달할 때에는 http메서드 중 POST방법으로 전달해주어야함.
        headers: {                                          // headers키 값에 오브젝트 데이터 형태로 보낼 때 전달하는 데이터가 json데이터라고 명시적으로 알려주어야함.
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),                          // body키값을 통해 req데이터를 JSON.stringify메서드를 사용해 오브젝트를 json형태의 문자열로 바꾸어줌.
    })
        .then((res) => res.json())                          // fetch로 전달하고 응답한 데이터를 받을려면 then메서드를 써야함. (res.json()은 Promise형태로 데이터를 받아옴)
        .then((res) => {                                    // .then(console.log); 해도 가능, Promise데이터에 접근하기 위해서 then메서드를 쓰고 res에 받아오면 앞서 만든 오브젝트 데이터를 받아올 수 있음.
            if (res.success) {                              // success키값이 true이면 location.href를 이용해 "/"루트 경로로 가도록 한다.
                location.href = "/login";
            } else {                                        // false이면 alert메서드를 사용해 res.msg 에러 메세지를 띄워준다.
                if (res.err) return alert(res.err);         // catch문으로 잡은 에러에 대한 메세지 출력이다.
                alert(res.msg);
            }
        })
        .catch((err) => {                                   // 위 로직을 수행하다가 error가 발생할 때 error처리 방법
            console.err("회원가입 중 에러 발생");             // 콘솔에 에러를 띄우줌. 에러가 발생하는 경우는 index.js에서 post라우팅을 지우면 error발생 가능. 
        });                                                 // console.err(new Error("로그인 중 에러 발생"));로 하면 "Error: 로그인 중 에러 발생"으로 뜨게 됨.
}
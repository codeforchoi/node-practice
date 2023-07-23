"use strict";  

const { createLogger, transports, format } = require("winston");     // 로그 관리 모듈에서 가독성을 위해 필요한 것만 가져옴.
const { combine, timestamp, label, printf, json, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {  // prinf()메서들를 사용하면 포맷을 원하는 포맷으로 지정해줄 수 있다.
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = combine(                                 // 옵션을 두개 이상 줄 때는 combine()메서드를 사용해야함.
    label({
        label: "node-practice",                                 // 프로젝트 이름을 명시해줄 수 있음.
    }),
    // colorize(),                                              // 로그에 색깔을 넣어줄 수 있음.
    timestamp({                                                 // 시간을 출력해준다.
        format: "YYYY-MM-DD HH:mm:ss",                          // 원하는 형식으로 지정해줄 수 있음.
    }),                                                         // 원하는 포맷으로 출력
    printFormat                                                 
);                                                              // json형태로 로그를 출력할 수 있음.

const logger = createLogger({                                   // 로그를 생성해준다.
    transports: [                                               // transports키값에 배열로 씌워서 transports인스턴스를 생성한다.
        new transports.File({                                   // 로그를 파일로 관리할 수 있도로 해준다.
            filename: "access.log",                             // 로그 기록 파일명
            dirname: "./logs",                                  // 로그 파일이 있는 디렉토리 경로
            level: "info",                                      // 로그 수준을 정해주고 숫자가 클수로 낮은 수준이고 해당 수준부터 높은 수준의 로그만 출력해준다.
            format: printLogFormat,
        }),
    ],
})

module.exports = logger;
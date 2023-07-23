"use strict";  

const { createLogger, transports, format } = require("winston");     // 로그 관리 모듈에서 가독성을 위해 필요한 것만 가져옴.
const { combine, timestamp, label, printf, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {  // prinf()메서들를 사용하면 포맷을 원하는 포맷으로 지정해줄 수 있다.
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(                          // 옵션을 두개 이상 줄 때는 combine()메서드를 사용해야함.
        label({
            label: "node-practice",         // 프로젝트 이름을 명시해줄 수 있음.
        }),
        timestamp({                         // 시간을 출력해준다.
            format: "YYYY-MM-DD HH:mm:ss",  // 원하는 형식으로 지정해줄 수 있음.
        }),                                                         
        printFormat                                                 
    ),
    console: combine(
        colorize(),                         // 로그에 색깔을 넣어줄 수 있음.
        simple()                            // 간단한 형태로 로그를 출력해줌.
    )
};                                                             

// 파일로 로그 출력, 콘솔로 로그 출력 옵션
const opts = {                              // transports키값에 배열로 씌워서 transports인스턴스를 생성한다.
    file: new transports.File({             // 로그를 파일 출력 옵션
        filename: "access.log",             // 로그 기록 파일명
        dirname: "./logs",                  // 로그 파일이 있는 디렉토리 경로
        level: "info",                      // 로그 수준을 정해주고 숫자가 클수로 낮은 수준이고 해당 수준부터 높은 수준의 로그만 출력해준다.
        format: printLogFormat.file,
    }),
    console: new transports.Console({       // 콘솔 로그 출력 옵션                 
        level: "info",                                      
        format: printLogFormat.console,
    }),
};

const logger = createLogger({               // 로그를 생성해준다.
    transports: [opts.file],                // 로그 파일 출력. opts에서 해준다.
})

// 서비스 중이면 콘솔로 로그를 출력해주지 않고 개발 중이라면 콘솔로 로그를 출력해주도록 한다.
if (process.env.NODE_ENV !== "production") {
    logger.add(opts.console);               // 콘솔 로그 출력
}

// morgan 로그 모듈 이용을 위한 stream
logger.stream = {
    write: (message) => logger.info(message),  // 받은 메세지를 logger의 info 메세지로 출력하도록 설정.
};

module.exports = logger;
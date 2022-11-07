# FRONTEND - REACT

## # CLI
#### npm run-script start
#### npm run-script build
#### <br>
## # PORT
#### - port number : 80
#### - port settings : "./webpack.dev.config.js"
#### <br>
#
## # DIRECTORY
#### 1. assets : media files
#### 2. components : common components (components used in multiple pages)
#### 3. pages : page components (components used in single page)
#### 4. redux : setting redux
#### <br>
## # FILE
#### 1. /base-dev.html : base html file
#### 2. /src/index.js : link with base-dev.html, call /src/components/index.js/App()
#### 3. /src/components/AppRedux.js : AppReducer file
#### 4. /src/components/AppRouter.js : AppRouter file
#### 5. /src/components/index.js : call AppRedux and AppRouter
#### <br>
#
## # REDUX
#### : 상태관리 라이브러리, Props Drilling 방지
#### <br>
## # REDUX-SAGA
#### : REDUX MIDDLEWARE, ACTION 함수들과 REDUCER 사이에서 흐름 제어
#### <br>
## # AXIOS
#### : PROMISE API를 활용하는 HTTP 비동기 통신 라이브러리, 백엔드와 프론트엔드의 통신을 쉽게함
#### <br>
## # BABEL
#### : 최신의 JAVASCRIPT를 모든 브라우저에서 동작할 수 있게함
#### <br>
## # WEBPACK
#### : 여러 개의 JAVASCRIPT 파일을 하나로 묶어줌, SPA에 유리, 성능 최적화
#### <br>
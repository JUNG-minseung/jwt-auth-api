# JWT 인증/인가 API 서버 (Node.js + Express)

이 프로젝트는 Node.js와 Express를 기반으로 한 **JWT 인증/인가 API**를 구현한 백엔드 서버입니다.  
사용자는 이메일과 비밀번호로 회원가입/로그인하고, JWT 토큰을 통해 보호된 리소스에 접근할 수 있습니다.

## 🔗 배포 주소

- API 서버: [http://13.211.71.226:3000](http://13.211.71.226:3000)
- Swagger 문서: [http://13.211.71.226:3000/api-docs](http://13.211.71.226:3000/api-docs)

## 🛠 사용 기술

- **Node.js**, **Express**
- **JWT (jsonwebtoken)** - 인증 토큰 발급 및 검증
- **Jest** - 유닛 테스트
- **Swagger (swagger-jsdoc + swagger-ui-express)** - API 문서화
- **AWS EC2** - 배포

## 📁 프로젝트 구조
📦project-root
┣ 📂routes # 인증 관련 라우터 
┣ 📂controllers # 비즈니스 로직 처리
┣ 📂middlewares # 인증 미들웨어
┣ 📂tests # Jest 기반 테스트 코드 
┣ app.js # 앱 초기 설정 
┣ server.js # 서버 진입점 
┣ swagger.js # Swagger 설정 
┗ .env # 환경 변수

## ✨ 기능 요약

### ✅ 회원가입

`POST /api/signup`  
이메일과 비밀번호를 입력받아 사용자 등록

### ✅ 로그인

`POST /api/login`  
유효한 로그인 정보로 JWT 토큰 발급

### ✅ 프로필 조회 (보호된 라우트)

`GET /api/profile`  
JWT 토큰을 `Authorization` 헤더에 담아 요청 → 사용자 정보 반환

## 🔐 인증 방식 (JWT)

- 로그인 성공 시 `Bearer` 타입의 JWT 토큰 발급
- 보호된 라우트는 `Authorization: Bearer <token>` 헤더를 통해 접근 가능

## 🧪 테스트

```bash
npm test

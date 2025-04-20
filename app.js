// Express 앱 설정, 라우터/미들웨어 연결

const express = require('express');
const authRoutes = require('./routes/auth.routes');
const swaggerSetup = require('./swagger');

const app = express();

app.use(express.json()); // JSON 요청 파싱
app.use('/api', authRoutes); // 인증 라우트 등록
swaggerSetup(app); // Swagger 문서화 설정

module.exports = app;
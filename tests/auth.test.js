// 	Jest + Supertest 기반 회원가입/로그인 테스트 코드

const request = require('supertest');
const app = require('../app');

describe('Auth API 테스트', () => {
  it('회원가입 성공', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({ username: 'testuser', password: 'password' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('회원가입이 완료되었습니다.');
  });

  it('중복 회원가입 실패', async () => {
    await request(app).post('/api/signup').send({ username: 'testuser', password: 'password' });

    const res = await request(app).post('/api/signup').send({ username: 'testuser', password: 'password' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error.code).toBe('USER_ALREADY_EXISTS');
  });

  it('로그인 성공 및 토큰 발급', async () => {
    await request(app).post('/api/signup').send({ username: 'loginuser', password: 'pass123' });

    const res = await request(app)
      .post('/api/login')
      .send({ username: 'loginuser', password: 'pass123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('로그인 실패', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'wronguser', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
  });
});

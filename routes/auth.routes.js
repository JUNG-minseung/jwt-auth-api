// /signup, /login, 보호된 라우터 정의

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: 회원가입
 *     description: 사용자 계정을 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       "201":
 *         description: 회원가입 성공
 *       "400":
 *         description: 잘못된 요청
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: 로그인
 *     description: 이메일과 비밀번호를 입력하여 JWT 토큰을 발급받습니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "mypassword"
 *     responses:
 *       "200":
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *       "400":
 *         description: 잘못된 요청
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: 인증된 사용자 정보 조회
 *     description: JWT 토큰을 이용하여 사용자 정보를 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: 사용자 정보 반환
 *       "401":
 *         description: 인증 실패
 */
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
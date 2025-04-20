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
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: 로그인
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: 인증된 사용자 정보
 */
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;

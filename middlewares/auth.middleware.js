//JWT 토큰 인증 미들웨어

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      error: { code: 'NO_TOKEN', message: '토큰이 필요합니다.' }
    });
  }

  try {
    const decoded = jwt.verify(authHeader, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: { code: 'INVALID_TOKEN', message: '유효하지 않은 토큰입니다.' }
    });
  }
};

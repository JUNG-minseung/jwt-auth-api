//회원가입, 로그인 기능 구현

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: { code: 'INVALID_INPUT', message: '아이디와 비밀번호를 입력하세요.' }
    });
  }

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({
      error: { code: 'USER_ALREADY_EXISTS', message: '이미 가입된 사용자입니다.' }
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      error: { code: 'INVALID_CREDENTIALS', message: '아이디 또는 비밀번호가 올바르지 않습니다.' }
    });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({ token });
};

exports.getProfile = (req, res) => {
  res.status(200).json({ username: req.user.username });
};
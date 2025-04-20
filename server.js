//포트 3000에서 서버 실행 (0.0.0.0:3000)

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
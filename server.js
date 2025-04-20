//포트 3000에서 서버 실행 (0.0.0.0:3000)

const cors = require('cors');
app.use(cors());

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
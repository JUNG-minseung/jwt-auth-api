// 	Swagger 설정 및 /api-docs 라우트 연결

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JWT 인증 API',
      version: '1.0.0',
      description: 'Node.js 기반 JWT 인증 API',
    },
    paths: {
      '/api/login': {
        post: {
          summary: '사용자 로그인',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'user@example.com' },
                    password: { type: 'string', example: 'mypassword' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: '로그인 성공',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: { type: 'string', example: 'eyJhbGciOiJIUzI1...' },
                    },
                  },
                },
              },
            },
            '400': { description: '잘못된 요청' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

import swaggerAutogen from 'swagger-autogen';
const swaggerAutogenInstance = swaggerAutogen({
  language: 'ko',
  openapi: '3.0.0'
});

const doc = {
  info: {
    title: 'Recipe GPT AI Server',
    description: 'Recipe GPT AI Server API Docs',
  },
  host: '',
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key'
    }
  },
  definitions: {
    GenerateReq: {
      $ingredients: [''],
      $seasonings: ['']
    },
    GenerateRes: {
      name: 'string',
      description: 'string',
      ingredients: ['string'],
      seasonings: ['string']
    },
    GenerateBadRequestRes: {
      statusCode: 400,
      message: 'string',
      fields: {
        ingredients: '재료는 3개 이상이여야 합니다'
      }
    },
    GenerateConflictRes: {
      statusCode: 409,
      message: '재료 목록에는 음식 재료만 포함되어야 합니다. 컴퓨터, 마우스, 모니터는 요리에 사용되지 않는 물품입니다.'
    },
    UnAuthorizedRes: {
      statusCode: 401,
      message: 'UnAuthorized'
    },
    NotImplementedRes: {
      statusCode: 501,
      message: 'Not Implemented'
    },
  }
};

const outputFile = './dist/swagger/swagger-output.json';
const endpointsFiles = [
  './dist/domain/generate/controller/generateController.js'
];

swaggerAutogenInstance(outputFile, endpointsFiles, doc);
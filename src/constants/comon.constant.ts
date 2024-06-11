export const SWAGGER_CONSTANT = {
  TITLE: 'My NestJS API',
  DESCRIPTION: 'API documentation for my NestJS application',
  VERSION: '1.0',
};

export const LOGGING = {
  responseText: (statusCode, elapsedTime) =>
    `Response - Status: ${statusCode}, Elapsed Time: ${elapsedTime}ms`,
  requestText: (method, url, headers) =>
    `Request - Method: ${method}, URL: ${url}, Headers: ${JSON.stringify(headers)}`,
};

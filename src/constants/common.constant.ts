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
  methodNotAllowed: (method) =>
    `Method: ${method}, Message: Method Not Allowed`,
};

export const HTTP_STATUS_MESSAGES = {
  OK: 'OK',
  CREATED: 'Created',
  NO_CONTENT: 'No Content',
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  CONFLICT: 'Conflict',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  NOT_IMPLEMENTED: 'Not Implemented',
  BAD_GATEWAY: 'Bad Gateway',
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  GATEWAY_TIMEOUT: 'Gateway Timeout',
};

export const ERROR_MESSAGES = {
  DECODE_TOKEN: 'Error decoding token',
};

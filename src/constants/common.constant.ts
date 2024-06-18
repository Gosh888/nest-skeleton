export const SWAGGER_CONSTANT = {
  TITLE: 'My NestJS API',
  DESCRIPTION: 'API documentation for my NestJS application',
  VERSION: '1.0',
  COOKIE: 'refreshToken',
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

export const COMMON_ERROR_MESSAGES = {
  DECODE_TOKEN: 'Error decoding token',
  EMAIL_NOT_VERIFIED: 'Email not verified',
  PASSWORD:
    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and number.',
};

export const REG_EXP = {
  VALIDATE_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
};

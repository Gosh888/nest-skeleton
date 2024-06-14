import { HttpException } from '@nestjs/common';

export const getExceptionErrorMessage = (exception) => {
  let message: string;
  if (exception instanceof HttpException) {
    const errorResponse = exception.getResponse() as any;
    [message] = errorResponse.message;
  }

  // TODO: this logic needs other branch constants
  return message /* || HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR */;
};

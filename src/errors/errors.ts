import { HTTP_STATUS_MESSAGES } from '../constants/common.constant';

interface errorType {
  message: string;
  property: string | null;
}

export class CustomError extends Error {
  public statusCode: number;
  public internalCode: number;
  public errors: errorType[];
  public name: string;
  constructor(errors: errorType[], statusCode: number, internalCode?: number) {
    super('custom error');
    this.errors = errors;
    this.statusCode = statusCode;
    this.internalCode = internalCode || statusCode;
  }
}

export class InternalServerError extends CustomError {
  constructor(
    message: string = HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
    internalCode?: number,
  ) {
    const statusCode = 500;
    const property = null;
    super([{ message, property }], statusCode, internalCode);
    this.name = this.constructor.name;
  }
}

export class UnauthorizedError extends CustomError {
  constructor(
    message: string = HTTP_STATUS_MESSAGES.UNAUTHORIZED,
    internalCode?: number,
  ) {
    const statusCode = 401;
    const property = null;
    super([{ message, property }], statusCode, internalCode);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string, internalCode?: number) {
    const statusCode = 400;
    const property = null;
    super([{ message, property }], statusCode, internalCode);
    this.name = this.constructor.name;
  }
}

export class ForbiddenError extends CustomError {
  constructor(
    message: string = HTTP_STATUS_MESSAGES.FORBIDDEN,
    internalCode?: number,
  ) {
    const statusCode = 403;
    const property = null;
    super([{ message, property }], statusCode, internalCode);
    this.name = this.constructor.name;
  }
}

export class ClassValidatorError extends CustomError {
  constructor(errors: errorType[], internalCode?: number) {
    const statusCode = 400;
    super(errors, statusCode, internalCode);
    this.name = this.constructor.name;
  }
}

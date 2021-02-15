type ErrorData = { [key: string]: any };

export class BaseError extends Error {
  constructor(
    public message: string = 'No error message',
    public code: string | number = 'INTERNAL_ERROR',
    public status: number = 500,
    public data: ErrorData = {},
  ) {
    super();
  }
}
export class InvalidTokenError extends BaseError {
  constructor(message = 'Authentication token is misshing or invalid') {
    super(message, 'INVALID_TOKEN', 401);
  }
}

export class EntityNotFoundError extends BaseError {
  constructor(entityName: string) {
    super(`${entityName} not found.`, 'ENTITY_NOT_FOUND', 404);
  }
}

export class BadUserInput extends BaseError {
  constructor(errorData: ErrorData) {
    super('There were validation errors.', 'BAD_USER_INPUT', 400, errorData);
  }
}

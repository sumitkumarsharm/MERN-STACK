class ApiError extends Error {
  constructor(
    statusCode,
    message = "somthing went wrong",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;

    Object.defineProperty(this, "message", {
      value: message,
      enumerable: true,
      writable: true,
    });

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

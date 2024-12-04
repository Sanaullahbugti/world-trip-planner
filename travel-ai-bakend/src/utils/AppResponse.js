class SuccessResponse {
    constructor(res, statusCode, message, data = null) {
      this.res = res;
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
  
    send() {
      return this.res.status(this.statusCode).json({
        status: 'success',
        message: this.message,
        data: this.data,
      });
    }
  }
  
  class ErrorResponse {
    constructor(res, statusCode, message, error = null) {
      this.res = res;
      this.statusCode = statusCode;
      this.message = message;
      this.error = error;
    }
  
    send() {
      return this.res.status(this.statusCode).json({
        status: 'error',
        message: this.message,
        error: this.error,
      });
    }
  }
  
  module.exports = { SuccessResponse, ErrorResponse };
  
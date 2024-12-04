const { SuccessResponse, ErrorResponse } = require('./AppResponse');
const { encrypt } = require('./encryption');
const { ResponseCode } = require('../constants/ResponseCode');

class _Response {
  static async send(res, { status, message, data = null, error = null }) {
    switch (status) {
      case ResponseCode.SUCCESS:
        // const encryptedData = data ? await encrypt(JSON.stringify(data)) : null;
        const  encryptedData=data
        new SuccessResponse(res, ResponseCode.SUCCESS, message, encryptedData).send();
        break;
      case ResponseCode.BAD_REQUEST:
        new ErrorResponse(res, ResponseCode.BAD_REQUEST, message, error).send();
        break;
      case ResponseCode.UNAUTHORIZED:
        new ErrorResponse(res, ResponseCode.UNAUTHORIZED, message, error).send();
        break;
      case ResponseCode.FORBIDDEN:
        new ErrorResponse(res, ResponseCode.FORBIDDEN, message, error).send();
        break;
      case ResponseCode.NOT_FOUND:
        new ErrorResponse(res, ResponseCode.NOT_FOUND, message, error).send();
        break;
      case ResponseCode.INTERNAL_ERROR:
      default:
        new ErrorResponse(res, ResponseCode.INTERNAL_ERROR, message, error).send();
        break;
    }
  }
}

module.exports = _Response;

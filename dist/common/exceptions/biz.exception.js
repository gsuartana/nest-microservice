"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizException = exports.BusinessException = void 0;
const common_1 = require("@nestjs/common");
const response_constant_1 = require("../constants/response.constant");
class BusinessException extends common_1.HttpException {
    errorCode;
    constructor(error) {
        if (!error.includes(':')) {
            super(common_1.HttpException.createBody({
                code: response_constant_1.RESPONSE_SUCCESS_CODE,
                message: error,
            }), common_1.HttpStatus.OK);
            this.errorCode = response_constant_1.RESPONSE_SUCCESS_CODE;
            return;
        }
        const [code, message] = error.split(':');
        super(common_1.HttpException.createBody({
            code,
            message,
        }), common_1.HttpStatus.OK);
        this.errorCode = Number(code);
    }
    getErrorCode() {
        return this.errorCode;
    }
}
exports.BusinessException = BusinessException;
exports.BizException = BusinessException;
//# sourceMappingURL=biz.exception.js.map
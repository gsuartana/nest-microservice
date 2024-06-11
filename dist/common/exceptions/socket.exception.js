"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketException = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
class SocketException extends websockets_1.WsException {
    errorCode;
    constructor(...args) {
        const error = args[0];
        if (typeof error === 'string') {
            super(common_1.HttpException.createBody({
                code: 0,
                message: error,
            }));
            this.errorCode = 0;
            return;
        }
        const [code, message] = error.split(':');
        super(common_1.HttpException.createBody({
            code,
            message,
        }));
        this.errorCode = Number(code);
    }
    getErrorCode() {
        return this.errorCode;
    }
}
exports.SocketException = SocketException;
//# sourceMappingURL=socket.exception.js.map
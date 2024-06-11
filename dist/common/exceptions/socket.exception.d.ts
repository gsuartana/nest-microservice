import { WsException } from '@nestjs/websockets';
import { ErrorEnum } from '~/common/constants/error-code.constant';
export declare class SocketException extends WsException {
    private errorCode;
    constructor(message: string);
    constructor(error: ErrorEnum);
    getErrorCode(): number;
}

import { HttpException } from '@nestjs/common';
import { ErrorEnum } from '~/common/constants/error-code.constant';
export declare class BusinessException extends HttpException {
    private errorCode;
    constructor(error: ErrorEnum | string);
    getErrorCode(): number;
}
export { BusinessException as BizException };

import { HttpStatus, Type } from '@nestjs/common';
export declare function ApiResult<TModel extends Type<any>>({ type, isPage, status, }: {
    type?: TModel | TModel[];
    isPage?: boolean;
    status?: HttpStatus;
}): any;

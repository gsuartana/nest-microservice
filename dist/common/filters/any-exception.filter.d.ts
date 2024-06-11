import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger;
    constructor();
    catch(exception: HttpException, host: ArgumentsHost): void;
    registerCatchAllExceptionsHook(): void;
}

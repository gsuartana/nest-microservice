import { ConsoleLogger, ConsoleLoggerOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'winston-daily-rotate-file';
import { ConfigKeyPaths } from '~/infrastructure/config';
export declare enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug",
    VERBOSE = "verbose"
}
export declare class LoggerService extends ConsoleLogger {
    private configService;
    private winstonLogger;
    constructor(context: string, options: ConsoleLoggerOptions, configService: ConfigService<ConfigKeyPaths>);
    protected get level(): LogLevel;
    protected get maxFiles(): number;
    protected initWinston(): void;
    verbose(message: any, context?: string): void;
    debug(message: any, context?: string): void;
    log(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    error(message: any, stack?: string, context?: string): void;
}

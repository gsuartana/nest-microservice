import { IAppConfig, appRegToken } from './app.config';
import { IRedisConfig, redisRegToken } from './redis.config';
import { ISecurityConfig, securityRegToken } from './security.config';
import { ISwaggerConfig, swaggerRegToken } from './swagger.config';
export * from './app.config';
export * from './redis.config';
export * from './swagger.config';
export * from './security.config';
export interface AllConfigType {
    [appRegToken]: IAppConfig;
    [redisRegToken]: IRedisConfig;
    [securityRegToken]: ISecurityConfig;
    [swaggerRegToken]: ISwaggerConfig;
}
export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;
declare const _default: {
    AppConfig: (() => {
        name: string;
        port: number;
        baseUrl: string;
        globalPrefix: string;
        locale: string;
        multiDeviceLogin: boolean;
        logger: {
            level: string;
            maxFiles: number;
        };
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        name: string;
        port: number;
        baseUrl: string;
        globalPrefix: string;
        locale: string;
        multiDeviceLogin: boolean;
        logger: {
            level: string;
            maxFiles: number;
        };
    }>;
    RedisConfig: (() => {
        host: string;
        port: number;
        password: string;
        db: number;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        host: string;
        port: number;
        password: string;
        db: number;
    }>;
    SecurityConfig: (() => {
        jwtSecret: string;
        jwtExprire: number;
        refreshSecret: string;
        refreshExpire: number;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        jwtSecret: string;
        jwtExprire: number;
        refreshSecret: string;
        refreshExpire: number;
    }>;
    SwaggerConfig: (() => {
        enable: boolean;
        path: string;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        enable: boolean;
        path: string;
    }>;
};
export default _default;

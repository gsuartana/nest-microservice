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
    AppConfig: any;
    RedisConfig: any;
    SecurityConfig: any;
    SwaggerConfig: any;
};
export default _default;

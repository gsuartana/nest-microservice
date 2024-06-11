import { ConfigType } from '@nestjs/config';
export declare const redisRegToken = "redis";
export declare const RedisConfig: (() => {
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
export type IRedisConfig = ConfigType<typeof RedisConfig>;

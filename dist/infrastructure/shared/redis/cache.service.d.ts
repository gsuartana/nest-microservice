import { Emitter } from '@socket.io/redis-emitter';
import { Cache } from 'cache-manager';
export type TCacheKey = string;
export type TCacheResult<T> = Promise<T | undefined>;
export declare class CacheService {
    private cache;
    private ioRedis;
    constructor(cache: Cache);
    private get redisClient();
    get<T>(key: TCacheKey): TCacheResult<T>;
    set(key: TCacheKey, value: any, milliseconds: number): any;
    getClient(): Redis;
    private _emitter;
    get emitter(): Emitter;
    cleanCatch(): Promise<void>;
    cleanAllRedisKey(): Promise<void>;
}

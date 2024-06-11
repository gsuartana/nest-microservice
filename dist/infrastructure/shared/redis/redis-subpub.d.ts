import type { Redis, RedisOptions } from 'ioredis';
export declare class RedisSubPub {
    private redisConfig;
    private channelPrefix;
    pubClient: Redis;
    subClient: Redis;
    constructor(redisConfig: RedisOptions, channelPrefix?: string);
    init(): void;
    publish(event: string, data: any): Promise<void>;
    private ctc;
    subscribe(event: string, callback: (data: any) => void): Promise<void>;
    unsubscribe(event: string, callback: (data: any) => void): Promise<void>;
}

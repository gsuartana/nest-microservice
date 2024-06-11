import { RedisSubPub } from './redis-subpub';
export declare class RedisPubSubService {
    private readonly redisSubPub;
    constructor(redisSubPub: RedisSubPub);
    publish(event: string, data: any): Promise<void>;
    subscribe(event: string, callback: (data: any) => void): Promise<void>;
    unsubscribe(event: string, callback: (data: any) => void): Promise<void>;
}

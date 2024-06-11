"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSubPub = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
class RedisSubPub {
    redisConfig;
    channelPrefix;
    pubClient;
    subClient;
    constructor(redisConfig, channelPrefix = 'image-search-channel#') {
        this.redisConfig = redisConfig;
        this.channelPrefix = channelPrefix;
        this.init();
    }
    init() {
        const redisOptions = {
            host: this.redisConfig.host,
            port: this.redisConfig.port,
        };
        if (this.redisConfig.password)
            redisOptions.password = this.redisConfig.password;
        const pubClient = new ioredis_1.default(redisOptions);
        const subClient = pubClient.duplicate();
        this.pubClient = pubClient;
        this.subClient = subClient;
    }
    async publish(event, data) {
        const channel = this.channelPrefix + event;
        const _data = JSON.stringify(data);
        if (event !== 'log')
            common_1.Logger.debug(`publish event：${channel} <- ${_data}`, RedisSubPub.name);
        await this.pubClient.publish(channel, _data);
    }
    ctc = new WeakMap();
    async subscribe(event, callback) {
        const myChannel = this.channelPrefix + event;
        this.subClient.subscribe(myChannel);
        const cb = (channel, message) => {
            if (channel === myChannel) {
                if (event !== 'log')
                    common_1.Logger.debug(`receive events：${channel} -> ${message}`, RedisSubPub.name);
                callback(JSON.parse(message));
            }
        };
        this.ctc.set(callback, cb);
        this.subClient.on('message', cb);
    }
    async unsubscribe(event, callback) {
        const channel = this.channelPrefix + event;
        this.subClient.unsubscribe(channel);
        const cb = this.ctc.get(callback);
        if (cb) {
            this.subClient.off('message', cb);
            this.ctc.delete(callback);
        }
    }
}
exports.RedisSubPub = RedisSubPub;
//# sourceMappingURL=redis-subpub.js.map
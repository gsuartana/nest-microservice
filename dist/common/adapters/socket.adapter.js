"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = exports.RedisIoAdapterKey = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redis_constant_1 = require("../../infrastructure/shared/redis/redis.constant");
exports.RedisIoAdapterKey = 'm-shop-socket';
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    app;
    constructor(app) {
        super(app);
        this.app = app;
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        const { pubClient, subClient } = this.app.get(redis_constant_1.REDIS_PUBSUB);
        const redisAdapter = (0, redis_adapter_1.createAdapter)(pubClient, subClient, {
            key: exports.RedisIoAdapterKey,
            requestsTimeout: 10000,
        });
        server.adapter(redisAdapter);
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=socket.adapter.js.map
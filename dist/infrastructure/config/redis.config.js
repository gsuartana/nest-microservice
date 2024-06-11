"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfig = exports.redisRegToken = void 0;
const config_1 = require("@nestjs/config");
const env_1 = require("../../common/global/env");
exports.redisRegToken = 'redis';
exports.RedisConfig = (0, config_1.registerAs)(exports.redisRegToken, () => ({
    host: (0, env_1.env)('REDIS_HOST', '127.0.0.1'),
    port: (0, env_1.envNumber)('REDIS_PORT', 6379),
    password: (0, env_1.env)('REDIS_PASSWORD'),
    db: (0, env_1.envNumber)('REDIS_DB'),
}));
//# sourceMappingURL=redis.config.js.map
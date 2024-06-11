"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_ioredis_yet_1 = require("cache-manager-ioredis-yet");
const cache_service_1 = require("./cache.service");
const redis_subpub_1 = require("./redis-subpub");
const redis_constant_1 = require("./redis.constant");
const subpub_service_1 = require("./subpub.service");
const providers = [
    cache_service_1.CacheService,
    {
        provide: redis_constant_1.REDIS_PUBSUB,
        useFactory: (configService) => {
            const redisOptions = configService.get('redis');
            return new redis_subpub_1.RedisSubPub(redisOptions);
        },
        inject: [config_1.ConfigService],
    },
    subpub_service_1.RedisPubSubService,
];
let RedisModule = class RedisModule {
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const redisOptions = configService.get('redis');
                    return {
                        isGlobal: true,
                        store: cache_manager_ioredis_yet_1.redisStore,
                        isCacheableValue: () => true,
                        ...redisOptions,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            nestjs_redis_1.RedisModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    readyLog: true,
                    config: configService.get('redis'),
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers,
        exports: [...providers, cache_manager_1.CacheModule],
    })
], RedisModule);
//# sourceMappingURL=redis.module.js.map
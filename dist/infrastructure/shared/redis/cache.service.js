"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const redis_emitter_1 = require("@socket.io/redis-emitter");
const socket_adapter_1 = require("../../../common/adapters/socket.adapter");
const cache_constant_1 = require("../../../common/constants/cache.constant");
const redis_util_1 = require("../../../common/utils/redis.util");
let CacheService = class CacheService {
    cache;
    ioRedis;
    constructor(cache) {
        this.cache = cache;
    }
    get redisClient() {
        return this.cache.store.client;
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value, milliseconds) {
        return this.cache.set(key, value, milliseconds);
    }
    getClient() {
        return this.redisClient;
    }
    _emitter;
    get emitter() {
        if (this._emitter)
            return this._emitter;
        this._emitter = new redis_emitter_1.Emitter(this.redisClient, {
            key: socket_adapter_1.RedisIoAdapterKey,
        });
        return this._emitter;
    }
    async cleanCatch() {
        const redis = this.getClient();
        const keys = await redis.keys(`${cache_constant_1.API_CACHE_PREFIX}*`);
        await Promise.all(keys.map(key => redis.del(key)));
    }
    async cleanAllRedisKey() {
        const redis = this.getClient();
        const keys = await redis.keys((0, redis_util_1.getRedisKey)('*'));
        await Promise.all(keys.map(key => redis.del(key)));
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CacheService);
//# sourceMappingURL=cache.service.js.map
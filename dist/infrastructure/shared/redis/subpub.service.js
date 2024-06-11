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
exports.RedisPubSubService = void 0;
const common_1 = require("@nestjs/common");
const redis_subpub_1 = require("./redis-subpub");
const redis_constant_1 = require("./redis.constant");
let RedisPubSubService = class RedisPubSubService {
    redisSubPub;
    constructor(redisSubPub) {
        this.redisSubPub = redisSubPub;
    }
    async publish(event, data) {
        return this.redisSubPub.publish(event, data);
    }
    async subscribe(event, callback) {
        return this.redisSubPub.subscribe(event, callback);
    }
    async unsubscribe(event, callback) {
        return this.redisSubPub.unsubscribe(event, callback);
    }
};
exports.RedisPubSubService = RedisPubSubService;
exports.RedisPubSubService = RedisPubSubService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_constant_1.REDIS_PUBSUB)),
    __metadata("design:paramtypes", [redis_subpub_1.RedisSubPub])
], RedisPubSubService);
//# sourceMappingURL=subpub.service.js.map
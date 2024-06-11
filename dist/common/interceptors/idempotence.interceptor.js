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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdempotenceInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const utils_1 = require("../utils");
const redis_util_1 = require("../utils/redis.util");
const cache_service_1 = require("../../infrastructure/shared/redis/cache.service");
const idempotence_decorator_1 = require("../decorators/idempotence.decorator");
const IdempotenceHeaderKey = 'x-idempotence';
let IdempotenceInterceptor = class IdempotenceInterceptor {
    reflector;
    cacheService;
    constructor(reflector, cacheService) {
        this.reflector = reflector;
        this.cacheService = cacheService;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        if (request.method.toUpperCase() === 'GET')
            return next.handle();
        const handler = context.getHandler();
        const options = this.reflector.get(idempotence_decorator_1.HTTP_IDEMPOTENCE_OPTIONS, handler);
        if (!options)
            return next.handle();
        const { errorMessage = 'The same request can only be sent once within 60 seconds after it is successful.', pendingMessage = 'The same request is being processed...', handler: errorHandler, expired = 60, disableGenerateKey = false, } = options;
        const redis = this.cacheService.getClient();
        const idempotence = request.headers[IdempotenceHeaderKey];
        const key = disableGenerateKey
            ? undefined
            : options.generateKey
                ? options.generateKey(request)
                : this.generateKey(request);
        const idempotenceKey = !!(idempotence || key) && (0, redis_util_1.getRedisKey)(`idempotence:${idempotence || key}`);
        (0, common_1.SetMetadata)(idempotence_decorator_1.HTTP_IDEMPOTENCE_KEY, idempotenceKey)(handler);
        if (idempotenceKey) {
            const resultValue = (await redis.get(idempotenceKey));
            if (resultValue !== null) {
                if (errorHandler)
                    return await errorHandler(request);
                const message = {
                    1: errorMessage,
                    0: pendingMessage,
                }[resultValue];
                throw new common_1.ConflictException(message);
            }
            else {
                await redis.set(idempotenceKey, '0', 'EX', expired);
            }
        }
        return next.handle().pipe((0, rxjs_1.tap)(async () => {
            idempotenceKey && (await redis.set(idempotenceKey, '1', 'KEEPTTL'));
        }), (0, rxjs_1.catchError)(async (err) => {
            if (idempotenceKey)
                await redis.del(idempotenceKey);
            throw err;
        }));
    }
    generateKey(req) {
        const { body, params, query = {}, headers, url } = req;
        const obj = { body, url, params, query };
        const uuid = headers['x-uuid'];
        if (uuid) {
            obj.uuid = uuid;
        }
        else {
            const ua = headers['user-agent'];
            const ip = (0, utils_1.getIp)(req);
            if (!ua && !ip)
                return undefined;
            Object.assign(obj, { ua, ip });
        }
        return (0, utils_1.hashString)(JSON.stringify(obj));
    }
};
exports.IdempotenceInterceptor = IdempotenceInterceptor;
exports.IdempotenceInterceptor = IdempotenceInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        cache_service_1.CacheService])
], IdempotenceInterceptor);
//# sourceMappingURL=idempotence.interceptor.js.map
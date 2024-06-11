"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisKey = void 0;
const prefix = 'image-search';
function getRedisKey(key, ...concatKeys) {
    return `${prefix}:${key}${concatKeys && concatKeys.length ? `:${concatKeys.join('_')}` : ''}`;
}
exports.getRedisKey = getRedisKey;
//# sourceMappingURL=redis.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageSearchKey = void 0;
const constants_1 = require("../constants");
function getImageSearchKey(val) {
    return `${constants_1.RedisKeys.IMAGE_SEARCH_PREFIX}${String(val)}`;
}
exports.getImageSearchKey = getImageSearchKey;
//# sourceMappingURL=genRedisKey.js.map
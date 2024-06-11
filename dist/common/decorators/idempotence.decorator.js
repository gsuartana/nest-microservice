"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Idempotence = exports.HTTP_IDEMPOTENCE_OPTIONS = exports.HTTP_IDEMPOTENCE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.HTTP_IDEMPOTENCE_KEY = '__idempotence_key__';
exports.HTTP_IDEMPOTENCE_OPTIONS = '__idempotence_options__';
function Idempotence(options) {
    return function (target, key, descriptor) {
        (0, common_1.SetMetadata)(exports.HTTP_IDEMPOTENCE_OPTIONS, options || {})(descriptor.value);
    };
}
exports.Idempotence = Idempotence;
//# sourceMappingURL=idempotence.decorator.js.map
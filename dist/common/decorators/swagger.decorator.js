"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSecurityAuth = exports.API_SECURITY_AUTH = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
exports.API_SECURITY_AUTH = 'api-key';
function ApiSecurityAuth() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiSecurity)(exports.API_SECURITY_AUTH));
}
exports.ApiSecurityAuth = ApiSecurityAuth;
//# sourceMappingURL=swagger.decorator.js.map
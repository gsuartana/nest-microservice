"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyGuard = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../common/decorators");
const env_1 = require("../../common/global/env");
let ApiKeyGuard = class ApiKeyGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers[decorators_1.API_SECURITY_AUTH];
        if (!apiKey)
            throw new common_1.UnauthorizedException('API key is missing.');
        if (apiKey !== (0, env_1.env)('API_KEY'))
            throw new common_1.UnauthorizedException('Invalid API key.');
        return true;
    }
};
exports.ApiKeyGuard = ApiKeyGuard;
exports.ApiKeyGuard = ApiKeyGuard = __decorate([
    (0, common_1.Injectable)()
], ApiKeyGuard);
//# sourceMappingURL=api-key.guard.js.map
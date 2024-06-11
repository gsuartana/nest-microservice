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
exports.HealthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const terminus_1 = require("@nestjs/terminus");
const api_key_guard_1 = require("../auth/api-key.guard");
let HealthController = class HealthController {
    http;
    constructor(http) {
        this.http = http;
    }
    async checkNetwork() {
        return this.http.pingCheck('suartana', 'https://suartana.ch/');
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)('network'),
    (0, terminus_1.HealthCheck)(),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint that requires API key authentication' }),
    (0, swagger_1.ApiSecurity)('api-key'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkNetwork", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('Health - health check'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HttpHealthIndicator])
], HealthController);
//# sourceMappingURL=health.controller.js.map
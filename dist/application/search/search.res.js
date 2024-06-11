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
exports.SearchRes = void 0;
const swagger_1 = require("@nestjs/swagger");
class SearchRes {
    content;
    imagesize;
    related;
}
exports.SearchRes = SearchRes;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'matches data' }),
    __metadata("design:type", Array)
], SearchRes.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'image size' }),
    __metadata("design:type", Array)
], SearchRes.prototype, "imagesize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'related data' }),
    __metadata("design:type", Array)
], SearchRes.prototype, "related", void 0);
//# sourceMappingURL=search.res.js.map
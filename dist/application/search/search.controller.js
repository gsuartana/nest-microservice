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
var SearchController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../common/decorators");
const api_key_guard_1 = require("../auth/api-key.guard");
const search_filter_service_1 = require("./search.filter.service");
const search_req_1 = require("./search.req");
const search_res_1 = require("./search.res");
const search_service_1 = require("./search.service");
let SearchController = SearchController_1 = class SearchController {
    searchService;
    searchFilterService;
    logger = new common_1.Logger(SearchController_1.name);
    constructor(searchService, searchFilterService) {
        this.searchService = searchService;
        this.searchFilterService = searchFilterService;
    }
    async searchImage(res, body) {
        const validated = await this.searchFilterService.validateSearchImage(body.search);
        if (!validated) {
            const data = await this.searchService.searchImageFromBing(body.search);
            res.status(common_1.HttpStatus.OK).send(data);
        }
        this.logger.log(`Searching for ${body.search} is prohibited`);
        res.status(common_1.HttpStatus.NOT_FOUND).send({ message: `No result found for ${body.search}, please try to search using other words` });
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint that requires API key authentication' }),
    (0, swagger_1.ApiSecurity)('api-key'),
    (0, decorators_1.ApiResult)({ type: [search_res_1.SearchRes] }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, search_req_1.SearchReq]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "searchImage", null);
exports.SearchController = SearchController = SearchController_1 = __decorate([
    (0, swagger_1.ApiTags)('Search'),
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [search_service_1.SearchService, search_filter_service_1.SearchFilterService])
], SearchController);
//# sourceMappingURL=search.controller.js.map
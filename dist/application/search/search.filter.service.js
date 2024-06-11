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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SearchFilterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFilterService = void 0;
const common_1 = require("@nestjs/common");
const search_filter_json_1 = __importDefault(require("./search-filter.json"));
let SearchFilterService = SearchFilterService_1 = class SearchFilterService {
    logger = new common_1.Logger(SearchFilterService_1.name);
    filterList = search_filter_json_1.default;
    constructor() { }
    async validateSearchImage(search) {
        return this.checkForFilteredWords(search, this.filterList);
    }
    checkForFilteredWords(searchValue, jsonString) {
        try {
            const jsonObject = jsonString.abuse;
            for (const key in jsonObject) {
                const value = jsonObject[key];
                if (typeof value === 'string' && value.includes(searchValue.toLocaleLowerCase()))
                    return true;
            }
            return false;
        }
        catch (error) {
            console.error('Invalid JSON format.');
            return false;
        }
    }
};
exports.SearchFilterService = SearchFilterService;
exports.SearchFilterService = SearchFilterService = SearchFilterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SearchFilterService);
//# sourceMappingURL=search.filter.service.js.map
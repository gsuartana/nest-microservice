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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SearchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const env_1 = require("../../common/global/env");
const genRedisKey_1 = require("../../common/helper/genRedisKey");
let SearchService = SearchService_1 = class SearchService {
    redis;
    logger = new common_1.Logger(SearchService_1.name);
    constructor(redis) {
        this.redis = redis;
    }
    async searchImageFromBing(search) {
        const imageResult = await this.redis.get((0, genRedisKey_1.getImageSearchKey)(search));
        if (imageResult) {
            this.logger.log(`Found cached response in redis instance key: ${(0, genRedisKey_1.getImageSearchKey)(search)}`);
            return JSON.parse(imageResult);
        }
        const randomletter = [...Array(4)].map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]).join('');
        const randomangka = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const randomangka3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        const SID = `${randomangka3}BDA51D${randomangka}8690CF8CA38D00E${randomangka3}9`;
        const isStrict = (typeof process.env.STRICT !== 'undefined' && Number.parseInt(process.env.STRICT) === 1);
        const searchParams = new URLSearchParams({
            q: encodeURIComponent(search),
            ADLT: isStrict ? 'STRICT' : 'OFF',
            qft: '%20filterui%3Aimagesize-large',
            form: randomletter,
            cvid: `FD${randomangka}DE6F35${randomangka3}E944B4432A${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}DC5`,
            sid: SID,
            tsc: isStrict ? 'ImageHoverTitle' : 'ImageHoverTitle',
        });
        const browser = await puppeteer_1.default.launch();
        const page = await browser.newPage();
        const url = `http://www.bing.com/images/search?${searchParams.toString()}`;
        await page.goto(url, { waitUntil: 'networkidle2' });
        const matches = await page.$$eval('a[m]', links => links.map(link => link.getAttribute('href')));
        const imgSize = await page.$$eval('div.img_info.hon span.nowrap', spans => spans.map(span => span.textContent.trim()));
        const related = await page.$$eval('a[aria-label]', links => links.map(link => link.getAttribute('href')));
        await browser.close();
        const resultsearch = {
            content: matches,
            imagesize: imgSize,
            related,
        };
        this.logger.log(`New cache key: ${(0, genRedisKey_1.getImageSearchKey)(search)} created for request`);
        await this.redis.set((0, genRedisKey_1.getImageSearchKey)(search), JSON.stringify(resultsearch), 'EX', (0, env_1.env)('REDIS_TTL'));
        return resultsearch;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = SearchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_1.default])
], SearchService);
//# sourceMappingURL=search.service.js.map
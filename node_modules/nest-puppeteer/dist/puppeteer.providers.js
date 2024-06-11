"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPuppeteerProviders = void 0;
const puppeteer_util_1 = require("./puppeteer.util");
function createPuppeteerProviders(instanceName, pages = []) {
    return pages.map(page => ({
        provide: puppeteer_util_1.getPageToken(page),
        useFactory: (context) => context.newPage(),
        inject: [puppeteer_util_1.getContextToken(instanceName)],
    }));
}
exports.createPuppeteerProviders = createPuppeteerProviders;
//# sourceMappingURL=puppeteer.providers.js.map
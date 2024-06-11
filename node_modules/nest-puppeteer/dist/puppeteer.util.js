"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageToken = exports.getContextToken = exports.getBrowserToken = void 0;
const puppeteer_constants_1 = require("./puppeteer.constants");
/**
 * Get a token for the Puppeteer instance for the given Browser name
 * @param instanceName The unique name for the Puppeteer instance
 */
function getBrowserToken(instanceName = puppeteer_constants_1.DEFAULT_PUPPETEER_INSTANCE_NAME) {
    return `${instanceName}Browser`;
}
exports.getBrowserToken = getBrowserToken;
/**
 * Get a token for the Puppeteer instance for the given BrowserContext name
 * @param instanceName The unique name for the Puppeteer instance
 */
function getContextToken(instanceName = puppeteer_constants_1.DEFAULT_PUPPETEER_INSTANCE_NAME) {
    return `${instanceName}Context`;
}
exports.getContextToken = getContextToken;
/**
 * Get a token for the Puppeteer instance for the given Page name
 * @param instanceName The unique name for the Puppeteer instance
 */
function getPageToken(instanceName = puppeteer_constants_1.DEFAULT_PUPPETEER_INSTANCE_NAME) {
    return `${instanceName}Page`;
}
exports.getPageToken = getPageToken;
//# sourceMappingURL=puppeteer.util.js.map
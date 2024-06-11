"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PuppeteerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerModule = void 0;
const common_1 = require("@nestjs/common");
const puppeteer_providers_1 = require("./puppeteer.providers");
const puppeteer_core_module_1 = require("./puppeteer-core.module");
/**
 * Module for the Puppeteer
 */
let PuppeteerModule = PuppeteerModule_1 = class PuppeteerModule {
    /**
     * Inject the Puppeteer synchronously.
     * @param options Options for the Browser to be launched
     * @param instanceName A unique name for the connection.  If not specified, a default name
     * will be used.
     */
    static forRoot(options, instanceName) {
        return {
            module: PuppeteerModule_1,
            global: options === null || options === void 0 ? void 0 : options.isGlobal,
            imports: [puppeteer_core_module_1.PuppeteerCoreModule.forRoot(options, instanceName)],
        };
    }
    /**
     * Inject the Puppeteer asynchronously, allowing any dependencies such as a configuration
     * service to be injected first.
     * @param options Options for asynchronous injection
     */
    static forRootAsync(options) {
        return {
            module: PuppeteerModule_1,
            global: options.isGlobal,
            imports: [puppeteer_core_module_1.PuppeteerCoreModule.forRootAsync(options)],
        };
    }
    /**
     * Inject Pages.
     * @param pages An array of the names of the pages to be injected.
     * @param instanceName A unique name for the connection. If not specified, a default name
     * will be used.
     */
    static forFeature(pages = [], instanceName) {
        const providers = puppeteer_providers_1.createPuppeteerProviders(instanceName, pages);
        return {
            module: PuppeteerModule_1,
            providers,
            exports: providers,
        };
    }
};
PuppeteerModule = PuppeteerModule_1 = __decorate([
    common_1.Module({})
], PuppeteerModule);
exports.PuppeteerModule = PuppeteerModule;
//# sourceMappingURL=puppeteer.module.js.map
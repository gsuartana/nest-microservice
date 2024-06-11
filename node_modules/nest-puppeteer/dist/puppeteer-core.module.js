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
var PuppeteerCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerCoreModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const puppeteer_1 = require("puppeteer");
const puppeteer_constants_1 = require("./puppeteer.constants");
const puppeteer_util_1 = require("./puppeteer.util");
let PuppeteerCoreModule = PuppeteerCoreModule_1 = class PuppeteerCoreModule {
    constructor(instanceName, moduleRef) {
        this.instanceName = instanceName;
        this.moduleRef = moduleRef;
    }
    onApplicationShutdown() {
        return this.onModuleDestroy();
    }
    static forRoot(launchOptions = puppeteer_constants_1.DEFAULT_CHROME_LAUNCH_OPTIONS, instanceName = puppeteer_constants_1.DEFAULT_PUPPETEER_INSTANCE_NAME) {
        const instanceNameProvider = {
            provide: puppeteer_constants_1.PUPPETEER_INSTANCE_NAME,
            useValue: instanceName,
        };
        const browserProvider = {
            provide: puppeteer_util_1.getBrowserToken(instanceName),
            async useFactory() {
                return await puppeteer_1.launch(launchOptions);
            },
        };
        const contextProvider = {
            provide: puppeteer_util_1.getContextToken(instanceName),
            async useFactory(browser) {
                return browser.createIncognitoBrowserContext();
            },
            inject: [puppeteer_util_1.getBrowserToken(instanceName)],
        };
        const pageProvider = {
            provide: puppeteer_util_1.getPageToken(instanceName),
            async useFactory(context) {
                return await context.newPage();
            },
            inject: [puppeteer_util_1.getContextToken(instanceName)],
        };
        return {
            module: PuppeteerCoreModule_1,
            providers: [
                instanceNameProvider,
                browserProvider,
                contextProvider,
                pageProvider,
            ],
            exports: [browserProvider, contextProvider, pageProvider],
        };
    }
    static forRootAsync(options) {
        var _a;
        const puppeteerInstanceName = (_a = options.instanceName) !== null && _a !== void 0 ? _a : puppeteer_constants_1.DEFAULT_PUPPETEER_INSTANCE_NAME;
        const instanceNameProvider = {
            provide: puppeteer_constants_1.PUPPETEER_INSTANCE_NAME,
            useValue: puppeteerInstanceName,
        };
        const browserProvider = {
            provide: puppeteer_util_1.getBrowserToken(puppeteerInstanceName),
            async useFactory(puppeteerModuleOptions) {
                var _a;
                return await puppeteer_1.launch((_a = puppeteerModuleOptions.launchOptions) !== null && _a !== void 0 ? _a : puppeteer_constants_1.DEFAULT_CHROME_LAUNCH_OPTIONS);
            },
            inject: [puppeteer_constants_1.PUPPETEER_MODULE_OPTIONS],
        };
        const contextProvider = {
            provide: puppeteer_util_1.getContextToken(puppeteerInstanceName),
            async useFactory(browser) {
                return await browser.createIncognitoBrowserContext();
            },
            inject: [
                puppeteer_constants_1.PUPPETEER_MODULE_OPTIONS,
                puppeteer_util_1.getBrowserToken(puppeteerInstanceName),
            ],
        };
        const pageProvider = {
            provide: puppeteer_util_1.getPageToken(puppeteerInstanceName),
            async useFactory(context) {
                return await context.newPage();
            },
            inject: [
                puppeteer_constants_1.PUPPETEER_MODULE_OPTIONS,
                puppeteer_util_1.getContextToken(puppeteerInstanceName),
            ],
        };
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: PuppeteerCoreModule_1,
            imports: options.imports,
            providers: [
                ...asyncProviders,
                browserProvider,
                contextProvider,
                pageProvider,
                instanceNameProvider,
            ],
            exports: [browserProvider, contextProvider, pageProvider],
        };
    }
    async onModuleDestroy() {
        const browser = this.moduleRef.get(puppeteer_util_1.getBrowserToken(this.instanceName));
        if (browser === null || browser === void 0 ? void 0 : browser.isConnected())
            await browser.close();
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        else if (options.useClass) {
            return [
                this.createAsyncOptionsProvider(options),
                {
                    provide: options.useClass,
                    useClass: options.useClass,
                },
            ];
        }
        else {
            return [];
        }
    }
    static createAsyncOptionsProvider(options) {
        var _a;
        if (options.useFactory) {
            return {
                provide: puppeteer_constants_1.PUPPETEER_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: (_a = options.inject) !== null && _a !== void 0 ? _a : [],
            };
        }
        else if (options.useExisting) {
            return {
                provide: puppeteer_constants_1.PUPPETEER_MODULE_OPTIONS,
                async useFactory(optionsFactory) {
                    return optionsFactory.createPuppeteerOptions();
                },
                inject: [options.useExisting],
            };
        }
        else if (options.useClass) {
            return {
                provide: puppeteer_constants_1.PUPPETEER_MODULE_OPTIONS,
                async useFactory(optionsFactory) {
                    return optionsFactory.createPuppeteerOptions();
                },
                inject: [options.useClass],
            };
        }
        else {
            throw new Error('Invalid PuppeteerModule options');
        }
    }
};
PuppeteerCoreModule = PuppeteerCoreModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({}),
    __param(0, common_1.Inject(puppeteer_constants_1.PUPPETEER_INSTANCE_NAME)),
    __metadata("design:paramtypes", [String, core_1.ModuleRef])
], PuppeteerCoreModule);
exports.PuppeteerCoreModule = PuppeteerCoreModule;
//# sourceMappingURL=puppeteer-core.module.js.map
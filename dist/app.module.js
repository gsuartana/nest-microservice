"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const health_module_1 = require("./application/health/health.module");
const search_module_1 = require("./application/search/search.module");
const any_exception_filter_1 = require("./common/filters/any-exception.filter");
const idempotence_interceptor_1 = require("./common/interceptors/idempotence.interceptor");
const timeout_interceptor_1 = require("./common/interceptors/timeout.interceptor");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const config_2 = __importDefault(require("./infrastructure/config"));
const shared_module_1 = require("./infrastructure/shared/shared.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                expandVariables: true,
                envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
                load: [...Object.values(config_2.default)],
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                useFactory: () => ({
                    errorMessage: 'Current operation is too frequent, please try again later!',
                    throttlers: [
                        { ttl: (0, throttler_1.seconds)(10), limit: 7 },
                    ],
                }),
            }),
            shared_module_1.SharedModule,
            health_module_1.HealthModule,
            search_module_1.SearchModule,
        ],
        providers: [
            { provide: core_1.APP_FILTER, useClass: any_exception_filter_1.AllExceptionsFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: common_1.ClassSerializerInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useClass: transform_interceptor_1.TransformInterceptor },
            { provide: core_1.APP_INTERCEPTOR, useFactory: () => new timeout_interceptor_1.TimeoutInterceptor(15 * 1000) },
            { provide: core_1.APP_INTERCEPTOR, useClass: idempotence_interceptor_1.IdempotenceInterceptor },
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_path_1 = __importDefault(require("node:path"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
const app_module_1 = require("./app.module");
const fastify_adapter_1 = require("./common/adapters/fastify.adapter");
const socket_adapter_1 = require("./common/adapters/socket.adapter");
const env_1 = require("./common/global/env");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const logger_service_1 = require("./infrastructure/shared/logger/logger.service");
const setup_swagger_1 = require("./setup-swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, fastify_adapter_1.fastifyApp, {
        bufferLogs: true,
        snapshot: true,
        rawBody: true,
    });
    const configService = app.get((config_1.ConfigService));
    const { port, globalPrefix } = configService.get('app', { infer: true });
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.enableCors({ origin: '*', credentials: true });
    app.setGlobalPrefix(globalPrefix);
    app.useStaticAssets({ root: node_path_1.default.join(__dirname, '..', 'public') });
    !env_1.isDev && app.enableShutdownHooks();
    if (env_1.isDev)
        app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: { enableImplicitConversion: true },
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        stopAtFirstError: true,
        exceptionFactory: errors => new common_1.UnprocessableEntityException(errors.map((e) => {
            const rule = Object.keys(e.constraints)[0];
            const msg = e.constraints[rule];
            return msg;
        })[0]),
    }));
    app.useWebSocketAdapter(new socket_adapter_1.RedisIoAdapter(app));
    (0, setup_swagger_1.setupSwagger)(app, configService);
    await app.listen(port, '0.0.0.0', async () => {
        app.useLogger(app.get(logger_service_1.LoggerService));
        const url = await app.getUrl();
        const { pid } = process;
        const env = node_cluster_1.default.isPrimary;
        const prefix = env ? 'P' : 'W';
        if (!env_1.isMainProcess)
            return;
        const logger = new common_1.Logger('NestApplication');
        logger.log(`[${prefix + pid}] Server running on ${url}`);
        if (env_1.isDev)
            logger.log(`[${prefix + pid}] OpenAPI: ${url}/api-docs`);
    });
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map
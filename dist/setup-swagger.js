"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("./common/decorators");
const response_model_1 = require("./common/model/response.model");
function setupSwagger(app, configService) {
    const { name, port } = configService.get('app');
    const { enable, path } = configService.get('swagger');
    if (!enable)
        return;
    const documentBuilder = new swagger_1.DocumentBuilder()
        .setTitle(name)
        .setDescription(`${name} API document`)
        .setVersion('1.0');
    documentBuilder.addSecurity(decorators_1.API_SECURITY_AUTH, {
        description: 'Enter the Api-Key',
        type: 'apiKey',
        name: decorators_1.API_SECURITY_AUTH,
        in: 'header',
    });
    const document = swagger_1.SwaggerModule.createDocument(app, documentBuilder.build(), {
        ignoreGlobalPrefix: false,
        extraModels: [response_model_1.ResOp, response_model_1.TreeResult],
    });
    swagger_1.SwaggerModule.setup(path, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const logger = new common_1.Logger('SwaggerModule');
    logger.log(`Document running on http://127.0.0.1:${port}/${path}`);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map
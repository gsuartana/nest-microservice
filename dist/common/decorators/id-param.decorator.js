"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdParam = void 0;
const common_1 = require("@nestjs/common");
function IdParam() {
    return (0, common_1.Param)('id', new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE, exceptionFactory: (_error) => {
            throw new common_1.NotAcceptableException('id 格式不正确');
        } }));
}
exports.IdParam = IdParam;
//# sourceMappingURL=id-param.decorator.js.map
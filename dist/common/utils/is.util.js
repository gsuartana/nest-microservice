"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExternal = void 0;
function isExternal(path) {
    const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
}
exports.isExternal = isExternal;
//# sourceMappingURL=is.util.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateObject = exports.formatToDate = exports.formatToDateTime = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = require("lodash");
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
function formatToDateTime(date = undefined, format = DATE_TIME_FORMAT) {
    return (0, dayjs_1.default)(date).format(format);
}
exports.formatToDateTime = formatToDateTime;
function formatToDate(date = undefined, format = DATE_FORMAT) {
    return (0, dayjs_1.default)(date).format(format);
}
exports.formatToDate = formatToDate;
function isDateObject(obj) {
    return (0, lodash_1.isDate)(obj) || dayjs_1.default.isDayjs(obj);
}
exports.isDateObject = isDateObject;
//# sourceMappingURL=date.util.js.map
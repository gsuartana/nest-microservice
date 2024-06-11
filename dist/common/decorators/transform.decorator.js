"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUpperCase = exports.ToLowerCase = exports.ToTrim = exports.ToArray = exports.ToDate = exports.ToBoolean = exports.ToInt = exports.ToNumber = void 0;
const class_transformer_1 = require("class-transformer");
const lodash_1 = require("lodash");
function ToNumber() {
    return (0, class_transformer_1.Transform)((params) => {
        const value = params.value;
        if ((0, lodash_1.isArray)(value))
            return value.map(v => Number(v));
        return Number(value);
    }, { toClassOnly: true });
}
exports.ToNumber = ToNumber;
function ToInt() {
    return (0, class_transformer_1.Transform)((params) => {
        const value = params.value;
        if ((0, lodash_1.isArray)(value))
            return value.map(v => Number.parseInt(v));
        return Number.parseInt(value);
    }, { toClassOnly: true });
}
exports.ToInt = ToInt;
function ToBoolean() {
    return (0, class_transformer_1.Transform)((params) => {
        switch (params.value) {
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                return params.value;
        }
    }, { toClassOnly: true });
}
exports.ToBoolean = ToBoolean;
function ToDate() {
    return (0, class_transformer_1.Transform)((params) => {
        const { value } = params;
        if (!value)
            return;
        return new Date(value);
    }, { toClassOnly: true });
}
exports.ToDate = ToDate;
function ToArray() {
    return (0, class_transformer_1.Transform)((params) => {
        const { value } = params;
        if ((0, lodash_1.isNil)(value))
            return [];
        return (0, lodash_1.castArray)(value);
    }, { toClassOnly: true });
}
exports.ToArray = ToArray;
function ToTrim() {
    return (0, class_transformer_1.Transform)((params) => {
        const value = params.value;
        if ((0, lodash_1.isArray)(value))
            return value.map(v => (0, lodash_1.trim)(v));
        return (0, lodash_1.trim)(value);
    }, { toClassOnly: true });
}
exports.ToTrim = ToTrim;
function ToLowerCase() {
    return (0, class_transformer_1.Transform)((params) => {
        const value = params.value;
        if (!value)
            return;
        if ((0, lodash_1.isArray)(value))
            return value.map(v => v.toLowerCase());
        return value.toLowerCase();
    }, { toClassOnly: true });
}
exports.ToLowerCase = ToLowerCase;
function ToUpperCase() {
    return (0, class_transformer_1.Transform)((params) => {
        const value = params.value;
        if (!value)
            return;
        if ((0, lodash_1.isArray)(value))
            return value.map(v => v.toUpperCase());
        return value.toUpperCase();
    }, { toClassOnly: true });
}
exports.ToUpperCase = ToUpperCase;
//# sourceMappingURL=transform.decorator.js.map
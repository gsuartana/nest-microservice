"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.md5 = exports.aesDecrypt = exports.aesEncrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const key = crypto_js_1.default.enc.Utf8.parse('BaliSwiss!*$');
const iv = crypto_js_1.default.enc.Utf8.parse('0123456789BaliSwiss');
function aesEncrypt(data) {
    if (!data)
        return data;
    const enc = crypto_js_1.default.AES.encrypt(data, key, {
        iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return enc.toString();
}
exports.aesEncrypt = aesEncrypt;
function aesDecrypt(data) {
    if (!data)
        return data;
    const dec = crypto_js_1.default.AES.decrypt(data, key, {
        iv,
        mode: crypto_js_1.default.mode.CBC,
        padding: crypto_js_1.default.pad.Pkcs7,
    });
    return dec.toString(crypto_js_1.default.enc.Utf8);
}
exports.aesDecrypt = aesDecrypt;
function md5(str) {
    return crypto_js_1.default.MD5(str).toString();
}
exports.md5 = md5;
//# sourceMappingURL=crypto.util.js.map
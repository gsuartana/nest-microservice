"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueSlash = exports.hashString = exports.randomValue = exports.generateRandomValue = exports.generateShortUUID = exports.generateUUID = void 0;
const nanoid_1 = require("nanoid");
function generateUUID(size = 21) {
    return (0, nanoid_1.nanoid)(size);
}
exports.generateUUID = generateUUID;
function generateShortUUID() {
    return (0, nanoid_1.nanoid)(10);
}
exports.generateShortUUID = generateShortUUID;
function generateRandomValue(length, placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM') {
    const customNanoid = (0, nanoid_1.customAlphabet)(placeholder, length);
    return customNanoid();
}
exports.generateRandomValue = generateRandomValue;
function randomValue(size = 16, dict = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict') {
    let id = '';
    let i = size;
    const len = dict.length;
    while (i--)
        id += dict[(Math.random() * len) | 0];
    return id;
}
exports.randomValue = randomValue;
const hashString = function (str, seed = 0) {
    let h1 = 0xDEADBEEF ^ seed;
    let h2 = 0x41C6CE57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1
        = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
            ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2
        = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
            ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
exports.hashString = hashString;
const uniqueSlash = (path) => path.replace(/(https?:\/)|(\/)+/g, '$1$2');
exports.uniqueSlash = uniqueSlash;
//# sourceMappingURL=tool.util.js.map
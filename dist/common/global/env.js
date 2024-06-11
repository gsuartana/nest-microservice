"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envBoolean = exports.envNumber = exports.envString = exports.env = exports.cwd = exports.isTest = exports.isDev = exports.isMainProcess = exports.isMainCluster = void 0;
const node_cluster_1 = __importDefault(require("node:cluster"));
exports.isMainCluster = process.env.NODE_APP_INSTANCE && Number.parseInt(process.env.NODE_APP_INSTANCE) === 0;
exports.isMainProcess = node_cluster_1.default.isPrimary || exports.isMainCluster;
exports.isDev = process.env.NODE_ENV === 'development';
exports.isTest = !!process.env.TEST;
exports.cwd = process.cwd();
function fromatValue(key, defaultValue, callback) {
    const value = process.env[key];
    if (typeof value === 'undefined')
        return defaultValue;
    if (!callback)
        return value;
    return callback(value);
}
function env(key, defaultValue = '') {
    return fromatValue(key, defaultValue);
}
exports.env = env;
function envString(key, defaultValue = '') {
    return fromatValue(key, defaultValue);
}
exports.envString = envString;
function envNumber(key, defaultValue = 0) {
    return fromatValue(key, defaultValue, (value) => {
        try {
            return Number(value);
        }
        catch {
            throw new Error(`${key} environment variable is not a number`);
        }
    });
}
exports.envNumber = envNumber;
function envBoolean(key, defaultValue = false) {
    return fromatValue(key, defaultValue, (value) => {
        try {
            return Boolean(JSON.parse(value));
        }
        catch {
            throw new Error(`${key} environment variable is not a boolean`);
        }
    });
}
exports.envBoolean = envBoolean;
//# sourceMappingURL=env.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpAddress = exports.getIp = void 0;
const axios_1 = __importDefault(require("axios"));
function isLAN(ip) {
    ip.toLowerCase();
    if (ip === 'localhost')
        return true;
    let a_ip = 0;
    if (ip === '')
        return false;
    const aNum = ip.split('.');
    if (aNum.length !== 4)
        return false;
    a_ip += Number.parseInt(aNum[0]) << 24;
    a_ip += Number.parseInt(aNum[1]) << 16;
    a_ip += Number.parseInt(aNum[2]) << 8;
    a_ip += Number.parseInt(aNum[3]) << 0;
    a_ip = (a_ip >> 16) & 0xFFFF;
    return (a_ip >> 8 === 0x7F
        || a_ip >> 8 === 0xA
        || a_ip === 0xC0A8
        || (a_ip >= 0xAC10 && a_ip <= 0xAC1F));
}
function getIp(request) {
    const req = request;
    let ip = request.headers['x-forwarded-for']
        || request.headers['X-Forwarded-For']
        || request.headers['X-Real-IP']
        || request.headers['x-real-ip']
        || req?.ip
        || req?.raw?.connection?.remoteAddress
        || req?.raw?.socket?.remoteAddress
        || undefined;
    if (ip && ip.split(',').length > 0)
        ip = ip.split(',')[0];
    return ip;
}
exports.getIp = getIp;
async function getIpAddress(ip) {
    if (isLAN(ip))
        return 'Internal IP';
    try {
        let { data } = await axios_1.default.get(`http://ip-api.com/json/${ip}`, { responseType: 'arraybuffer' });
        data = new TextDecoder('gbk').decode(data);
        data = JSON.parse(data);
        return data.addr.trim().split(' ').at(0);
    }
    catch (error) {
        return 'Third-party interface request failed';
    }
}
exports.getIpAddress = getIpAddress;
//# sourceMappingURL=ip.util.js.map
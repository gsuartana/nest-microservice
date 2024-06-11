import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
export declare const RedisIoAdapterKey = "m-shop-socket";
export declare class RedisIoAdapter extends IoAdapter {
    private readonly app;
    constructor(app: INestApplication);
    createIOServer(port: number, options?: any): any;
}

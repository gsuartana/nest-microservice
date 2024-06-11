import { ConfigType } from '@nestjs/config';
export declare const appRegToken = "app";
export declare const AppConfig: (() => {
    name: string;
    port: number;
    baseUrl: string;
    globalPrefix: string;
    locale: string;
    multiDeviceLogin: boolean;
    logger: {
        level: string;
        maxFiles: number;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    name: string;
    port: number;
    baseUrl: string;
    globalPrefix: string;
    locale: string;
    multiDeviceLogin: boolean;
    logger: {
        level: string;
        maxFiles: number;
    };
}>;
export type IAppConfig = ConfigType<typeof AppConfig>;

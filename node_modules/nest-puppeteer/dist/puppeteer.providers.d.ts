import type { BrowserContext } from 'puppeteer';
export declare function createPuppeteerProviders(instanceName?: string, pages?: string[]): {
    provide: string;
    useFactory: (context: BrowserContext) => Promise<import("puppeteer").Page>;
    inject: string[];
}[];

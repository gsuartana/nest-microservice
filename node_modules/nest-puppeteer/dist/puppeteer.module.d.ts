import { DynamicModule } from '@nestjs/common';
import type { PuppeteerModuleAsyncOptions, PuppeteerModuleOptions } from './interfaces/puppeteer-options.interface';
/**
 * Module for the Puppeteer
 */
export declare class PuppeteerModule {
    /**
     * Inject the Puppeteer synchronously.
     * @param options Options for the Browser to be launched
     * @param instanceName A unique name for the connection.  If not specified, a default name
     * will be used.
     */
    static forRoot(options?: PuppeteerModuleOptions['launchOptions'] & {
        isGlobal?: boolean;
    }, instanceName?: string): DynamicModule;
    /**
     * Inject the Puppeteer asynchronously, allowing any dependencies such as a configuration
     * service to be injected first.
     * @param options Options for asynchronous injection
     */
    static forRootAsync(options: PuppeteerModuleAsyncOptions): DynamicModule;
    /**
     * Inject Pages.
     * @param pages An array of the names of the pages to be injected.
     * @param instanceName A unique name for the connection. If not specified, a default name
     * will be used.
     */
    static forFeature(pages?: string[], instanceName?: string): DynamicModule;
}

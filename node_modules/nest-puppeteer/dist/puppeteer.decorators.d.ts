/**
 * Inject the Browser object associated with a connection
 * @param instanceName The unique name associated with the browser
 */
export declare const InjectBrowser: (instanceName?: string | undefined) => (target: object, key: string | symbol, index?: number | undefined) => void;
/**
 * Inject the Puppeteer BrowserContext object associated with a browser
 * @param instanceName The unique name associated with the browser
 */
export declare const InjectContext: (instanceName?: string | undefined) => (target: object, key: string | symbol, index?: number | undefined) => void;
/**
 * Inject the Puppeteer Page object associated with BrowserContext
 * @param instanceName The unique name associated with the instance
 */
export declare const InjectPage: (instanceName?: string | undefined) => (target: object, key: string | symbol, index?: number | undefined) => void;

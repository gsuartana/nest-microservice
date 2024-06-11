import { IdempotenceOption } from '../interceptors/idempotence.interceptor';
export declare const HTTP_IDEMPOTENCE_KEY = "__idempotence_key__";
export declare const HTTP_IDEMPOTENCE_OPTIONS = "__idempotence_options__";
export declare function Idempotence(options?: IdempotenceOption): MethodDecorator;

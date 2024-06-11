import { HttpHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private http;
    constructor(http: HttpHealthIndicator);
    checkNetwork(): Promise<import("@nestjs/terminus").HealthIndicatorResult>;
}

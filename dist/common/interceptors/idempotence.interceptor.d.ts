import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { FastifyRequest } from 'fastify';
import { CacheService } from '~/infrastructure/shared/redis/cache.service';
export interface IdempotenceOption {
    errorMessage?: string;
    pendingMessage?: string;
    handler?: (req: FastifyRequest) => any;
    expired?: number;
    generateKey?: (req: FastifyRequest) => string;
    disableGenerateKey?: boolean;
}
export declare class IdempotenceInterceptor implements NestInterceptor {
    private readonly reflector;
    private readonly cacheService;
    constructor(reflector: Reflector, cacheService: CacheService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<any>;
    private generateKey;
}

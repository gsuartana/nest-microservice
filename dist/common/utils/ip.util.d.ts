/// <reference types="node" />
import type { IncomingMessage } from 'node:http';
import type { FastifyRequest } from 'fastify';
export declare function getIp(request: FastifyRequest | IncomingMessage): string;
export declare function getIpAddress(ip: string): Promise<any>;

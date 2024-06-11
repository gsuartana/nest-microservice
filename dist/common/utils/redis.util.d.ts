import type { RedisKeys } from '~/common/constants/cache.constant';
type Prefix = 'image-search';
export declare function getRedisKey<T extends string = RedisKeys | '*'>(key: T, ...concatKeys: string[]): `${Prefix}:${T}${string | ''}`;
export {};

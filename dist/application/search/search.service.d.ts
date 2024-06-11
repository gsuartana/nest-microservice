import Redis from 'ioredis';
import { SearchDto } from './search.dto';
export declare class SearchService {
    private redis;
    private readonly logger;
    constructor(redis: Redis);
    searchImageFromBing(search: string): Promise<SearchDto>;
}

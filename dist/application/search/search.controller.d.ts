import { SearchFilterService } from './search.filter.service';
import { SearchReq } from './search.req';
import { SearchRes } from './search.res';
import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    private readonly searchFilterService;
    private readonly logger;
    constructor(searchService: SearchService, searchFilterService: SearchFilterService);
    searchImage(res: any, body: SearchReq): Promise<SearchRes | void>;
}

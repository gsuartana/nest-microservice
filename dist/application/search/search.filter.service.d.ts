export declare class SearchFilterService {
    private readonly logger;
    private readonly filterList;
    constructor();
    validateSearchImage(search: string): Promise<boolean>;
    private checkForFilteredWords;
}

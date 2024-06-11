import { Module } from '@nestjs/common'
import { PuppeteerCrawler } from 'crawlee'

import { SearchController } from './search.controller'
import { SearchFilterService } from './search.filter.service'
import { SearchService } from './search.service'

@Module({
  imports: [],
  controllers: [SearchController],
  providers: [SearchFilterService, SearchService, PuppeteerCrawler],
})
export class SearchModule {}

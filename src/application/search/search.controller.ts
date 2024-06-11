import { Body, Controller, HttpStatus, Logger, Post, Res, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators'

import { ApiKeyGuard } from '../auth/api-key.guard'

import { SearchFilterService } from './search.filter.service'
import { SearchReq } from './search.req'
import { SearchRes } from './search.res'
import { SearchService } from './search.service'

@ApiTags('Search')
@Controller('search')

export class SearchController {
  private readonly logger = new Logger(SearchController.name)
  constructor(private readonly searchService: SearchService, private readonly searchFilterService: SearchFilterService) {}

  @Post('/')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Endpoint that requires API key authentication' })
  @ApiSecurity('api-key')
  @ApiResult({ type: [SearchRes] })
  async searchImage(@Res() res, @Body() body: SearchReq): Promise<SearchRes | void> {
    const validated = await this.searchFilterService.validateSearchImage(body.search)
    if (!validated) {
      const data = await this.searchService.searchImageFromBing(body.search)
      res.status(HttpStatus.OK).send(data)
    }
    this.logger.log(`Searching for ${body.search} is prohibited`)
    res.status(HttpStatus.NOT_FOUND).send({ message: `No result found for ${body.search}, please try to search using other words` })
  }
}

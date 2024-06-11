import { Injectable, Logger } from '@nestjs/common'

import SearchFilter from './search-filter.json'

@Injectable()
export class SearchFilterService {
  private readonly logger = new Logger(SearchFilterService.name)
  private readonly filterList = SearchFilter
  constructor() {}

  async validateSearchImage(search: string): Promise<boolean> {
    return this.checkForFilteredWords(search, this.filterList)
  }

  private checkForFilteredWords(searchValue: string, jsonString: any): boolean {
    try {
      const jsonObject = jsonString.abuse
      for (const key in jsonObject) {
        const value = jsonObject[key]
        if (typeof value === 'string' && value.includes(searchValue.toLocaleLowerCase()))
          return true
      }
      return false
    }
    catch (error) {
      console.error('Invalid JSON format.')
      return false
    }
  }
}

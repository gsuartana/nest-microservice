import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable, Logger } from '@nestjs/common'
import Redis from 'ioredis'
import puppeteer from 'puppeteer'

import { env } from '~/common/global/env'
import { getImageSearchKey } from '~/common/helper/genRedisKey'

import { SearchDto } from './search.dto'

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name)
  constructor(@InjectRedis() private redis: Redis) {}

  async searchImageFromBing(search: string): Promise<SearchDto> {
    const imageResult = await this.redis.get(getImageSearchKey(search))

    if (imageResult) {
      this.logger.log(`Found cached response in redis instance key: ${getImageSearchKey(search)}`)
      return JSON.parse(imageResult)
    }

    const randomletter = [...Array(4)].map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]).join('')
    const randomangka = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    const randomangka3 = Math.floor(Math.random() * (999 - 100 + 1)) + 100

    const SID = `${randomangka3}BDA51D${randomangka}8690CF8CA38D00E${randomangka3}9`

    const isStrict = (typeof process.env.STRICT !== 'undefined' && Number.parseInt(process.env.STRICT) === 1)

    const searchParams = new URLSearchParams({
      q: encodeURIComponent(search),
      ADLT: isStrict ? 'STRICT' : 'OFF',
      qft: '%20filterui%3Aimagesize-large',
      form: randomletter,
      cvid: `FD${randomangka}DE6F35${randomangka3}E944B4432A${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}DC5`,
      sid: SID,
      tsc: isStrict ? 'ImageHoverTitle' : 'ImageHoverTitle',
    })

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const url = `http://www.bing.com/images/search?${searchParams.toString()}`

    await page.goto(url, { waitUntil: 'networkidle2' })

    const matches = await page.$$eval('a[m]', links => links.map(link => link.getAttribute('href')))
    const imgSize = await page.$$eval('div.img_info.hon span.nowrap', spans => spans.map(span => span.textContent.trim()))
    const related = await page.$$eval('a[aria-label]', links => links.map(link => link.getAttribute('href')))

    await browser.close()

    const resultsearch = {
      content: matches,
      imagesize: imgSize,
      related,
    }

    this.logger.log(`New cache key: ${getImageSearchKey(search)} created for request`)
    await this.redis.set(getImageSearchKey(search), JSON.stringify(resultsearch), 'EX', env('REDIS_TTL'))

    return resultsearch
  }
}

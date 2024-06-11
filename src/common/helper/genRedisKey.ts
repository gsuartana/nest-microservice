import { RedisKeys } from '../constants'

/** image search redis key */
export function getImageSearchKey(val: string) {
  return `${RedisKeys.IMAGE_SEARCH_PREFIX}${String(val)}` as const
}

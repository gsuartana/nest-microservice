import { SetMetadata } from '@nestjs/common'

export const BYPASS_KEY = '__bypass_key__'

/**
 * Add this decorator when conversion to the base return format is not required
 */
export function Bypass() {
  return SetMetadata(BYPASS_KEY, true)
}

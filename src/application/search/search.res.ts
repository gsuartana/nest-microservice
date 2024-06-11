import { ApiProperty } from '@nestjs/swagger'

export class SearchRes {
  @ApiProperty({ description: 'matches data' })
  content: string[]

  @ApiProperty({ description: 'image size' })
  imagesize: string[]

  @ApiProperty({ description: 'related data' })
  related: string[]
}

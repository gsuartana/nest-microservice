import { ApiProperty } from '@nestjs/swagger'

export class SearchDto {
  @ApiProperty({ description: 'matches data' })
  content: string[]

  @ApiProperty({ description: 'image size' })
  imagesize: string[]

  @ApiProperty({ description: 'related data' })
  related: string[]
}

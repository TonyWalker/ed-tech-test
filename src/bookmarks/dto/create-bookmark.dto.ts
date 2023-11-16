import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({
    description: 'The Bookmark text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty({
    description: 'The video position anchor for Bookmark (in seconds)',
    example: 62,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly position: number;

  @ApiProperty({
    description: 'ID of the associated video',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  readonly videoId: number;
}

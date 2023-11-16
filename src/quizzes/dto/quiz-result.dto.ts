import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuizResultDto {
  @ApiProperty({
    description: 'Points earned',
    example: 50,
  })
  @IsNotEmpty()
  result: number;
}

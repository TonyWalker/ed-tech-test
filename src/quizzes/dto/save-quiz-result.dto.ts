import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class SaveQuizResultDto {
  @ApiProperty({
    description: 'Scores for passing the quiz',
    example: 62,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly result: number;

  @ApiProperty({
    description: 'ID of the associated quiz',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  readonly quizId: number;
}

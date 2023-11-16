import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class SaveLessonProgressDto {
  @ApiProperty({
    description: 'Percentage of lesson completion in range 0-100',
    example: 50,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  public readonly lessonCompletion: number;
}

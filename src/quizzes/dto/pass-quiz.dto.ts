import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class Option {
  @ApiProperty({
    description: 'ID of chosen option',
    example: 50,
  })
  @IsNotEmpty()
  id: number;
}
class Question {
  @ApiProperty({
    description: 'ID of question',
    example: 5,
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'List of chosen options',
    type: [Option],
  })
  @IsNotEmpty()
  options: Option[];
}
export class PassQuizDto {
  @ApiProperty({
    description: 'List of questions with chosen options',
    type: [Question],
  })
  @IsNotEmpty()
  questions: Question[];
}

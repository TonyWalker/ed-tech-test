import { ApiProperty } from '@nestjs/swagger';

class Bookmark {
  @ApiProperty({
    description: 'Bookmark ID',
    example: 5,
  })
  public readonly id: number;

  @ApiProperty({
    description: 'Bookmark text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  public readonly text: string;

  @ApiProperty({
    description: 'The video position anchor for Bookmark (in seconds)',
    example: 50,
  })
  public readonly position: number;
}

class LessonEstimate {
  @ApiProperty({
    description: 'Lesson ID',
    example: 5,
  })
  public readonly id: number;

  @ApiProperty({
    description: 'Lesson completion percentage',
    example: 75,
  })
  public readonly videosCompletion: number;

  @ApiProperty({
    description: "Lesson's quizzes points",
    example: 500,
  })
  public readonly quizzesPoints: number;

  @ApiProperty({
    description: "Lesson's bookmarks",
    type: [Bookmark],
  })
  public readonly bookmarks: Bookmark[];
}

export class ReportResultDto {
  @ApiProperty({
    description: 'List of lessons',
    type: [LessonEstimate],
  })
  public readonly lessons: LessonEstimate[];
}

import { Injectable } from '@nestjs/common';
import { BookmarksService } from '../../bookmarks/bookmarks.service';
import { LessonsService } from './lessons.service';
import { QuizzesService } from '../../quizzes/quizzes.service';
import { Result } from '../../quizzes/entities';
import { ReportResultDto } from '../dto/report-result.dto';

@Injectable()
export class ReportsService {
  constructor(
    private readonly bookmarksService: BookmarksService,
    private readonly lessonsService: LessonsService,
    private readonly quizzesService: QuizzesService,
  ) {}

  public async getReport(): Promise<ReportResultDto> {
    const lessons = await this.lessonsService.findAll();
    const myReport: ReportResultDto = { lessons: [] };
    for (const lesson of lessons) {
      const bookmarks = await this.bookmarksService.findAllByLessonId(
        lesson.id,
      );

      const quizzes = await this.quizzesService.findAllByLessonId(lesson.id);
      let totalScore = 0;
      for (const quiz of quizzes) {
        const results: Result[] = quiz.results;
        for (const result of results) {
          totalScore += result.result;
        }
      }
      myReport.lessons.push({
        id: lesson.id,
        videosCompletion: 50,
        bookmarks,
        quizzesPoints: totalScore,
      });
    }
    return myReport;
  }
}

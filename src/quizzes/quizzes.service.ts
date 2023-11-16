import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Option, Question, Quiz } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizResultDto, PassQuizDto } from './dto';
import { ResultsService } from './results.service';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly resultsService: ResultsService,
  ) {}

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  async findOne(id: number): Promise<Quiz> {
    try {
      return await this.quizRepository.findOneOrFail({
        where: { id },
        relations: ['questions', 'questions.options'],
      });
    } catch (e) {
      throw new BadRequestException(`Quiz with id ${id} not found`);
    }
  }

  async findAllByLessonId(lessonId: number): Promise<Quiz[]> {
    return this.quizRepository.find({
      where: { lesson: { id: lessonId } },
      relations: ['results'],
    });
  }

  async passQuiz(id: number, passQuizDto: PassQuizDto): Promise<QuizResultDto> {
    const quiz = await this.findOne(id);
    const userQuestionIds = passQuizDto.questions.map((q) => q.id);

    const result = passQuizDto.questions.reduce((total, userQuestion) => {
      const quizQuestion = quiz.questions.find((q) => q.id === userQuestion.id);
      const missingQuestions = quiz.questions.filter(
        (q) => !userQuestionIds.includes(q.id),
      );

      if (missingQuestions.length > 0) {
        throw new BadRequestException('Answers are missing for some questions');
      }

      if (quizQuestion) {
        const questionResult = this.calculateQuestionResult(
          quizQuestion,
          userQuestion.options as Option[],
        );
        return total + questionResult;
      } else {
        throw new Error(
          `Question with id ${userQuestion.id} not found in the quiz.`,
        );
      }
    }, 0);

    await this.resultsService.create({ result, quizId: id });

    return { result };
  }

  private calculateQuestionResult(
    quizQuestion: Question,
    userOptions: Option[],
  ): number {
    return userOptions.reduce((result, userOption) => {
      const quizOption = quizQuestion.options.find(
        (o) => o.id === userOption.id,
      );
      return result + (quizOption ? quizOption.weight : 0);
    }, 0);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Quiz } from './entities';
import { QuizzesService } from './quizzes.service';
import { PassQuizDto, QuizResultDto } from './dto';

@ApiTags('Quiz')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizService: QuizzesService) {}
  @Get('/')
  @ApiOkResponse({ description: 'List of quizzes', type: [Quiz] })
  async findAll(): Promise<Quiz[]> {
    return await this.quizService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get quiz by ID', type: Quiz })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.findOne(id);
  }

  @ApiOkResponse({
    description: 'The quiz has been successfully passed',
    type: QuizResultDto,
  })
  @Post('/:id/pass')
  @UsePipes(ValidationPipe)
  async passQuiz(
    @Param('id', ParseIntPipe) id: number,
    @Body() passQuizDto: PassQuizDto,
  ): Promise<QuizResultDto> {
    return await this.quizService.passQuiz(id, passQuizDto);
  }
}

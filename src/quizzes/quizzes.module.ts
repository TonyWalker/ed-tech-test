import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz, Question, Option, Result } from './entities';
import { ResultsService } from './results.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Option, Result])],
  controllers: [QuizzesController],
  providers: [QuizzesService, ResultsService],
  exports: [QuizzesService],
})
export class QuizzesModule {}

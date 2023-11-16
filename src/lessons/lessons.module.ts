import { Module } from '@nestjs/common';
import { LessonsController } from './controllers/lessons.controller';
import { LessonsService } from './services/lessons.service';
import { StreamsModule } from '../shared/streams/streams.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson, Topic } from './entities';
import { TopicsController } from './controllers/topics.controller';
import { TopicsService } from './services/topics.service';
import { ReportsController } from './controllers/reports.controller';
import { ReportsService } from './services/reports.service';
import { BookmarksModule } from '../bookmarks/bookmarks.module';
import { QuizzesModule } from '../quizzes/quizzes.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register(),
    StreamsModule,
    BookmarksModule,
    QuizzesModule,
    TypeOrmModule.forFeature([Lesson, Topic]),
  ],
  controllers: [LessonsController, TopicsController, ReportsController],
  providers: [LessonsService, TopicsService, ReportsService],
})
export class LessonsModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { AppConfigModule } from './shared/config/config.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { StreamsModule } from './shared/streams/streams.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [
    StreamsModule,
    DatabaseModule,
    AppConfigModule,
    BookmarksModule,
    QuizzesModule,
    LessonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

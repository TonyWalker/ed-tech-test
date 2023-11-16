import {
  Body,
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  Param,
  Patch,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { StreamsService } from '../../shared/streams/streams.service';
import { Readable } from 'stream';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../entities';
import { SaveLessonProgressDto } from '../dto';

@ApiTags('Lesson')
@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly streamsService: StreamsService,
    private readonly videosService: LessonsService,
  ) {}

  @Get('/')
  @ApiOkResponse({ description: 'List of lessons', type: [Lesson] })
  async findAll(): Promise<any[]> {
    return await this.videosService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get related data for lesson by ID',
    type: Lesson,
  })
  async findOne(@Param('id') id: number): Promise<Lesson> {
    return await this.videosService.findOne(id);
  }

  @Get('/:id/stream')
  @Header('Content-Type', 'video/mp4')
  @ApiOkResponse({ description: 'Get video lesson stream by ID' })
  async streamVideo(@Param('id') id: string, @Res() res: Response) {
    try {
      const videoStream: Readable =
        await this.streamsService.getVideoStream(id);

      videoStream.pipe(res);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch('/:id/progress')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ description: 'Save progress for lesson by ID' })
  async saveProgress(
    @Param('id') id: number,
    @Body() saveLessonProgressDto: SaveLessonProgressDto,
  ): Promise<void> {
    return await this.videosService.saveProgress(
      id,
      saveLessonProgressDto.lessonCompletion,
    );
  }
}

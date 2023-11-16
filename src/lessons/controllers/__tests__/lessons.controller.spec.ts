import { Test, TestingModule } from '@nestjs/testing';
import { LessonsController } from '../lessons.controller';
import { INestApplication } from '@nestjs/common';
import { LessonsService } from '../../services/lessons.service';
import { Lesson } from '../../entities';
import { Readable } from 'stream';
import { StreamsService } from '../../../shared/streams/streams.service';
import * as request from 'supertest';

describe('VideosController', () => {
  let app: INestApplication;

  const mockLsson = {} as unknown as Lesson;
  const mockLessonsService: Partial<LessonsService> = {
    findAll: () => Promise.resolve([mockLsson, mockLsson]),
    findOne: () => Promise.resolve(mockLsson),
    saveProgress: () => Promise.resolve(),
  };
  const mockStreamsService: StreamsService = {
    getVideoStream: () => Promise.resolve({} as unknown as Readable),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [
        {
          provide: LessonsService,
          useValue: mockLessonsService,
        },
        {
          provide: StreamsService,
          useValue: mockStreamsService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('LessonsController can be instantiated', () => {
    expect(app).toBeDefined();
  });

  it('should return a lesson by id when called with a valid id', async () => {
    const response = await request(app.getHttpServer()).get('/lessons/1');
    expect(response.body).toStrictEqual(mockLsson);
  });

  it('should update lesson progress and return status 200', async () => {
    const response = await request(app.getHttpServer())
      .patch('/lessons/1/progress')
      .send({
        lessonCompletion: 50,
      });
    expect(response.status).toBe(200);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BookmarksController } from '../bookmarks.controller';
import { Bookmark } from '../entities';
import { BookmarksService } from '../bookmarks.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('BookmarksController', () => {
  let app: INestApplication;

  const mockBookmark = {} as unknown as Bookmark;
  const payload = {
    text: 'Lorem ipsum',
    position: 205,
    videoId: 1,
  };

  const mockBookmarksService: Partial<BookmarksService> = {
    findAll: () => Promise.resolve([mockBookmark, mockBookmark]),
    findOne: () => Promise.resolve(mockBookmark),
    findAllByLessonId: () => Promise.resolve([mockBookmark]),
    create: () => Promise.resolve(new Bookmark()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BookmarksService,
          useValue: mockBookmarksService,
        },
      ],
      controllers: [BookmarksController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('BookmarksController', () => {
    it('BookmarksController can be instantiated', () => {
      expect(app).toBeDefined();
    });

    it('should return a 201 status code when POST /bookmarks is called with valid fields', async () => {
      const response = await request(app.getHttpServer())
        .post('/bookmarks')
        .send(payload);
      expect(response.status).toBe(201);
    });

    it('should return error where empty body', async () =>
      request(app.getHttpServer()).post('/bookmarks/').send({}).expect(400));

    it('should return an array of Bookmark entities when GET /bookmarks is called', async () => {
      const response = await request(app.getHttpServer()).get('/bookmarks');
      expect(response.body).toStrictEqual([mockBookmark, mockBookmark]);
    });

    it('should return a single Bookmark entity when GET /bookmarks/:id is called', async () => {
      const response = await request(app.getHttpServer()).get('/bookmarks/1');
      expect(response.body).toStrictEqual(mockBookmark);
    });
  });
});

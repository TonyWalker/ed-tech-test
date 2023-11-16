import { Test, TestingModule } from '@nestjs/testing';
import { BookmarksService } from '../bookmarks.service';
import { Repository } from 'typeorm';
import { Bookmark } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('BookmarksService', () => {
  let service: BookmarksService;
  const mockBookmark = {} as unknown as Bookmark;
  const mockBookmarkRepository: Repository<Bookmark> = {
    find: () => Promise.resolve([mockBookmark, mockBookmark]),
    findOne: () => Promise.resolve(mockBookmark),
    findOneByOrFail: () => Promise.resolve(mockBookmark),
    create: () => Promise.resolve(mockBookmark),
    save: () => Promise.resolve(mockBookmark),
  } as unknown as Repository<Bookmark>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarksService,
        {
          provide: getRepositoryToken(Bookmark),
          useFactory: () => mockBookmarkRepository,
        },
      ],
    }).compile();

    service = module.get<BookmarksService>(BookmarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of Bookmark entities when findAll is called', async () => {
    const result = await service.findAll();
    expect(result).toStrictEqual([mockBookmark, mockBookmark]);
  });

  it('should return a single Bookmark entity when findOne is called', async () => {
    const result = await service.findOne(1);
    expect(result).toStrictEqual(mockBookmark);
  });

  it('should return a NotFoundException when GET /bookmarks/:id is called with non-existent id', async () => {
    jest
      .spyOn(mockBookmarkRepository, 'findOneByOrFail')
      .mockImplementation(() => {
        throw new NotFoundException();
      });
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should return an empty array when findAllByLessonId is called with no bookmarks for the given lesson id', async () => {
    jest
      .spyOn(mockBookmarkRepository, 'find')
      .mockImplementation(() => Promise.resolve([]));
    const result = await service.findAllByLessonId(1);
    expect(result).toStrictEqual([]);
  });
});

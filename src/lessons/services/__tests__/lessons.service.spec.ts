import { Test, TestingModule } from '@nestjs/testing';
import { LessonsService } from '../lessons.service';
import { Repository } from 'typeorm';
import { Lesson } from '../../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('VideosService', () => {
  let service: LessonsService;

  const mockLesson = {} as unknown as Lesson;
  const mockLessonRepository: Repository<Lesson> = {
    find: () => Promise.resolve([mockLesson, mockLesson]),
    findOneOrFail: () => Promise.resolve(mockLesson),
    save: () => Promise.resolve(mockLesson),
  } as unknown as Repository<Lesson>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        {
          provide: getRepositoryToken(Lesson),
          useFactory: () => mockLessonRepository,
        },
      ],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of Lessons entities when findAll is called', async () => {
    const result = await service.findAll();
    expect(result).toStrictEqual([mockLesson, mockLesson]);
  });

  it('should return a single of Lesson entities when find is called', async () => {
    const result = await service.findOne(1);
    expect(result).toStrictEqual(mockLesson);
  });

  it('should update the progress of lesson completion', async () => {
    await expect(service.saveProgress(1, 12)).resolves.not.toThrow();
  });

  it('should return a NotFoundException when GET /lessons/:id is called with non-existent id', async () => {
    jest.spyOn(mockLessonRepository, 'findOneOrFail').mockImplementation(() => {
      throw new NotFoundException();
    });
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException when updating a non-existent lesson', async () => {
    jest.spyOn(mockLessonRepository, 'findOneOrFail').mockImplementation(() => {
      throw new NotFoundException();
    });
    await expect(service.saveProgress(1, 12)).rejects.toThrow(
      NotFoundException,
    );
  });
});

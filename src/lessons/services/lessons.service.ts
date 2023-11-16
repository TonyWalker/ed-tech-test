import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async findOne(id: number): Promise<Lesson> {
    try {
      return await this.lessonRepository.findOneOrFail({
        where: { id },
        relations: ['quizzes', 'bookmarks'],
      });
    } catch (e) {
      throw new NotFoundException(`Lesson with id ${id} not found`);
    }
  }

  async saveProgress(
    lessonId: number,
    lessonCompletion: number,
  ): Promise<void> {
    try {
      const lesson = await this.findOne(lessonId);
      lesson.completion = lessonCompletion;
      await this.lessonRepository.save(lesson);
    } catch (e) {
      throw new NotFoundException(`Lesson with id ${lessonId} not found`);
    }
  }
}

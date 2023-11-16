import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  async findAll(): Promise<Bookmark[]> {
    return this.bookmarkRepository.find();
  }

  async findOne(id: number): Promise<Bookmark> {
    try {
      return await this.bookmarkRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException(`Bookmark with id ${id} not found`);
    }
  }

  async findAllByLessonId(lessonId: number): Promise<Bookmark[]> {
    return this.bookmarkRepository.find({
      where: { lesson: { id: lessonId } },
    });
  }

  async create(bookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    const { text, position, videoId } = bookmarkDto;
    const bookmark = this.bookmarkRepository.create({
      text,
      position,
      lesson: { id: videoId },
    });

    return this.bookmarkRepository.save(bookmark);
  }
}

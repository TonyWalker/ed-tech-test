import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities';
import { SaveQuizResultDto } from './dto';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}

  async findAllQuizId(quizId: number): Promise<Result[]> {
    return this.resultRepository.find({
      where: { quiz: { id: quizId } },
    });
  }

  async create(resultDto: SaveQuizResultDto): Promise<void> {
    const { result, quizId } = resultDto;
    const resultObj = this.resultRepository.create({
      result,
      quiz: { id: quizId },
    });
    await this.resultRepository.save(resultObj);
  }
}

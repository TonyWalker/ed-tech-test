import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async findAll(): Promise<any[]> {
    const topics = await this.topicRepository.find({
      relations: ['children', 'parent'],
    });
    return this.buildTree(topics);
  }

  async findOne(id: number): Promise<Topic> {
    try {
      return await this.topicRepository.findOneOrFail({
        where: { id },
        relations: ['children'],
      });
    } catch (e) {
      throw new Error(`Topic with id ${id} not found`);
    }
  }

  private buildTree(topics: Topic[], parentId: number = null): any {
    const tree = [];
    for (const topic of topics) {
      if (
        (parentId === null && !topic.parent) ||
        (topic.parent && topic.parent.id === parentId)
      ) {
        const children = this.buildTree(topics, topic.id);
        if (children && children.length > 0) {
          topic.children = children;
        }
        tree.push(topic);
      }
    }
    return tree;
  }
}

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Topic } from '../entities';
import { TopicsService } from '../services/topics.service';

@ApiTags('Topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get('/')
  @ApiOkResponse({ description: 'List of topics', type: [Topic] })
  async findAll(): Promise<any[]> {
    return this.topicsService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get topic by ID', type: Topic })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Topic> {
    return this.topicsService.findOne(id);
  }
}

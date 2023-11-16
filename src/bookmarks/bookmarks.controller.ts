import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './entities';
import { CreateBookmarkDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Bookmark')
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get('/')
  @ApiOkResponse({ description: 'List of Bookmarks', type: [Bookmark] })
  async findAll(): Promise<Bookmark[]> {
    return this.bookmarksService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get bookmark by ID', type: Bookmark })
  async findOne(@Param('id') id: number): Promise<Bookmark> {
    return this.bookmarksService.findOne(id);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'The bookmark has been successfully created',
    type: Bookmark,
  })
  async create(@Body() bookmark: CreateBookmarkDto): Promise<Bookmark> {
    return this.bookmarksService.create(bookmark);
  }
}

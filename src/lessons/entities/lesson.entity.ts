import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from '../../quizzes/entities';
import { Topic } from './topic.entity';
import { Bookmark } from '../../bookmarks/entities';

@Entity('lessons')
export class Lesson {
  @ApiProperty({ description: 'Primary key', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of the lesson',
    example: 'Lorem ipsum',
  })
  @Column({
    type: 'varchar',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the lesson',
    example: 'Lorem ipsum',
  })
  @Column({
    type: 'text',
  })
  description: string;
  @ApiProperty({
    description: 'Approximate length of video lesson',
    example: '12 mins',
  })
  @Column({
    type: 'text',
  })
  length: string;

  @ApiProperty({
    description: 'Amount of lesson composition in percentages',
    example: 33,
  })
  @Column({ default: 0, type: 'int2' })
  completion: number;

  @ApiProperty({
    description: 'Lessons of the Topic',
    type: () => Topic,
  })
  @ManyToOne(() => Topic, (topic) => topic.lesson)
  topic: Topic;

  @ApiProperty({
    description: 'List of quizzes',
    type: () => [Quiz],
  })
  @OneToMany(() => Quiz, (quiz) => quiz.lesson)
  quizzes: Quiz[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.lesson)
  @ApiProperty({
    description: 'List of Bookmarks',
    type: () => [Bookmark],
  })
  bookmarks: Bookmark[];
}

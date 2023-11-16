import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from './lesson.entity';

@Entity('topics')
export class Topic {
  @ApiProperty({ description: 'Primary key', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of the topic',
    example: 'Lorem ipsum',
  })
  @Column({
    type: 'varchar',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the topic',
    example: 'Lorem ipsum',
  })
  @Column({
    type: 'text',
  })
  description: string;

  @ManyToOne(() => Topic, (topic) => topic.children, { nullable: true })
  parent: Topic;

  @OneToMany(() => Topic, (topic) => topic.parent)
  children: Topic[];

  @ApiProperty({
    description: 'List of video lessons',
    type: () => [Lesson],
  })
  @OneToMany(() => Lesson, (video) => video.topic)
  lesson: Lesson[];
}

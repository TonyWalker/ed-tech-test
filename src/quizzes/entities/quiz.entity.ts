import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Lesson } from '../../lessons/entities';
import { Result } from './results.entity';

@Entity('quizzes')
export class Quiz {
  @ApiProperty({ description: 'Primary key', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of the quiz',
    example: 'Some quiz',
  })
  @Column({
    type: 'varchar',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the quiz',
    example: 'Lorem ipsum',
  })
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty({
    description: 'Lesson of the quiz',
    type: () => Lesson,
  })
  @ManyToOne(() => Lesson, (lesson) => lesson.quizzes)
  lesson: Lesson;

  @ApiProperty({
    description: 'List of questions',
  })
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];

  @ApiProperty({
    description: 'List of results',
  })
  @OneToMany(() => Result, (result) => result.quiz)
  results: Result[];
}

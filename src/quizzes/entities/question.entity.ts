import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from './option.entity';
import { Quiz } from './quiz.entity';

@Entity('questions')
export class Question {
  @ApiProperty({
    description: 'The primary key',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The question text',
    example: 'What is the question?',
  })
  @Column({
    type: 'varchar',
  })
  question: string;

  @ApiProperty({
    description: 'Multiple choice or not',
    example: true,
  })
  @Column({
    type: 'boolean',
    default: 0,
  })
  isMultiple: boolean;

  @ApiProperty({
    description: 'Quiz of the question',
  })
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @ApiProperty({
    description: 'Options of the question',
  })
  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}

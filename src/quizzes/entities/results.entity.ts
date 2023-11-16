import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity('results')
export class Result {
  @ApiProperty({ description: 'Primary key', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Scores for passing the quiz',
    example: 20,
  })
  @Column({
    type: 'int2',
  })
  result: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.results)
  quiz: Quiz;
}

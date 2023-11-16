import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity('options')
export class Option {
  @ApiProperty({ description: 'Primary key', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The actual option', example: 'Lorem' })
  @Column({
    type: 'varchar',
  })
  text: string;

  @ApiProperty({
    description: 'Scores for choosing this option',
    example: 20,
  })
  @Column({
    type: 'int2',
  })
  weight: number;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}

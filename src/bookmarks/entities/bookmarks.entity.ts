import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from '../../lessons/entities';

@Entity('bookmarks')
export class Bookmark {
  @ApiProperty({
    description: 'The primary key',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The Bookmark text',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  })
  @Column({
    type: 'text',
  })
  @Column()
  text: string;

  @ApiProperty({
    description: 'The video position anchor for Bookmark (in seconds)',
    example: 62,
  })
  @Column({
    type: 'int',
  })
  position: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.bookmarks)
  @ApiProperty({
    description: 'Lesson of the Bookmark',
    type: () => Lesson,
  })
  lesson: Lesson;
}

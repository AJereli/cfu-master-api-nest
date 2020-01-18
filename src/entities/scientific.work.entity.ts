import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { SourceEntity } from './sources.entity';
import { UserEntity } from './user.entity';
import { KeyWordEntity } from './key.word.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()

export class ScientificWorkEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserEntity, user => user.scientificWorks)
  user: UserEntity;

  @ApiProperty()
  @ManyToMany(type => SourceEntity, sources => sources.scientificWork,
    {cascade: ['insert', 'update']})
  @JoinTable()
  sources: SourceEntity[];

  @ApiProperty()
  @ManyToMany(type => KeyWordEntity, keyWord => keyWord.scientificWorks,
    {cascade: ['insert', 'update']})
  @JoinTable({name: 'key_word'})
  keyWords: KeyWordEntity[];

  @ApiProperty()
  @Column({ nullable: false })
  introduction: string;

  @ApiProperty()
  @Column({ nullable: false })
  actuals: string;

  @ApiProperty()
  @Column({ nullable: false })
  aimsAndTasks: string;

  @ApiProperty()
  @Column({ nullable: false })
  overview: string;

  @ApiProperty()
  @Column({ nullable: false })
  mainPart: string;

  @ApiProperty()
  @Column({ nullable: false })
  programImplementation: string;

  @ApiProperty()
  @Column({ nullable: false })
  conclusions: string;
}

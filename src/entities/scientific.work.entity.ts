import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { SourceEntity } from './sources.entity';
import { UserEntity } from './user.entity';
import { KeyWordEntity } from './key.word.entity';

@Entity()

export class ScientificWorkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserEntity, user => user.scientificWorks)
  user: UserEntity;

  @ManyToMany(type => SourceEntity, sources => sources.scientificWork,
    {cascade: ['insert', 'update']})
  @JoinTable()
  sources: SourceEntity[];

  @ManyToMany(type => KeyWordEntity, keyWord => keyWord.scientificWorks,
    {cascade: ['insert', 'update']})
  @JoinTable({name: 'key_word'})
  keyWords: KeyWordEntity[];

  @Column({ nullable: false })
  introduction: string;

  @Column({ nullable: false })
  actuals: string;

  @Column({ nullable: false })
  aimsAndTasks: string;

  @Column({ nullable: false })
  overview: string;

  @Column({ nullable: false })
  mainPart: string;

  @Column({ nullable: false })
  programImplementation: string;

  @Column({ nullable: false })
  conclusions: string;
}

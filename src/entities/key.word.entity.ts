
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ScientificWorkEntity } from './scientific.work.entity';

@Entity()
export class KeyWordEntity {
  @Column({primary: true})
  title: string;

  @ManyToMany(type => ScientificWorkEntity, work => work.keyWords)
  scientificWorks: ScientificWorkEntity[];
}

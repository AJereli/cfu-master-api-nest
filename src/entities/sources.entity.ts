import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ScientificWorkEntity } from './scientific.work.entity';

@Entity()

export class SourceEntity {
  @Column({ primary: true })
  link: string;

  @ManyToMany(type => ScientificWorkEntity, scientificWork => scientificWork.sources)
  scientificWork: ScientificWorkEntity[];
}

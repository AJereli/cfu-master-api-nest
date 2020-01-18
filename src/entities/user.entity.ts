import * as bcrypt from 'bcrypt';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from 'typeorm';

import { ScientificWorkEntity } from './scientific.work.entity';
import { UserDto } from '../user/dto/user.dto';

@Entity()
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 256, nullable: false })
  firstname: string;
  @Column('varchar', { length: 256, nullable: false })
  lastname: string;
  @Column('varchar', { length: 256, nullable: false })
  password: string;
  @Column('varchar', { length: 256, nullable: false })
  email: string;
  @Column('varchar', {length: 512, nullable: false })
  specialty: string;
  @Column('varchar', {length: 512, nullable: false })
  department: string;
  @Column({ nullable: false })
  graduationTheme: string;

  @Column({nullable: true})
  scientificDirector: string;

  @OneToMany(type => ScientificWorkEntity, scientificWorks => scientificWorks.user)
  scientificWorks: ScientificWorkEntity[];

  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @BeforeInsert()
  async hashPass() {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      this.email = this.email.trim().toLowerCase();
    } catch (error) {
      return error;
    }
  }
  @BeforeUpdate()
  updateDates() {
    this.updateDate = new Date();
  }

  public toDto(): UserDto {
    const profile = new UserDto();

    profile.department = this.department;
    profile.email = this.email;
    profile.firstname = this.firstname;
    profile.lastname = this.lastname;
    profile.graduationTheme = this.graduationTheme;
    profile.specialty = this.specialty;
    profile.createDate = this.createDate;
    profile.scientificDirector = this.scientificDirector;
    profile.scientificWorks = this.scientificWorks;

    return profile;
  }

}

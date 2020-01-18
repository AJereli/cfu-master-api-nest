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

  // public toDto() {
  //   const profile = new ProfileDto();
  //
  //   profile.department = this.department;
  //   profile.email = this.email;
  //   profile.firstname = this.firstname;
  //   profile.lastname = this.lastname;
  //   // profile.graduationTheme = this.graduationtheme;
  //   profile.specialty = this.specialty;
  //
  //   return profile;
  // }

}

import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { LoginPayload } from '../auth/dto/login.payload';
import { RegistrationDto } from '../auth/dto/registration.dto';
import { FindUserDto } from './dto/find.user.dto';
import { StatisticDto } from './dto/statistic.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async registration(registrationDto: RegistrationDto) {
    const existingUser = await this.userRepository.findOne({email: registrationDto.email});

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = new UserEntity();
    user.email = registrationDto.email;
    user.department = registrationDto.department;
    user.firstname = registrationDto.firstName;
    user.lastname = registrationDto.lastName;
    user.scientificDirector = registrationDto.scientificDirector;
    user.graduationTheme = registrationDto.graduationTheme;
    user.password = registrationDto.password;
    user.specialty = registrationDto.specialty;

    return this.userRepository.save(user);

  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({email});
  }

  async find(findDto: FindUserDto): Promise<UserEntity[]> {
    return this.userRepository.createQueryBuilder('user')
      .where('user.firstname like :name', {name: '%' + findDto.firstName + '%' })
      .orWhere('user.lastname like :lastName', {lastName: '%' + findDto.lastName + '%'})
      .orWhere('user.specialty like :specialty', {specialty: '%' + findDto.specialty + '%' })
      .getMany();
  }

  async getStatistic() {
    return await this.userRepository.query('SELECT CONCAT(lastname,\' \', firstname) as full_name, COUNT(swe.id) as total_work_number,\n' +
      '       (SELECT DISTINCT COUNT(sws."sourceEntityLink") from scientific_work_entity_sources_source_entity sws\n' +
      '           LEFT JOIN scientific_work_entity as swe2 ON sws."scientificWorkEntityId" = swe2.id\n' +
      '           WHERE swe2."userId" = u.id)\n' +
      '           as total_used_source\n' +
      'FROM user_entity AS u\n' +
      '    LEFT JOIN scientific_work_entity swe ON u.id = swe."userId"\n' +
      '    GROUP BY u.id;');
  }

}

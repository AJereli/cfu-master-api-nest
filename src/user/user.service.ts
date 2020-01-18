import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { LoginPayload } from '../auth/dto/login.payload';
import { RegistrationDto } from '../auth/dto/registration.dto';
import { FindUserDto } from './dto/find.user.dto';

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

}

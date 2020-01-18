import { Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ScientificWorkEntity } from '../../entities/scientific.work.entity';
import { IsArray, IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsString()
  firstname: string;
  @IsString()
  @ApiProperty()
  lastname: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  specialty: string;
  @IsString()
  @ApiProperty()
  department: string;
  @IsString()
  @ApiProperty()
  graduationTheme: string;
  @IsString()
  @ApiProperty()
  scientificDirector: string;
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: ScientificWorkEntity,
  })
  @IsOptional()
  scientificWorks: ScientificWorkEntity[];
  @IsDate()
  @ApiProperty()
  @IsOptional()
  createDate: Date;

}

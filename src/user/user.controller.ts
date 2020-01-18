
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { FindUserDto } from './dto/find.user.dto';
import { UserDto } from './dto/user.dto';
import { StatisticDto } from './dto/statistic.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ScientificWorkEntity } from '../entities/scientific.work.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('find')
  @ApiResponse({ status: 200, description: 'OK', type: UserDto, isArray: true})
  async find(@Body() findDto: FindUserDto): Promise<UserDto[]> {
    return await this.userService.find(findDto);
  }

  @Get('statistic')
  @ApiResponse({ status: 200, description: 'OK', type: StatisticDto, isArray: true})
  async getStatistic(): Promise<StatisticDto[]> {
    return this.userService.getStatistic();
  }
}

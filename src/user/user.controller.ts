
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { FindUserDto } from './dto/find.user.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('find')
  async find(@Body() findDto: FindUserDto) {

    return await this.userService.find(findDto);
  }

  @Get('statistic')
  async getStatistic() {
    return this.userService.getStatistic();
  }
}



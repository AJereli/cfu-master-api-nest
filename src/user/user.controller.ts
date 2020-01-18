
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { FindUserDto } from './dto/find.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('find')
  @UseGuards(AuthGuard('jwt'))
  async find(@Body() findDto: FindUserDto) {

    return await this.userService.find(findDto);
  }
}

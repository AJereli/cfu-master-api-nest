import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Query, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginPayload } from './dto/login.payload';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access.token.dto';
import { UserService } from '../user/user.service';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly userService: UserService,
              private readonly authService: AuthService) { }

  @Post('/registration')
  // @ApiResponse({ status: 200, description: 'OK', type: RegistrationResponse})
  async registration(
    @Body() registrationDto: RegistrationDto,
  ) {
    return await this.userService.registration(registrationDto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'OK', type: AccessTokenDto})
  async login(@Body() payload: LoginPayload) {
    return await this.authService.login(payload);

  }
}

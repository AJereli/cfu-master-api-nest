import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginPayload } from './dto/login.payload';
import { AccessTokenDto } from './dto/access.token.dto';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from '../config/app.config';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly appConfig: AppConfig,
    private readonly userService: UserService,
    private readonly jwtService: JwtService) { }

  createToken(user: UserEntity): AccessTokenDto {
    const payload = { sub: user.id};
    const accessToken = this.jwtService.sign(payload);
    const now = Date.now();
    const tokenExparationTime = 50000;
    const expData = new Date(now + (1000 * tokenExparationTime));
    const tokenDto = new AccessTokenDto();
    tokenDto.accessToken = accessToken;
    tokenDto.expiresIn = expData.getTime().toString();
    return tokenDto;
  }

  public async validatePassword(payloadPass: string, storedPass: string): Promise<boolean> {
    const isValidPassword = await bcrypt.compare(payloadPass, storedPass);
    return isValidPassword;
  }

  public async login(payload: LoginPayload): Promise<AccessTokenDto> {
    const user = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      throw new Error('Wrong credentials');
    }
    const isValid = await this.validatePassword(payload.password, user.password);
    if (!isValid) {
      throw new Error('Wrong credentials');
    }

    return this.createToken(user);
  }

}

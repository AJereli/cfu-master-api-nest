import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginPayload } from './dto/login.payload';
import { AppConfig } from '../config/app.config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly appConfig: AppConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig.tokenSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}

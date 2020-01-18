import { Module } from '@nestjs/common';


import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfig } from '../config/app.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, PassportModule,  JwtModule.register({
    secret: process.env.TOKEN_SECRET || 'uAsBzfvxqD',
    signOptions: { expiresIn: (process.env.JWT_EXPIRATION_TIME_S || '212600') + 's' },
  })],
  controllers: [AuthController],
  providers: [
    // UserService,
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

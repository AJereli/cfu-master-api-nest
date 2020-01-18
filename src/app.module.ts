import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './config/app.config';
import { EnvModule } from 'nestjs-env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { ScientificWorkEntity } from './entities/scientific.work.entity';
import { SourceEntity } from './entities/sources.entity';
import { KeyWordEntity } from './entities/key.word.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ScientificWorkModule } from './scientific.work/scientific.work.module';

@Module({
  imports: [ EnvModule.register([AppConfig]),
    TypeOrmModule.forRootAsync({
      inject: [AppConfig],
      useFactory: (config: AppConfig) => ({
        type: 'postgres',
        host: config.dbHost,
        port: config.dbPort,
        logging: true,
        username: config.dbUser,
        password: config.dbPass,
        database: config.dbName,
        entities: [
          UserEntity, ScientificWorkEntity, SourceEntity,
          KeyWordEntity,
        ],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    ScientificWorkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

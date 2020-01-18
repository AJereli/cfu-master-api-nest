import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { ScientificWorkService } from './scientific.work.service';
import { ScientificWorkController } from './scientific.work.controller';
import { ScientificWorkEntity } from '../entities/scientific.work.entity';
import { KeyWordEntity } from '../entities/key.word.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ScientificWorkEntity, KeyWordEntity])],
  providers: [ScientificWorkService],
  controllers: [ScientificWorkController],
})
export class ScientificWorkModule {
}

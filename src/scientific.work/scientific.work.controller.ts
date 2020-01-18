import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ScientificWorkService } from './scientific.work.service';
import { WorkDto } from './dto/work.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { AccessTokenDto } from '../auth/dto/access.token.dto';
import { ScientificWorkEntity } from '../entities/scientific.work.entity';

@Controller('works')
@UseGuards(AuthGuard('jwt'))
export class ScientificWorkController {
  constructor(private readonly workService: ScientificWorkService) {

  }

  @Get('findByKeyword')
  @ApiResponse({ status: 200, description: 'OK', type: ScientificWorkEntity, isArray: true})
  async findByKeyWord(@Request() req, @Query('keyword') keyword: string) {
    return this.workService.findByKeyWord(keyword);
  }


  @Get('findBySource')
  @ApiResponse({ status: 200, description: 'OK', type: ScientificWorkEntity, isArray: true})
  async findBySource(@Request() req, @Query('source') source: string) {
    return this.workService.findBySource(source);
  }

  // @Get('find')
  // @ApiResponse({ status: 200, description: 'OK', type: ScientificWorkEntity, isArray: true})
  // async findBySource(@Request() req, @Query('source') keyword: string) {
  //   return 'source';
  // }

  @Post()
  async create(@Request() req, @Body() work: WorkDto) {
    return await this.workService.create(work, req.user.userId);
  }

  @Post(':id')
  async update(@Request() req, @Body() work: WorkDto, @Param('id') id: number) {
    return await this.workService.update(work, req.user.userId, id);
  }

}

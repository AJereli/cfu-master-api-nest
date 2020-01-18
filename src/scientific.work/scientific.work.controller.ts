import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ScientificWorkService } from './scientific.work.service';
import { WorkDto } from './dto/work.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('works')
@UseGuards(AuthGuard('jwt'))
export class ScientificWorkController {
  constructor(private readonly workService: ScientificWorkService) {

  }

  @Get('find')
  async findByKeyWord(@Request() req, @Query('keyword') keyword: string) {
    return this.workService.findByKeyWord(keyword);
  }


  @Post()
  async create(@Request() req, @Body() work: WorkDto) {
    return await this.workService.create(work, req.user.userId);
  }

  @Post(':id')
  async update(@Request() req, @Body() work: WorkDto, @Param('id') id: number) {
    return await this.workService.update(work, req.user.userId, id);
  }

}

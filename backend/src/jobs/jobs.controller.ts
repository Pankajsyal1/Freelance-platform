import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateJobDto } from './dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private jobs: JobsService) {}

  @Get()
  list(@Query('status') status?: string, @Query('skill') skill?: string, @Query('q') q?: string) {
    return this.jobs.list({ status, skill, q });
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.jobs.get(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client')
  @Post()
  create(@Req() req: any, @Body() dto: CreateJobDto) {
    return this.jobs.create(req.user.id, dto);
  }
}

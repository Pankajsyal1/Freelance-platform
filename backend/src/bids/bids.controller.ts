import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateBidDto, UpdateBidStatusDto } from './dto';
import { BidsService } from './bids.service';

@Controller('bids')
export class BidsController {
  constructor(private bids:BidsService){}
  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('freelancer') @Post() create(@Req() req:any,@Body() dto:CreateBidDto){return this.bids.create(req.user.id,dto);}
  @Get('job/:jobId') byJob(@Param('jobId') jobId:string){return this.bids.byJob(Number(jobId));}
  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('client') @Patch(':id/status') update(@Param('id') id:string,@Body() dto:UpdateBidStatusDto){return this.bids.update(Number(id),dto.status);}
}

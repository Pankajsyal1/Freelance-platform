import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SendMessageDto } from './dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private msgs: MessagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  send(@Req() req: any, @Body() dto: SendMessageDto) {
    return this.msgs.send(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('job/:jobId')
  byJob(@Param('jobId') jobId: string) {
    return this.msgs.byJob(Number(jobId));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('job/:jobId/read')
  markRead(@Req() req: any, @Param('jobId') jobId: string) {
    return this.msgs.markJobRead(Number(jobId), req.user.id);
  }
}

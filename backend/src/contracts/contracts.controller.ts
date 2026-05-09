import { Controller, Get, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('contracts')
@UseGuards(JwtAuthGuard)
export class ContractsController {
  constructor(private contracts: ContractsService) {}

  @Get()
  listMine(@Req() req: any) {
    return this.contracts.listForUser(req.user.id, req.user.role);
  }

  @Patch(':id/complete')
  complete(@Req() req: any, @Param('id') id: string) {
    return this.contracts.complete(Number(id), req.user.id);
  }
}

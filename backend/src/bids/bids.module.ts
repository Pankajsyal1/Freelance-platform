import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { JobsModule } from '../jobs/jobs.module';
import { ContractsModule } from '../contracts/contracts.module';

@Module({
  imports: [JobsModule, ContractsModule],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}

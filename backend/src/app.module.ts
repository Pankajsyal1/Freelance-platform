import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { BidsModule } from './bids/bids.module';
import { MessagesModule } from './messages/messages.module';
import { ContractsModule } from './contracts/contracts.module';

@Module({
  imports: [AuthModule, UsersModule, JobsModule, BidsModule, MessagesModule, ContractsModule],
})
export class AppModule {}

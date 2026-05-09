import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class ContractsService {
  private contracts: any[] = [];
  private idSeq = 1;

  createFromBid(job: any, bid: any) {
    const existing = this.contracts.find((c) => c.jobId === job.id && c.status !== 'cancelled');
    if (existing) {
      throw new BadRequestException('Contract already exists for this job');
    }
    const contract = {
      id: this.idSeq++,
      jobId: job.id,
      clientId: job.clientId,
      freelancerId: bid.freelancerId,
      bidId: bid.id,
      amount: bid.amount,
      terms: bid.proposal,
      status: 'active',
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    this.contracts.push(contract);
    return contract;
  }

  listForUser(userId: number, role: string) {
    if (role === 'admin') return this.contracts;
    return this.contracts.filter((c) => c.clientId === userId || c.freelancerId === userId);
  }

  complete(contractId: number, clientId: number) {
    const contract = this.contracts.find((c) => c.id === contractId);
    if (!contract) throw new NotFoundException('Contract not found');
    if (contract.clientId !== clientId) throw new BadRequestException('Only owner client can complete');
    contract.status = 'completed';
    contract.completedAt = new Date().toISOString();
    return contract;
  }
}

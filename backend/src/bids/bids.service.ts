import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JobsService } from '../jobs/jobs.service';
import { ContractsService } from '../contracts/contracts.service';

@Injectable()
export class BidsService {
  private bids: any[] = [];
  private idSeq = 1;

  constructor(private jobs: JobsService, private contracts: ContractsService) {}

  create(freelancerId: number, dto: any) {
    const job = this.jobs.get(dto.jobId);
    if (job.status !== 'open') throw new BadRequestException('Job is not open for bids');
    const alreadyBid = this.bids.find((b) => b.jobId === dto.jobId && b.freelancerId === freelancerId);
    if (alreadyBid) throw new BadRequestException('Freelancer has already bid on this job');

    const b = { id: this.idSeq++, freelancerId, status: 'pending', createdAt: new Date().toISOString(), ...dto };
    this.bids.push(b);
    return b;
  }

  byJob(jobId: number) {
    return this.bids.filter((b) => b.jobId === jobId);
  }

  update(id: number, status: string) {
    const b = this.bids.find((x) => x.id === id);
    if (!b) throw new NotFoundException();
    b.status = status;

    if (status === 'accepted') {
      const job = this.jobs.get(b.jobId);
      this.jobs.assignFreelancer(job.id, b.freelancerId);
      this.contracts.createFromBid(job, b);

      this.bids
        .filter((other) => other.jobId === b.jobId && other.id !== b.id && other.status === 'pending')
        .forEach((other) => {
          other.status = 'rejected';
        });
    }
    return b;
  }
}

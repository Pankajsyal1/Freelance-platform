import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class JobsService {
  private jobs: any[] = [];
  private idSeq = 1;

  create(clientId: number, dto: any) {
    const j = {
      id: this.idSeq++,
      clientId,
      status: 'open',
      createdAt: new Date().toISOString(),
      assignedFreelancerId: null,
      ...dto,
    };
    this.jobs.push(j);
    return j;
  }

  list(filters?: any) {
    let result = [...this.jobs];
    if (filters?.status) result = result.filter((j) => j.status === filters.status);
    if (filters?.skill) result = result.filter((j) => (j.skills || []).includes(filters.skill));
    if (filters?.q) {
      const q = String(filters.q).toLowerCase();
      result = result.filter((j) => j.title.toLowerCase().includes(q) || j.description.toLowerCase().includes(q));
    }
    return result;
  }

  get(id: number) {
    const j = this.jobs.find((x) => x.id === id);
    if (!j) throw new NotFoundException();
    return j;
  }

  assignFreelancer(jobId: number, freelancerId: number) {
    const job = this.get(jobId);
    job.status = 'in_progress';
    job.assignedFreelancerId = freelancerId;
    return job;
  }
}

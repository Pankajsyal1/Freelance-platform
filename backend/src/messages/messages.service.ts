import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  private msgs: any[] = [];
  private idSeq = 1;

  send(senderId: number, dto: any) {
    const m = { id: this.idSeq++, senderId, read: false, createdAt: new Date().toISOString(), ...dto };
    this.msgs.push(m);
    return m;
  }

  byJob(jobId: number) {
    return this.msgs.filter((m) => m.jobId === jobId);
  }

  markJobRead(jobId: number, userId: number) {
    this.msgs.filter((m) => m.jobId === jobId && m.senderId !== userId).forEach((m) => (m.read = true));
    return { ok: true };
  }
}

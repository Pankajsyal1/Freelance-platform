import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class JobsService {
  private jobs: any[] = []; private idSeq = 1;
  create(clientId: number, dto: any) { const j={id:this.idSeq++,clientId,status:'open',createdAt:new Date().toISOString(),...dto}; this.jobs.push(j); return j; }
  list() { return this.jobs; }
  get(id:number){const j=this.jobs.find(x=>x.id===id); if(!j) throw new NotFoundException(); return j;}
}

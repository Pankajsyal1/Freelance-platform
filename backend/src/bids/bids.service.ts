import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class BidsService { private bids:any[]=[]; private idSeq=1;
  create(freelancerId:number,dto:any){const b={id:this.idSeq++,freelancerId,status:'pending',createdAt:new Date().toISOString(),...dto};this.bids.push(b);return b;}
  byJob(jobId:number){return this.bids.filter(b=>b.jobId===jobId);}
  update(id:number,status:string){const b=this.bids.find(x=>x.id===id); if(!b) throw new NotFoundException(); b.status=status; return b;}
}

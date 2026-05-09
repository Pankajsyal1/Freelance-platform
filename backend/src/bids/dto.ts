import { IsEnum, IsNumber, IsString } from 'class-validator';
export class CreateBidDto { @IsNumber() jobId:number; @IsNumber() amount:number; @IsString() proposal:string; }
export class UpdateBidStatusDto { @IsEnum(['accepted','rejected']) status:'accepted'|'rejected'; }

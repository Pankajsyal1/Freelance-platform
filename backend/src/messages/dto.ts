import { IsNumber, IsString } from 'class-validator';
export class SendMessageDto { @IsNumber() jobId:number; @IsString() body:string; }

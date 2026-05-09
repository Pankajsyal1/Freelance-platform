import { IsArray, IsNumber, IsString } from 'class-validator';
export class CreateJobDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsNumber() budgetMin: number;
  @IsNumber() budgetMax: number;
  @IsArray() skills: string[];
}

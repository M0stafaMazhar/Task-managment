import { IsNotEmpty, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsBoolean()
  status: boolean;
}

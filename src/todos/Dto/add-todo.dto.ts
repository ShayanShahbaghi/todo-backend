import { IsDate, IsNotEmpty } from 'class-validator'

export class AddTodoDto {

  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  description: string;
  
  endDate: string;
}
export class UpdateTodoDto {
  id: string;
  propertyToChange: PropertyToChange
}

export enum PropertyToChange {
  name = 'NAME',
  description = 'DESC',
  endDate = 'END_DATE',
  status = 'STATUS'
}
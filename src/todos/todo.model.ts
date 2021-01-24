export interface Todo {
  id: string,
  name: string,
  description: string,
  endDate: Date,
  status: todoStatus
}
export enum todoStatus {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  OverDue = 'OVERDUE'
}
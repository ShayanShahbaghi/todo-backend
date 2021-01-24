import { todoStatus } from "../todo.model"

export class FilterTodosQueryDto {
  status: todoStatus
  keyword: string
  endDate: string
}
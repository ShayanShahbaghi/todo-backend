import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { isDate } from 'class-validator';
import * as uuid from 'uuid'
import { AddTodoDto } from './Dto/add-todo.dto';
import { FilterTodosQueryDto } from './Dto/get-todos-filtered.dto';
import { PropertyToChange, UpdateTodoDto } from './Dto/update-todo.dto';
import { Todo, todoStatus } from './todo.model';
@Injectable()
export class TodosService {
  todos: Todo[] = []

  getAllTodos(): Todo[] {
    return this.todos
  }

  getFilteredTodos(filterTodosQuery: FilterTodosQueryDto): Todo[] {
    const { status, keyword, endDate } = filterTodosQuery
    let todos = this.todos
    if (status) {
      todos = todos.filter(todo => todo.status == status)
    }
    if (keyword) {
      todos = todos.filter(todo =>
        todo.name.toLowerCase().includes(
          keyword.toLowerCase()
        )
        ||
        todo.description.toLowerCase().includes(
          keyword.toLowerCase()
        )
      )
    }
    if (endDate) {
      todos = todos.filter(
        todo => todo.endDate <= new Date(endDate)
      )
    }
    return todos
  }

  addNewTodo(AddTodoDto: AddTodoDto): Todo {
    const { name, description, endDate } = AddTodoDto
    if (endDate.length != 0 && !isDate(endDate)) {
      throw new BadRequestException()
    }
    const newTodo: Todo = {
      id: uuid.v1(),
      name,
      description,
      endDate: new Date(endDate),
      status: todoStatus.InProgress
    }
    this.todos.push(newTodo)
    return newTodo
  }

  getTodoById(id: string): Todo {
    const todo = this.todos.find(todo => todo.id == id)

    if (!todo) {
      throw new NotFoundException()
    }

    return todo
  }

  deleteTodoById(id: string): void {
    this.todos = this.todos.filter(todo => todo.id != id)
  }

  changeTodoPropertiesById(
    updateTodoDto: UpdateTodoDto,
    objectForChangingProperty: { data: string }
  ) {
    const todo = this.getTodoById(updateTodoDto.id)
    if (!todo) {
      throw new NotFoundException()
    }
    const data = objectForChangingProperty.data
    if (updateTodoDto.propertyToChange == PropertyToChange.name) {
      todo.name = data
    } else if (updateTodoDto.propertyToChange == PropertyToChange.description) {
      todo.description = data
    } else if (updateTodoDto.propertyToChange == PropertyToChange.endDate) {
      if (!isDate(data)) {
        throw new BadRequestException()
      }
      todo.endDate = new Date(data)
    } else if (updateTodoDto.propertyToChange == PropertyToChange.status) {
      if (!todoStatus[data]) {
        throw new BadRequestException()
      }
      todo.status = todoStatus[data]
    }
    return todo
  }
}

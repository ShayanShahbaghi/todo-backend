import { Injectable } from '@nestjs/common';
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
    return this.todos.find(obj => obj.id == id)
  }

  deleteTodoById(id: string): void {
    this.todos = this.todos.filter(todo => todo.id != id)
  }

  changeTodoPropertiesById(
    updateTodoDto: UpdateTodoDto,
    objectForChangingProperty: { data: string }
  ) {
    const todo = this.getTodoById(updateTodoDto.id)
    console.log(updateTodoDto.propertyToChange)
    if (updateTodoDto.propertyToChange == PropertyToChange.name) {
      todo.name = objectForChangingProperty.data
    } else if (updateTodoDto.propertyToChange == PropertyToChange.description) {
      todo.description = objectForChangingProperty.data
    } else if (updateTodoDto.propertyToChange == PropertyToChange.endDate) {
      todo.endDate = new Date(objectForChangingProperty.data)
    } else if (updateTodoDto.propertyToChange == PropertyToChange.status) {
      todo.status = objectForChangingProperty.data as todoStatus
    }
    return todo
  }
}

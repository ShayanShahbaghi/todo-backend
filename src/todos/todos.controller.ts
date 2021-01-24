import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';

import { FilterTodosQueryDto } from './Dto/get-todos-filtered.dto'
import { AddTodoDto } from './Dto/add-todo.dto';
import { PropertyToChange, UpdateTodoDto } from './Dto/update-todo.dto';

import { Todo } from './todo.model';

import { TodosService } from './todos.service';

@Controller('/Todos')
export class TodosController {
  constructor(private todosService: TodosService) { }
  
  @Get('')
  getAllTodos(@Query() filterTodosQuery: FilterTodosQueryDto): Todo[] {
    
    if (Object.keys(filterTodosQuery).length != 0) {
      return this.todosService.getFilteredTodos(filterTodosQuery)
    } else {
      return this.todosService.getAllTodos()
    }
  }

  @Post('Add')
  addNewTodo(@Body() AddTodoDto: AddTodoDto) {
    return this.todosService.addNewTodo(AddTodoDto)
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string) {
    return this.todosService.getTodoById(id)
  }

  @Delete('/:id')
  removeTodoById(@Param('id') id: string) {
    this.todosService.deleteTodoById(id)
  }

  @Patch('/:id/:propertyToChange')
  changeTodoById(
    @Param() updateTodoDto: UpdateTodoDto,
    @Body() dataForChangeProperty: { data: string }
  ) {
    return this.todosService.changeTodoPropertiesById(
      updateTodoDto, dataForChangeProperty
    )
  }
}

import { TodosModule } from './todos/todos.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TodosModule
  ]
})
export class AppModule {}
